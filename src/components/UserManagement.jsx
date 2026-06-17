import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = ({ getAuthConfig, API_URL }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Registration form state
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('Pharmacist');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/Auth/users`, getAuthConfig());
      setUsers(res.data);
    } catch (err) {
      console.error("Lỗi khi tải danh sách người dùng:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!newUsername.trim() || !newPassword.trim()) {
      alert("Vui lòng điền đầy đủ tên đăng nhập và mật khẩu!");
      return;
    }

    try {
      const payload = {
        username: newUsername.trim(),
        password: newPassword,
        role: newRole
      };
      
      const res = await axios.post(`${API_URL}/Auth/register`, payload, getAuthConfig());
      if (res.status === 200 || res.status === 201) {
        alert("Đăng ký người dùng mới thành công!");
        setNewUsername('');
        setNewPassword('');
        setNewRole('Pharmacist');
        fetchUsers(); // Refresh list
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi khi tạo người dùng: " + (err.response?.data?.message || err.message));
    }
  };

  const handleRoleChange = async (userId, selectedRole) => {
    try {
      await axios.put(`${API_URL}/Auth/update-role/${userId}`, { role: selectedRole }, getAuthConfig());
      alert("Cập nhật vai trò người dùng thành công!");
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Lỗi khi cập nhật vai trò!");
    }
  };

  const handleToggleStatus = async (userId) => {
    try {
      const res = await axios.put(`${API_URL}/Auth/toggle-status/${userId}`, {}, getAuthConfig());
      alert(res.data.message);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Lỗi khi thay đổi trạng thái!");
    }
  };

  const handleDeleteUser = async (userId, username) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa tài khoản "${username}" khỏi hệ thống?`)) {
      try {
        await axios.delete(`${API_URL}/Auth/delete-user/${userId}`, getAuthConfig());
        alert("Đã xóa người dùng thành công!");
        fetchUsers();
      } catch (err) {
        console.error(err);
        alert("Lỗi khi xóa người dùng!");
      }
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px', flexWrap: 'wrap' }}>
      
      {/* CỘT TRÁI: DANH SÁCH NGƯỜI DÙNG */}
      <div className="analytics-card" style={{ background: 'rgba(15, 23, 42, 0.82)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <h3 className="analytics-title" style={{ color: '#fff', fontSize: '1.25rem' }}>
          Danh sách tài khoản hệ thống ({users.length})
        </h3>

        <div className="table-container" style={{ border: '1px solid rgba(255, 255, 255, 0.06)' }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
              Đang tải danh sách tài khoản...
            </div>
          ) : users.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
              Chưa có tài khoản nào được tạo.
            </div>
          ) : (
            <table className="modern-table" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ padding: '12px 16px', fontSize: '0.75rem' }}>TÊN ĐĂNG NHẬP</th>
                  <th style={{ padding: '12px 16px', fontSize: '0.75rem', textAlign: 'center' }}>VAI TRÒ (QUYỀN)</th>
                  <th style={{ padding: '12px 16px', fontSize: '0.75rem', textAlign: 'center' }}>TRẠNG THÁI</th>
                  <th style={{ padding: '12px 16px', fontSize: '0.75rem', textAlign: 'center' }}>HÀNH ĐỘNG</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="table-row">
                    <td style={{ padding: '16px 16px' }}>
                      <strong style={{ color: '#fff', fontSize: '0.95rem' }}>{u.username}</strong>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        Tạo lúc: {u.createdAt ? new Date(u.createdAt).toLocaleDateString('vi-VN') : '---'}
                      </div>
                    </td>
                    <td style={{ padding: '16px 16px', textAlign: 'center' }}>
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        className="form-select"
                        style={{ 
                          height: '34px', 
                          padding: '0 8px', 
                          borderRadius: '6px', 
                          background: 'var(--bg-secondary)', 
                          color: 'var(--text-primary)', 
                          fontSize: '0.82rem',
                          width: '120px',
                          display: 'inline-block'
                        }}
                      >
                        <option value="Admin">Admin</option>
                        <option value="Pharmacist">Pharmacist</option>
                        <option value="User">User</option>
                      </select>
                    </td>
                    <td style={{ padding: '16px 16px', textAlign: 'center' }}>
                      <span style={{ 
                        fontSize: '0.78rem', 
                        padding: '4px 10px', 
                        borderRadius: '12px',
                        background: u.isActive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                        color: u.isActive ? '#34d399' : '#fca5a5',
                        border: u.isActive ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid rgba(239, 68, 68, 0.25)',
                        fontWeight: 'bold'
                      }}>
                        {u.isActive ? 'Hoạt động' : 'Bị Khóa'}
                      </span>
                    </td>
                    <td style={{ padding: '16px 16px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(u.id)}
                          className="btn-edit"
                          style={{ 
                            padding: '6px 12px', 
                            fontSize: '0.78rem',
                            color: u.isActive ? '#fbbf24' : '#34d399',
                            border: u.isActive ? '1px solid rgba(245, 158, 11, 0.25)' : '1px solid rgba(16, 185, 129, 0.25)',
                            background: 'none',
                            marginRight: 0
                          }}
                        >
                          {u.isActive ? 'Khóa' : 'Mở khóa'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteUser(u.id, u.username)}
                          className="btn-delete"
                          style={{ padding: '6px 12px', fontSize: '0.78rem', background: 'none' }}
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* CỘT PHẢI: ĐĂNG KÝ NGƯỜI DÙNG MỚI */}
      <div className="analytics-card" style={{ background: 'rgba(15, 23, 42, 0.82)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <h3 className="analytics-title" style={{ color: '#fff', fontSize: '1.25rem' }}>
          Đăng ký nhân viên / Người dùng mới
        </h3>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: '600' }}>
              Tên đăng nhập (Username) *
            </label>
            <input
              type="text"
              placeholder="Nhập tên đăng nhập..."
              className="modern-input"
              value={newUsername}
              onChange={e => setNewUsername(e.target.value)}
              required
              style={{ background: '#ffffff', color: '#000000', marginBottom: 0 }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: '600' }}>
              Mật khẩu đăng nhập *
            </label>
            <input
              type="password"
              placeholder="Nhập mật khẩu..."
              className="modern-input"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
              style={{ background: '#ffffff', color: '#000000', marginBottom: 0 }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: '600' }}>
              Phân quyền tài khoản *
            </label>
            <select
              value={newRole}
              onChange={e => setNewRole(e.target.value)}
              className="form-select"
              style={{ 
                height: '42px', 
                padding: '0 12px', 
                borderRadius: '8px', 
                background: 'var(--bg-secondary)', 
                color: 'var(--text-primary)',
                width: '100%' 
              }}
            >
              <option value="Admin">Admin (Quản trị viên)</option>
              <option value="Pharmacist">Pharmacist (Dược sĩ)</option>
              <option value="User">User (Người dùng/Khách hàng)</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn-add"
            style={{ 
              width: '100%', 
              height: '46px', 
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              fontSize: '0.95rem', 
              marginTop: '12px' 
            }}
          >
            ✓ Đăng ký tài khoản mới
          </button>

        </form>
      </div>

    </div>
  );
};

export default UserManagement;
