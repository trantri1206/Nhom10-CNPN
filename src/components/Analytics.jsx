import React from 'react';

const Analytics = ({ 
  stockDistribution, totalProducts, priceRanges, topValueMedicines, medicines, lowStockCount, totalValue, setActiveTab, setSearchTerm, prescriptions = [] 
}) => {
  return (
    <div className="analytics-container">
      <div className="analytics-card">
        <h3 className="analytics-title">Phân bố tồn kho</h3>
        <div className="distribution-bars">
          {Object.entries(stockDistribution).map(([label, count]) => (
            <div key={label} className="distribution-item">
              <div className="distribution-label">{label}</div>
              <div className="distribution-bar-wrapper">
                <div className="distribution-bar" style={{
                  width: `${totalProducts > 0 ? (count / totalProducts) * 100 : 0}%`,
                  background: label.includes('Hết') ? '#f43f5e' : label.includes('Sắp') ? '#f59e0b' : '#10b981'
                }}></div>
              </div>
              <div className="distribution-count">{count}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="analytics-card">
        <h3 className="analytics-title">Top 5 thuốc có giá trị lớn nhất</h3>
        <div className="top-list">
          {topValueMedicines.map((med, idx) => (
            <div key={med.id} className="top-item">
              <div className="top-rank">#{idx + 1}</div>
              <div className="top-info">
                <div className="top-name">{med.name}</div>
                <div className="top-sub">SL: {med.quantity} | Giá: {med.price?.toLocaleString()}đ</div>
              </div>
              <div className="top-value">{(med.quantity * med.price).toLocaleString()}đ</div>
            </div>
          ))}
        </div>
      </div>

      {/* DANH SÁCH ĐƠN THUỐC ĐÃ KÊ CÓ MÃ ID */}
      <div className="analytics-card" style={{ gridColumn: 'span 2', marginTop: '16px' }}>
        <h3 className="analytics-title">Lịch sử đơn thuốc đã kê ({prescriptions ? prescriptions.length : 0})</h3>
        <div className="table-container" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
          {(!prescriptions || prescriptions.length === 0) ? (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
              Chưa có đơn thuốc nào được tạo trên hệ thống.
            </div>
          ) : (
            <table className="modern-table" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ padding: '12px 18px' }}>MÃ ĐƠN (ID)</th>
                  <th style={{ padding: '12px 18px' }}>BỆNH NHÂN</th>
                  <th style={{ padding: '12px 18px' }}>NGÀY KÊ</th>
                  <th style={{ padding: '12px 18px' }}>CHI TIẾT TOA THUỐC</th>
                  <th style={{ padding: '12px 18px' }}>GHI CHÚ</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map(p => {
                  let medList = [];
                  try {
                    medList = JSON.parse(p.medicineList || '[]');
                  } catch (e) {
                    medList = [];
                  }
                  
                  return (
                    <tr key={p.id} className="table-row">
                      <td style={{ padding: '16px 18px', fontWeight: 'bold', color: '#38bdf8' }}>
                        #{p.id}
                      </td>
                      <td style={{ padding: '16px 18px', fontWeight: '700', color: '#fff' }}>
                        {p.patientName}
                      </td>
                      <td style={{ padding: '16px 18px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                        {p.createdDate ? new Date(p.createdDate).toLocaleString('vi-VN') : '---'}
                      </td>
                      <td style={{ padding: '16px 18px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          {medList.map((m, idx) => (
                            <span key={idx} style={{ fontSize: '0.82rem', color: '#e2e8f0' }}>
                              • <strong>{m.name}</strong> - {m.totalQuantity} viên ({m.dosagePerDay} viên/ngày)
                            </span>
                          ))}
                        </div>
                      </td>
                      <td style={{ padding: '16px 18px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        {p.note || '---'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;