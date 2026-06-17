import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PrescriptionCreator = ({ medicines, getAuthConfig, API_URL, onPrescriptionCreated }) => {
  const [patientName, setPatientName] = useState('');
  const [note, setNote] = useState('');
  
  // Selected medicines in the current prescription
  const [selectedItems, setSelectedItems] = useState([]);
  
  // State for the currently selected medicine to add
  const [currentMedicineId, setCurrentMedicineId] = useState('');
  const [dosagePerDay, setDosagePerDay] = useState(2);
  const [totalQuantity, setTotalQuantity] = useState(10);
  
  // Safety check warnings
  const [warnings, setWarnings] = useState([]);
  const [isCheckingSafety, setIsCheckingSafety] = useState(false);
  
  // Success state after creation
  const [createdPrescriptionId, setCreatedPrescriptionId] = useState(null);

  // Perform safety check when selectedItems change
  useEffect(() => {
    const checkSafety = async () => {
      if (selectedItems.length === 0) {
        setWarnings([]);
        return;
      }

      setIsCheckingSafety(true);
      try {
        const payload = {
          MaKhachHang: null,
          GiouHang: selectedItems.map(item => ({
            MaThuoc: item.medicineId,
            SoLuongUongMoiNgay: parseInt(item.dosagePerDay)
          }))
        };
        const res = await axios.post(`${API_URL}/SafetyCheck/validate-order`, payload, getAuthConfig());
        setWarnings(res.data);
      } catch (err) {
        console.error("Lỗi kiểm tra an toàn đơn thuốc:", err);
      } finally {
        setIsCheckingSafety(false);
      }
    };

    // Debounce safety check a bit
    const delayDebounce = setTimeout(() => {
      checkSafety();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [selectedItems, API_URL]);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!currentMedicineId) return;

    const med = medicines.find(m => m.id === parseInt(currentMedicineId));
    if (!med) return;

    // Check duplicate in the prescription list
    if (selectedItems.some(item => item.medicineId === med.id)) {
      alert("Thuốc này đã có trong đơn thuốc!");
      return;
    }

    const newItem = {
      medicineId: med.id,
      name: med.name,
      activeIngredient: med.activeIngredient,
      dosagePerDay: parseInt(dosagePerDay),
      totalQuantity: parseInt(totalQuantity)
    };

    setSelectedItems([...selectedItems, newItem]);
    setCurrentMedicineId('');
    setDosagePerDay(2);
    setTotalQuantity(10);
  };

  const handleRemoveItem = (medicineId) => {
    setSelectedItems(selectedItems.filter(item => item.medicineId !== medicineId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!patientName.trim()) {
      alert("Vui lòng nhập tên bệnh nhân!");
      return;
    }
    if (selectedItems.length === 0) {
      alert("Vui lòng thêm ít nhất một loại thuốc vào đơn!");
      return;
    }

    // If there are RED warnings, alert the user and ask for confirmation
    const redWarnings = warnings.filter(w => w.mucDo === 'Do');
    if (redWarnings.length > 0) {
      const confirmProceed = window.confirm(
        "CẢNH BÁO CỰC KỲ NGUY HIỂM (ĐỎ):\n" +
        redWarnings.map(w => `- ${w.noiDung}`).join('\n') +
        "\n\nBạn có chắc chắn muốn bỏ qua cảnh báo y tế và kê đơn thuốc này không?"
      );
      if (!confirmProceed) return;
    }

    try {
      const payload = {
        PatientName: patientName,
        Note: note,
        MedicineList: JSON.stringify(selectedItems)
      };

      const res = await axios.post(`${API_URL}/Prescriptions/add-new`, payload, getAuthConfig());
      if (res.status === 200 || res.status === 201) {
        setCreatedPrescriptionId(res.data.id);
        setPatientName('');
        setNote('');
        setSelectedItems([]);
        if (typeof onPrescriptionCreated === 'function') {
          onPrescriptionCreated();
        }
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi khi tạo đơn thuốc: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px', flexWrap: 'wrap' }}>
      
      {/* CỘT TRÁI: FORM KÊ ĐƠN & DANH SÁCH THUỐC ĐÃ KÊ */}
      <div className="analytics-card" style={{ background: 'rgba(15, 23, 42, 0.82)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <h3 className="analytics-title" style={{ color: '#fff', fontSize: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Kê đơn thuốc mới</span>
          {createdPrescriptionId && (
            <span style={{ fontSize: '0.9rem', color: '#10b981', background: 'rgba(16, 185, 129, 0.15)', padding: '6px 12px', borderRadius: '6px', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
              Đã tạo đơn thành công: #{createdPrescriptionId}
            </span>
          )}
        </h3>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Thông tin bệnh nhân */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: '600' }}>Tên bệnh nhân *</label>
              <input
                type="text"
                placeholder="Nhập tên bệnh nhân..."
                className="form-input"
                style={{ height: '42px', paddingLeft: '14px', borderRadius: '8px' }}
                value={patientName}
                onChange={e => {
                  setPatientName(e.target.value);
                  setCreatedPrescriptionId(null);
                }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: '600' }}>Ghi chú / Liều dùng chung</label>
              <input
                type="text"
                placeholder="Cách dùng, tần suất uống..."
                className="form-input"
                style={{ height: '42px', paddingLeft: '14px', borderRadius: '8px' }}
                value={note}
                onChange={e => setNote(e.target.value)}
              />
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.06)', margin: '4px 0' }} />

          {/* Chọn thuốc và liều lượng */}
          <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '16px', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.06)' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#38bdf8', fontWeight: '600' }}>Thêm thuốc vào đơn</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.8fr 0.8fr auto', gap: '12px', alignItems: 'end' }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Chọn biệt dược *</label>
                <select
                  value={currentMedicineId}
                  onChange={e => setCurrentMedicineId(e.target.value)}
                  className="form-select"
                  style={{ height: '40px', padding: '0 12px', borderRadius: '8px', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                >
                  <option value="">-- Chọn thuốc trong kho --</option>
                  {medicines.map(m => (
                    <option key={m.id} value={m.id} disabled={m.quantity <= 0}>
                      {m.name} {m.activeIngredient ? `(${m.activeIngredient})` : ''} - Tồn: {m.quantity}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Uống / ngày *</label>
                <input
                  type="number"
                  min="1"
                  className="form-input"
                  style={{ height: '40px', paddingLeft: '12px', borderRadius: '8px' }}
                  value={dosagePerDay}
                  onChange={e => setDosagePerDay(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>SL cấp đơn *</label>
                <input
                  type="number"
                  min="1"
                  className="form-input"
                  style={{ height: '40px', paddingLeft: '12px', borderRadius: '8px' }}
                  value={totalQuantity}
                  onChange={e => setTotalQuantity(e.target.value)}
                />
              </div>

              <button
                type="button"
                className="btn-add"
                onClick={handleAddItem}
                style={{ height: '40px', background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', boxShadow: '0 4px 12px rgba(59,130,246,0.2)' }}
              >
                + Thêm
              </button>

            </div>
          </div>

          {/* Bảng danh sách các thuốc đã kê */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: '600' }}>Toa thuốc đã kê ({selectedItems.length})</label>
            <div className="table-container" style={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
              {selectedItems.length === 0 ? (
                <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Chưa có thuốc nào được kê trong đơn. Chọn thuốc phía trên để thêm.
                </div>
              ) : (
                <table className="modern-table" style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '10px 16px', fontSize: '0.75rem' }}>Thuốc & Hoạt chất</th>
                      <th style={{ padding: '10px 16px', fontSize: '0.75rem', textAlign: 'center' }}>Liều dùng/ngày</th>
                      <th style={{ padding: '10px 16px', fontSize: '0.75rem', textAlign: 'center' }}>Tổng cấp</th>
                      <th style={{ padding: '10px 16px', fontSize: '0.75rem', textAlign: 'center' }}>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedItems.map(item => (
                      <tr key={item.medicineId} className="table-row">
                        <td style={{ padding: '12px 16px' }}>
                          <strong style={{ color: '#fff', fontSize: '0.9rem' }}>{item.name}</strong>
                          {item.activeIngredient && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>Hoạt chất: {item.activeIngredient}</div>}
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'center', color: '#93c5fd', fontWeight: 'bold' }}>
                          {item.dosagePerDay} viên
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'center', color: '#e2e8f0' }}>
                          {item.totalQuantity} viên
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.medicineId)}
                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline' }}
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="btn-add"
            style={{ width: '100%', height: '46px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1rem', marginTop: '8px' }}
          >
            ✓ Xác nhận & Hoàn tất kê đơn
          </button>

        </form>
      </div>

      {/* CỘT PHẢI: KẾT QUẢ KIỂM TRA LÂM SÀNG AN TOÀN Y TẾ */}
      <div className="analytics-card" style={{ background: 'rgba(15, 23, 42, 0.82)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <h3 className="analytics-title" style={{ color: '#fff', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>Kiểm tra an toàn y tế</span>
          {isCheckingSafety && (
            <span style={{ fontSize: '0.75rem', color: '#3b82f6', background: 'rgba(59, 130, 246, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>
              Đang phân tích...
            </span>
          )}
        </h3>

        {selectedItems.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '240px', color: 'var(--text-muted)', textAlign: 'center' }}>
            <span style={{ fontSize: '2.5rem', marginBottom: '12px', opacity: 0.5 }}>🛡️</span>
            <p style={{ fontSize: '0.85rem', maxWidth: '200px' }}>Hệ thống sẽ tự động quét tương tác chéo, quá liều lượng trần khi bạn thêm thuốc vào đơn.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {warnings.length === 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 16px', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.18)', color: '#34d399', textAlign: 'center' }}>
                <span style={{ fontSize: '2rem', marginBottom: '8px' }}>✓</span>
                <strong style={{ fontSize: '0.9rem' }}>Toa thuốc Đạt chuẩn An Toàn</strong>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px', margin: 0 }}>Không phát hiện tương tác chéo nguy hại hoặc trùng lặp hoạt chất.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Phát hiện ({warnings.length}) cảnh báo y tế:</div>
                
                {warnings.map((w, index) => {
                  const isRed = w.mucDo === 'Do';
                  return (
                    <div 
                      key={index} 
                      style={{ 
                        padding: '12px 14px', 
                        borderRadius: '8px', 
                        background: isRed ? 'rgba(239, 68, 68, 0.08)' : 'rgba(245, 158, 11, 0.08)', 
                        border: isRed ? '1px solid rgba(239, 68, 68, 0.22)' : '1px solid rgba(245, 158, 11, 0.22)',
                        color: isRed ? '#fca5a5' : '#fde047',
                        fontSize: '0.8rem',
                        lineHeight: '1.4'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontWeight: 'bold' }}>
                        <span>{w.loaiCanhBao === 'TuongTac' ? '🚨 TƯƠNG TÁC THUỐC' : w.loaiCanhBao === 'QuaLieu' ? '⚠️ QUÁ LIỀU LƯỢNG' : w.loaiCanhBao === 'DiUng' ? '❌ DỊ ỨNG THUỐC' : '🔔 TRÙNG LẶP HOẠT CHẤT'}</span>
                        <span style={{ 
                          fontSize: '0.7rem', 
                          padding: '1px 6px', 
                          borderRadius: '4px', 
                          background: isRed ? '#ef4444' : '#f59e0b', 
                          color: '#fff' 
                        }}>
                          {isRed ? 'NGUY HIỂM' : 'CẢNH BÁO'}
                        </span>
                      </div>
                      <div>{w.noiDung}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default PrescriptionCreator;
