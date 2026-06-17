import React, { useState } from 'react';

const CategoryItem = ({ category, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(category.name);

  const handleSave = () => {
    if (editName.trim() && editName.trim() !== category.name) {
      onUpdate(category.id, editName.trim());
    }
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        background: 'rgba(15, 23, 42, 0.9)',
        border: '1px solid #10b981',
        padding: '4px 10px',
        borderRadius: '20px',
        fontSize: '0.82rem'
      }}>
        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#ffffff',
            fontSize: '0.82rem',
            width: '90px',
            outline: 'none',
          }}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') { setEditName(category.name); setIsEditing(false); }
          }}
        />
        <button 
          type="button"
          onClick={handleSave} 
          style={{ background: 'none', border: 'none', color: '#10b981', cursor: 'pointer', padding: '0 2px', fontWeight: 'bold' }}
          title="Lưu"
        >
          ✓
        </button>
        <button 
          type="button"
          onClick={() => { setEditName(category.name); setIsEditing(false); }} 
          style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0 2px', fontWeight: 'bold' }}
          title="Hủy"
        >
          ✗
        </button>
      </div>
    );
  }

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '0.82rem',
      color: '#e2e8f0',
      transition: 'all 0.2s ease',
    }}
    className="category-pill-item"
    >
      <span>{category.name}</span>
      <div style={{ display: 'flex', gap: '6px', marginLeft: '4px' }}>
        <button 
          type="button"
          onClick={() => setIsEditing(true)} 
          style={{ 
            background: 'none', 
            border: 'none', 
            color: '#60a5fa', 
            cursor: 'pointer', 
            fontSize: '0.75rem',
            opacity: 0.6,
            transition: 'opacity 0.2s',
            padding: 0
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
          onMouseLeave={(e) => e.currentTarget.style.opacity = 0.6}
          title="Sửa danh mục"
        >
          ✏️
        </button>
        <button 
          type="button"
          onClick={() => onDelete(category.id)} 
          style={{ 
            background: 'none', 
            border: 'none', 
            color: '#f87171', 
            cursor: 'pointer', 
            fontSize: '0.75rem',
            opacity: 0.6,
            transition: 'opacity 0.2s',
            padding: 0
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
          onMouseLeave={(e) => e.currentTarget.style.opacity = 0.6}
          title="Xóa danh mục"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

const Inventory = ({ 
  currentUser, getGreeting, lowStockCount, outOfStockCount, searchTerm, setSearchTerm,
  newCategoryName, setNewCategoryName, handleAddCategory, loading, filteredMedicines,
  editingId, setEditingId, editData, setEditData, categories, handleUpdate, handleDelete,
  handleDeleteCategory, handleUpdateCategory
}) => {
  return (
    <>
      <div className="welcome-card">
        <div className="welcome-content">
          <div className="welcome-text">
            <span className="welcome-greeting">{getGreeting()}, </span>
            <span className="welcome-name">{currentUser?.username}</span>
          </div>
          <div className="welcome-message">
            {lowStockCount > 0 && `Có ${lowStockCount} loại thuốc cần nhập thêm. `}
            {outOfStockCount > 0 && `Phát hiện ${outOfStockCount} loại thuốc đã hết hàng!`}
            {lowStockCount === 0 && outOfStockCount === 0 && "Kho hàng đang ở trạng thái an toàn."}
          </div>
        </div>
      </div>

      <div className="action-bar" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: '16px', flexWrap: 'wrap' }}>
          <div className="search-wrapper" style={{ flex: 1, minWidth: '280px' }}>
            <input 
              type="text" 
              placeholder="Tìm kiếm thuốc..." 
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {currentUser?.role === "Admin" && (
            <button className="btn-add" onClick={() => document.getElementById('addModal')?.showModal()}>
              Khai báo mới
            </button>
          )}
        </div>

        {currentUser?.role === "Admin" && (
          <div className="category-form-container" style={{ width: '100%' }}>
            <form onSubmit={handleAddCategory} style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Tạo danh mục:</span>
              <input 
                type="text" 
                placeholder="Ví dụ: Kháng sinh, Giảm đau..." 
                className="search-input"
                style={{ flex: 1, height: '40px' }}
                value={newCategoryName}
                onChange={e => setNewCategoryName(e.target.value)}
              />
              <button type="submit" className="btn-add" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', height: '40px' }}>
                Thêm Mục
              </button>
            </form>

            {categories && categories.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px', borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '12px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: '600', marginRight: '4px' }}>Danh mục hiện có:</span>
                {categories.map(cat => (
                  <CategoryItem 
                    key={cat.id} 
                    category={cat} 
                    onUpdate={handleUpdateCategory} 
                    onDelete={handleDeleteCategory} 
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="table-container">
        {loading ? (
          <div className="loading-state"><p>Đang tải dữ liệu kho...</p></div>
        ) : (
          <table className="modern-table">
            <thead>
              <tr>
                <th>THÔNG TIN THUỐC</th>
                <th>TỒN KHO</th>
                <th>GIÁ TRỊ</th>
                {currentUser?.role === "Admin" && <th style={{ textAlign: 'center' }}>HÀNH ĐỘNG</th>}
              </tr>
            </thead>
            <tbody>
              {filteredMedicines.map(item => (
                <tr key={item.id} className="table-row">
                  {editingId === item.id ? (
                    <>
                      <td>
                        <input value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} className="edit-field" style={{ marginBottom: '8px' }} />
                        <select value={editData.categoryId || ''} onChange={e => setEditData({...editData, categoryId: e.target.value})} className="edit-field" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}>
                          <option value="">-- Chọn danh mục --</option>
                          {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                        </select>
                      </td>
                      <td><input type="number" value={editData.quantity} onChange={e => setEditData({...editData, quantity: e.target.value})} className="edit-field" /></td>
                      <td><input type="number" value={editData.price} onChange={e => setEditData({...editData, price: e.target.value})} className="edit-field" /></td>
                      <td style={{ textAlign: 'center' }}>
                        <button onClick={handleUpdate} className="btn-save">Lưu</button>
                        <button onClick={() => setEditingId(null)} className="btn-cancel">Hủy</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div className="medicine-name">{item.name}</div>
                          {item.category?.name && <span className="category-badge">{item.category.name}</span>}
                        </div>
                        <div className="medicine-sku">Mã: #{item.id} {item.activeIngredient ? `| Hoạt chất: ${item.activeIngredient}` : ''}</div>
                      </td>
                      <td>
                        <div className={`stock-badge ${item.quantity === 0 ? 'stock-out' : (item.quantity < 20 ? 'stock-low' : 'stock-normal')}`}>
                          {item.quantity === 0 ? 'Hết hàng' : `${item.quantity} hộp`}
                        </div>
                      </td>
                      <td><span className="price-value">{item.price?.toLocaleString()}đ</span></td>
                      {currentUser?.role === "Admin" && (
                        <td style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
                          <button onClick={() => {setEditingId(item.id); setEditData({...item});}} className="btn-edit">Sửa</button>
                          <button onClick={() => handleDelete(item.id)} className="btn-delete">Xóa</button>
                        </td>
                      )}
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Inventory;