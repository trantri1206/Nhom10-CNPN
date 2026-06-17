import React from 'react';

const Sidebar = ({ activeTab, setActiveTab, currentUser, onLogout, searchTerm, setSearchTerm }) => {
  const menuItems = [
    { id: 'inventory', label: 'Quản lý kho', show: true },
    { id: 'prescriptions', label: 'Kê đơn thuốc', show: true },
    { id: 'users', label: 'Quản lý người dùng', show: currentUser?.role === 'Admin' },
    { id: 'analytics', label: 'Thống kê', show: currentUser?.role === 'Admin' },
    { id: 'settings', label: 'Cài đặt', show: true },
  ];

  return (
    <aside className="sidebar">
      {/* Sidebar Header matching the mockup */}
      <div className="sidebar-header">
        <div className="sidebar-logo-text">
          <span className="sidebar-title">SafePharmacy</span>
          <span className="sidebar-subtitle">Kê đơn · Bán thuốc · Kho</span>
        </div>
      </div>

      {/* Quick Search inside Sidebar */}
      <div className="sidebar-search">
        <input 
          type="text" 
          placeholder="Tra cứu nhanh..." 
          className="sidebar-search-input"
          style={{ paddingLeft: '12px' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        {menuItems.map(
          (item) =>
            item.show && (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`nav-item ${activeTab === item.id ? 'nav-active' : ''}`}
              >
                <span className="nav-label">{item.label}</span>
              </button>
            )
        )}
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <button onClick={onLogout} className="btn-logout-sidebar">
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
