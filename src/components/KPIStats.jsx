import React from 'react';

const KPIStats = ({ totalProducts, totalValue, lowStockCount }) => {
  return (
    <div className="kpi-grid">
      <div className="kpi-card">
        <div>
          <div className="kpi-label">Tổng số thuốc</div>
          <div className="kpi-value">{totalProducts}</div>
        </div>
      </div>
      
      <div className="kpi-card">
        <div>
          <div className="kpi-label">Tổng giá trị kho</div>
          <div className="kpi-value">{totalValue.toLocaleString()}đ</div>
        </div>
      </div>
      
      <div className="kpi-card">
        <div>
          <div className="kpi-label">Sắp hết hàng (&lt;20)</div>
          <div className="kpi-value" style={{color: '#e11d48'}}>{lowStockCount}</div>
        </div>
      </div>
      
      <div className="kpi-card">
        <div>
          <div className="kpi-label">Trị giá (Triệu đồng)</div>
          <div className="kpi-value">{(totalValue / 1000000 || 0).toFixed(1)}M</div>
        </div>
      </div>
    </div>
  );
};

export default KPIStats;