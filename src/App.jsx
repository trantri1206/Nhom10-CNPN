import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

// ĐÃ KẾT NỐI VÀO CÂY THƯ MỤC COMPONENTS MỚI CỦA BẠN
import LandingPage from './components/LandingPage'; // 🌟 Đã Import Landing Page thành công
import Auth from './components/Auth';
import KPIStats from './components/KPIStats';
import Inventory from './components/Inventory';
import Analytics from './components/Analytics';
import AddMedicineModal from './components/AddMedicineModal';
import Sidebar from './components/Sidebar';
import PrescriptionCreator from './components/PrescriptionCreator';
import UserManagement from './components/UserManagement';

const API_URL = "http://localhost:5201/api";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 🌟 State mới để phân luồng ngoài: 'landing' (Xem giới thiệu) hoặc 'auth' (Xem Đăng nhập/Đăng ký)
  const [currentView, setCurrentView] = useState('landing'); 
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [authData, setAuthData] = useState({ username: '', password: '' });
  const [currentUser, setCurrentUser] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [newMedicine, setNewMedicine] = useState({ name: '', activeIngredient: '', quantity: 0, price: 0, categoryId: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('inventory');
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [prescriptions, setPrescriptions] = useState([]);

  const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  // Hàm tự động duy trì trạng thái đăng nhập khi làm mới trang
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");
    if (token && role && username) {
      setCurrentUser({ username, role });
      setIsLoggedIn(true);
    }
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    const endpoint = isRegisterMode ? "Auth/register" : "Auth/login";
    try {
      const res = await axios.post(`${API_URL}/${endpoint}`, authData);
      if (isRegisterMode) {
        alert(res.data.message || "Đăng ký thành công!");
        setIsRegisterMode(false);
      } else {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("username", res.data.username);
        setCurrentUser({ username: res.data.username, role: res.data.role });
        setIsLoggedIn(true);
      }
    } catch (err) { alert(err.response?.data?.message || "Lỗi đăng nhập!"); }
  };

  const fetchMedicines = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/Medicines/get-all`, getAuthConfig());
      setMedicines(res.data);
    } catch (err) { if (err.response?.status === 401) handleLogout(); }
    finally { setLoading(false); }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/Categories/get-all`, getAuthConfig());
      setCategories(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchPrescriptions = async () => {
    try {
      const res = await axios.get(`${API_URL}/Prescriptions/get-all`, getAuthConfig());
      setPrescriptions(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { 
    if (isLoggedIn) { 
      fetchMedicines(); 
      fetchCategories(); 
      fetchPrescriptions();
    }
  }, [isLoggedIn]);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    try {
      await axios.post(`${API_URL}/Categories/add-new`, { name: newCategoryName }, getAuthConfig());
      setNewCategoryName('');
      fetchCategories();
    } catch (err) { alert("Lỗi thêm danh mục!"); }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này? Các thuốc thuộc danh mục này sẽ chuyển về trạng thái chưa phân loại.")) {
      try {
        await axios.delete(`${API_URL}/Categories/${id}`, getAuthConfig());
        fetchCategories();
        fetchMedicines();
      } catch (err) { alert("Lỗi xóa danh mục!"); }
    }
  };

  const handleUpdateCategory = async (id, updatedName) => {
    try {
      await axios.put(`${API_URL}/Categories/${id}`, { name: updatedName }, getAuthConfig());
      fetchCategories();
      fetchMedicines();
    } catch (err) { alert("Lỗi cập nhật danh mục!"); }
  };

  const handleAdd = async () => {
    try {
      await axios.post(`${API_URL}/Medicines/add-new-medicine`, { 
        ...newMedicine, 
        quantity: parseInt(newMedicine.quantity), 
        price: parseFloat(newMedicine.price),
        categoryId: newMedicine.categoryId ? parseInt(newMedicine.categoryId) : null
      }, getAuthConfig());
      
      setNewMedicine({ name: '', activeIngredient: '', quantity: 0, price: 0, categoryId: '' });
      fetchMedicines();
      alert("Đã thêm thuốc mới vào cơ sở dữ liệu thành công!");
    } catch (err) { alert("Lỗi khi thêm thuốc mới vào kho!"); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thuốc này khỏi kho?")) {
      try {
        await axios.delete(`${API_URL}/Medicines/${id}`, getAuthConfig());
        fetchMedicines();
      } catch (err) { alert("Lỗi xóa!"); }
    }
  };

  const handleUpdate = async () => {
    try {
      const { category, hoatChat, ...cleanData } = editData;
      const payload = { 
        ...cleanData, 
        quantity: parseInt(cleanData.quantity), 
        price: parseFloat(cleanData.price),
        categoryId: cleanData.categoryId ? parseInt(cleanData.categoryId) : null,
        maHoatChat: cleanData.maHoatChat ? parseInt(cleanData.maHoatChat) : null
      };
      await axios.put(`${API_URL}/Medicines/${editingId}`, payload, getAuthConfig());
      setEditingId(null);
      fetchMedicines();
    } catch (err) { 
      console.error("Lỗi khi cập nhật thuốc:", err.response?.data || err.message);
      alert("Lỗi cập nhật!"); 
    }
  };

  // NÂNG CẤP HÀM ĐĂNG XUẤT: Trả người dùng về thẳng Landing Page
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentView('landing'); // Đưa màn hình về Landing Page
  };

  // Logic tính toán phân phối dữ liệu
  const filteredMedicines = medicines.filter(med => med.name?.toLowerCase().includes(searchTerm.toLowerCase()));
  const totalProducts = medicines.length;
  const totalValue = medicines.reduce((sum, med) => sum + (med.quantity * med.price), 0);
  const lowStockCount = medicines.filter(med => med.quantity < 20).length;
  const outOfStockCount = medicines.filter(med => med.quantity === 0).length;
  const topValueMedicines = [...medicines].sort((a, b) => (b.quantity * b.price) - (a.quantity * a.price)).slice(0, 5);
  const priceRanges = { 'Dưới 50K': medicines.filter(m => m.price < 50000).length, 'Trên 50K': medicines.filter(m => m.price >= 50000).length };
  const stockDistribution = { 'Hết hàng (0)': outOfStockCount, 'Sắp hết (<20)': lowStockCount - outOfStockCount, 'An toàn (≥20)': medicines.length - lowStockCount };

  const getGreeting = () => {
    const hour = new Date().getHours();
    return hour < 12 ? "Chào buổi sáng" : (hour < 18 ? "Chào buổi chiều" : "Chào buổi tối");
  };

  // 🌟 ĐIỀU HƯỚNG THÔNG MINH KHI CHƯA ĐĂNG NHẬP
  if (!isLoggedIn) {
    if (currentView === 'landing') {
      // Hiển thị Landing Page giới thiệu phần mềm trước tiên
      return <LandingPage onGoToLogin={() => setCurrentView('auth')} />;
    }

    // Nếu người dùng bấm vào các nút Đăng nhập trên Landing Page, chuyển sang form Auth
    return (
      <div style={{ position: 'relative' }}>
        {/* Nút nhỏ giúp người dùng có thể lội ngược dòng quay lại Landing Page nếu muốn */}
        <button 
          onClick={() => setCurrentView('landing')} 
          style={{
            position: 'absolute', top: '24px', left: '24px', zIndex: 10,
            backgroundColor: '#1e293b', color: '#94a3b8', border: '1px solid #334155',
            padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
        >
          ⬅ Quay lại trang chủ
        </button>

        <Auth 
          isRegisterMode={isRegisterMode} setIsRegisterMode={setIsRegisterMode}
          authData={authData} setAuthData={setAuthData} handleAuth={handleAuth}
        />
      </div>
    );
  }

  // KHI ĐÃ ĐĂNG NHẬP THÀNH CÔNG -> VÀO THẲNG HỆ THỐNG QUẢN TRỊ KHO DƯỢC
  return (
    <div className="app-wrapper">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        currentUser={currentUser} 
        onLogout={handleLogout}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      <div className="main-workspace">
        <header className="content-header">
          <div className="content-header-title">
            <h2>{activeTab === 'inventory' ? 'Quản lý kho dược phẩm' : activeTab === 'analytics' ? 'Báo cáo & Thống kê chi tiết' : 'Cấu hình hệ thống'}</h2>
            <p>{activeTab === 'inventory' ? 'Theo dõi, nhập xuất và kiểm kê số lượng dược phẩm tồn kho.' : activeTab === 'analytics' ? 'Báo cáo tổng quan về phân phối, số lượng và tổng giá trị kho hàng.' : 'Cài đặt và thiết lập thông tin phần mềm.'}</p>
          </div>
          
          <div className="user-profile-pill">
            <div className="user-avatar-pill">
              {currentUser?.username?.charAt(0).toUpperCase()}
            </div>
            <div className="user-details-pill">
              <span className="user-name-pill">{currentUser?.username}</span>
              <span className="user-role-pill">{currentUser?.role === 'Admin' ? 'Quản trị viên' : 'Dược sĩ'}</span>
            </div>
          </div>
        </header>

        <main className="container">
          {/* Tổng quan (Overview) */}
          {activeTab === 'overview' && (
            <>
              <KPIStats totalProducts={totalProducts} totalValue={totalValue} lowStockCount={lowStockCount} />
              <div style={{ padding: '24px', textAlign: 'center', color: '#94a3b8' }}>
                <p style={{ fontSize: '1.1rem' }}>Chào mừng đến với bảng điều khiển SafePharmacy</p>
              </div>
            </>
          )}

          {/* Quản lý kho */}
          {activeTab === 'inventory' && (
            <>
              <KPIStats totalProducts={totalProducts} totalValue={totalValue} lowStockCount={lowStockCount} />
              <Inventory 
                currentUser={currentUser} getGreeting={getGreeting} lowStockCount={lowStockCount} outOfStockCount={outOfStockCount}
                searchTerm={searchTerm} setSearchTerm={setSearchTerm} newCategoryName={newCategoryName} setNewCategoryName={setNewCategoryName}
                handleAddCategory={handleAddCategory} loading={loading} filteredMedicines={filteredMedicines} editingId={editingId}
                setEditingId={setEditingId} editData={editData} setEditData={setEditData} categories={categories} handleUpdate={handleUpdate} handleDelete={handleDelete}
                handleDeleteCategory={handleDeleteCategory} handleUpdateCategory={handleUpdateCategory}
              />
            </>
          )}

          {/* Kê đơn thuốc */}
          {activeTab === 'prescriptions' && (
            <PrescriptionCreator 
              medicines={medicines} 
              getAuthConfig={getAuthConfig} 
              API_URL={API_URL} 
              onPrescriptionCreated={() => {
                fetchPrescriptions();
                fetchMedicines();
              }}
            />
          )}

          {/* Quản lý người dùng */}
          {activeTab === 'users' && currentUser?.role === 'Admin' && (
            <UserManagement 
              getAuthConfig={getAuthConfig} 
              API_URL={API_URL} 
            />
          )}

          {/* Thống kê */}
          {activeTab === 'analytics' && currentUser?.role === "Admin" && (
            <Analytics 
              stockDistribution={stockDistribution} totalProducts={totalProducts} priceRanges={priceRanges}
              topValueMedicines={topValueMedicines} medicines={medicines} lowStockCount={lowStockCount} totalValue={totalValue}
              setActiveTab={setActiveTab} setSearchTerm={setSearchTerm} prescriptions={prescriptions}
            />
          )}

          {/* Cài đặt */}
          {activeTab === 'settings' && (
            <div style={{ padding: '24px', textAlign: 'center', color: '#64748b' }}>
              <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>⚙️ Chức năng Cài đặt đang phát triển</p>
            </div>
          )}
        </main>

        {/* Gọi Component ô nhập liệu thông minh từ thư mục components */}
        <AddMedicineModal newMedicine={newMedicine} setNewMedicine={setNewMedicine} categories={categories} handleAdd={handleAdd} />
      </div>
    </div>
  );
}

export default App;