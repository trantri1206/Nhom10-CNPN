import React from 'react';

const Auth = ({ isRegisterMode, setIsRegisterMode, authData, setAuthData, handleAuth }) => {
  return (
    <div className="auth-page">
      <div className="auth-glass-card">
        <div className="auth-logo">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="url(#logo-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <defs>
              <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </linearGradient>
            </defs>
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </div>
        <h1 className="auth-header">{isRegisterMode ? 'Đăng ký' : 'SafePharmacy'}</h1>
        <p className="auth-sub">Hệ thống quản trị dược phẩm thông minh</p>
        
        <form onSubmit={handleAuth} style={{marginTop: '1.5rem'}}>
          <input 
            type="text" 
            placeholder="Tên đăng nhập" 
            className="modern-input"
            value={authData.username}
            onChange={e => setAuthData({...authData, username: e.target.value})} 
            required 
          />
          <input 
            type="password" 
            placeholder="Mật khẩu" 
            className="modern-input"
            value={authData.password}
            onChange={e => setAuthData({...authData, password: e.target.value})} 
            required 
          />
          <button type="submit" className="btn-gradient">
            {isRegisterMode ? 'Đăng ký tài khoản' : 'Bắt đầu làm việc'}
          </button>
        </form>
        
        <button onClick={() => setIsRegisterMode(!isRegisterMode)} className="link-button">
          {isRegisterMode ? 'Đã có tài khoản? Đăng nhập' : 'Yêu cầu quyền truy cập mới'}
        </button>
      </div>
    </div>
  );
};

export default Auth;