import React, { useState } from 'react';
import axios from 'axios';

const AddMedicineModal = ({ newMedicine, setNewMedicine, categories, handleAdd }) => {
  // Quản lý danh sách thuốc gợi ý trả về từ API DrugBank
  const [suggestions, setSuggestions] = useState([]);
  // Quản lý trạng thái hiển thị chữ "Đang tìm kiếm..."
  const [searching, setSearching] = useState(false);
  // State phụ để hiển thị tên hoạt chất bằng chữ cho người dùng dễ đọc trên giao diện
  const [displayHoatChat, setDisplayHoatChat] = useState('');

  // Hàm xử lý tra cứu khi gõ tên thuốc
  const handleSearchDrugBank = async (keyword) => {
    setNewMedicine({ ...newMedicine, name: keyword });
    
    if (!keyword || keyword.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    setSearching(true);
    try {
      const token = localStorage.getItem("token");
      
      const res = await axios.get(`http://localhost:5201/api/Medicines/search-external?keyword=${encodeURIComponent(keyword)}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.data && res.data.data && Array.isArray(res.data.data)) {
        setSuggestions(res.data.data);
      } else {
        setSuggestions([]);
      }
    } catch (err) {
      console.error("Lỗi tra cứu dữ liệu DrugBank:", err);
      setSuggestions([]);
    } finally {
      setSearching(false);
    }
  };

  // Hàm xử lý khi người dùng bấm chọn một loại thuốc trong danh sách đổ xuống
  const selectDrug = (drug) => {
    setDisplayHoatChat(drug.hoatChat || 'Chưa cập nhật hoạt chất');

    setNewMedicine({
      ...newMedicine,
      name: drug.tenThuoc,
      MaHoatChat: drug.idHoatChat || null,
      quantity: newMedicine.quantity || '',
      price: newMedicine.price || '',
      categoryId: newMedicine.categoryId || ''
    });

    setSuggestions([]);
  };

  return (
    <dialog id="addModal" className="modal">
      <div className="modal-content" style={{ overflow: 'visible' }}>
        <div className="modal-header">
          <h3>Khai báo dược phẩm thông minh (DrugBank)</h3>
          <button type="button" className="modal-close" onClick={() => { setSuggestions([]); setDisplayHoatChat(''); document.getElementById('addModal')?.close(); }}>x</button>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); handleAdd(); setDisplayHoatChat(''); document.getElementById('addModal')?.close(); }}>
          
          {/* Ô NHẬP TÊN THUỐC ĐÍNH KÈM BOX GỢI Ý */}
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <input 
              type="text" 
              placeholder="Tên biệt dược (Gõ Panadol, Hapacol để test...) *" 
              value={newMedicine.name || ''} 
              onChange={e => handleSearchDrugBank(e.target.value)} 
              required 
              className="modal-input" 
              autoComplete="off"
            />
            {searching && (
              <span style={{ position: 'absolute', right: '12px', top: '12px', fontSize: '0.8rem', color: '#3b82f6' }}>
                Đang tìm...
              </span>
            )}
            
            {/* BOX HIỂN THỊ DANH SÁCH GỢI Ý ĐỔ XUỐNG */}
            {suggestions.length > 0 && (
              <ul className="suggestion-box" style={{
                position: 'absolute', top: '100%', left: 0, right: 0,
                background: '#1e293b', border: '1px solid #3b82f6', borderRadius: '8px',
                zIndex: 9999, maxHeight: '200px', overflowY: 'auto', listStyle: 'none', padding: 0, margin: '4px 0 0 0',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)'
              }}>
                {suggestions.map((drug, index) => (
                  <li 
                    key={index} 
                    onClick={() => selectDrug(drug)}
                    style={{ padding: '10px 14px', cursor: 'pointer', borderBottom: '1px solid #334155', fontSize: '0.85rem' }}
                    className="suggestion-item"
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#334155'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <strong style={{ color: '#38bdf8', display: 'block' }}>{drug.tenThuoc}</strong>
                    <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                      Hoạt chất: {drug.hoatChat || 'Chưa cập nhật'} | SĐK: {drug.soDangKy}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Ô HIỂN THỊ HOẠT CHẤT CHÍNH (TỰ ĐỘNG ĐIỀN) */}
          <div style={{ marginBottom: '16px' }}>
            <input 
              type="text" 
              placeholder="Hoạt chất chính (Sẽ tự điền khi chọn thuốc phía trên)" 
              value={displayHoatChat} 
              disabled
              className="modal-input" 
              style={{ backgroundColor: '#334155', color: '#94a3b8', cursor: 'not-allowed' }}
            />
          </div>
          
          {/* Ô CHỌN DANH MỤC CỦA BẠN */}
          <select className="modal-input" value={newMedicine.categoryId || ''} onChange={e => setNewMedicine({...newMedicine, categoryId: e.target.value})}>
            <option value="">-- Chọn danh mục --</option>
            {categories && categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>

          {/* Ô NHẬP SỐ LƯỢNG VÀ ĐƠN GIÁ */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <input type="number" placeholder="Số lượng *" value={newMedicine.quantity || ''} onChange={e => setNewMedicine({...newMedicine, quantity: e.target.value})} required className="modal-input" />
            <input type="number" placeholder="Đơn giá *" value={newMedicine.price || ''} onChange={e => setNewMedicine({...newMedicine, price: e.target.value})} required className="modal-input" />
          </div>
          
          <button type="submit" className="btn-gradient" style={{ marginTop: '12px', width: '100%' }}>Thêm vào kho</button>
        </form>
      </div>
    </dialog>
  );
};

export default AddMedicineModal;