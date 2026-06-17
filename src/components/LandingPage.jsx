import React, { useState } from 'react';
import heroImage from '../assets/hero.png';
import './LandingPage.css'; // Liên kết trực tiếp tới file CSS style của trang chủ

export default function LandingPage({ onGoToLogin }) {
  // 1. State điều khiển Mobile Menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 2. State điều khiển Modal Đặt Lịch
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 3. State điều khiển Accordion FAQ (Lưu index câu hỏi đang mở, null là đóng hết)
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Hàm xử lý khi bấm vào từng câu hỏi FAQ
  const toggleFaq = (index) => {
    if (openFaqIndex === index) {
      setOpenFaqIndex(null); // Bấm lại câu đang mở thì đóng nó đi
    } else {
      setOpenFaqIndex(index); // Mở câu được chọn
    }
  };

  // Hàm xử lý gửi form đặt lịch
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Giả lập gửi dữ liệu lên Server thành công
    setIsSubmitted(true);
  };

  // Hàm reset trạng thái modal khi đóng
  const closeModal = () => {
    setIsModalOpen(false);
    // Đợi modal ẩn đi rồi mới reset form về ban đầu
    setTimeout(() => setIsSubmitted(false), 300);
  };

  return (
    <div className="landing-page-wrapper">
      {/* ==========================================
           HEADER / NAVIGATION
           ========================================== */}
      <header className="header">
        <div className="container">
          <a href="#" className="logo" id="logoLink">
            <div className="logo-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            SafePharma
          </a>
          
          <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`} id="navMenu">
            <a href="#services" className="nav-link" onClick={() => setIsMenuOpen(false)}>Dịch Vụ</a>
            <a href="#doctors" className="nav-link" onClick={() => setIsMenuOpen(false)}>Đội Ngũ Bác Sĩ</a>
            <a href="#comparison" className="nav-link" onClick={() => setIsMenuOpen(false)}>Giải Pháp An Toàn</a>
            <a href="#process" className="nav-link" onClick={() => setIsMenuOpen(false)}>Quy Trình</a>
            <a href="#faq" className="nav-link" onClick={() => setIsMenuOpen(false)}>Hỏi Đáp</a>
          </nav>
          
          <div className="header-cta">
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Đặt Lịch Ngay</button>
            <button className="btn btn-secondary" onClick={() => onGoToLogin?.()}>Đăng Nhập</button>
            <button className="btn btn-primary" onClick={() => onGoToLogin?.()}>Đăng Ký</button>
          </div>
          
          <div className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} id="menuToggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

      {/* ==========================================
           HERO SECTION
           ========================================== */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content reveal">
              <div className="badge">
                <span className="badge-pulse"></span> Công nghệ AI Y tế Độc quyền
              </div>
              <h1 className="hero-title">
                Kê Đơn Số & <span>Tư Vấn Thuốc An Toàn</span> Với AI
              </h1>
              <p className="hero-desc">
                SafePharma là hệ thống thông minh hỗ trợ Bác sĩ và Dược sĩ kiểm soát tương tác thuốc lâm sàng, cảnh báo dị ứng hoạt chất, đảm bảo mọi đơn thuốc bán ra đạt độ an toàn tuyệt đối 100%.
              </p>
              <div className="hero-actions">
                <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                  Đặt Lịch Hẹn Tư Vấn
                </button>
                <a href="#comparison" className="btn btn-secondary">
                  Xem Giải Pháp So Sánh
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
              <div className="hero-trust">
                <div className="trust-avatars">
                  <img src="https://loremflickr.com/100/100/person" alt="Bệnh nhân 1" className="trust-avatar" />
                  <img src="https://loremflickr.com/100/100/woman" alt="Bệnh nhân 2" className="trust-avatar" />
                  <img src="https://loremflickr.com/100/100/girl" alt="Bệnh nhân 3" className="trust-avatar" />
                </div>
                <div className="trust-text">
                  <div className="trust-stars">
                    {[...Array(5)].map((_, idx) => (
                      <svg key={idx} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    ))}
                  </div>
                  Được tin cậy bởi hơn <strong>12,500+</strong> bác sĩ, dược sĩ và bệnh nhân trên cả nước.
                </div>
              </div>
            </div>
            
            <div className="hero-visual reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="hero-image-wrapper">
                <img src={heroImage} alt="SafePharma AI Dashboard" className="hero-main-img" />
              </div>
              
              <div className="floating-card floating-card-1">
                <div className="card-icon success">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div className="card-content">
                  <h5>Không Tương Tác Xấu</h5>
                  <p>Đơn thuốc an toàn tuyệt đối</p>
                </div>
              </div>
              
              <div className="floating-card floating-card-2">
                <div className="card-icon warning">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/></svg>
                </div>
                <div className="card-content">
                  <h5>Cảnh báo: Paracetamol + ...</h5>
                  <p>Trùng lặp nhóm giảm đau</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
           STATS BAR
           ========================================== */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">150K+</div>
              <div className="stat-label">Đơn thuốc được kiểm tra</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Cảnh báo tương tác chính xác</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1,200+</div>
              <div className="stat-label">Y bác sĩ & Nhà thuốc tham gia</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">&lt; 3s</div>
              <div className="stat-label">Thời gian phân tích lâm sàng</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
           DOCTORS INTRO SECTION
           ========================================== */}
      <section className="doctors section-padding" id="doctors">
        <div className="container">
          <div className="text-center reveal">
            <div className="badge">Đội Ngũ Chuyên Gia</div>
            <h2 className="section-title">Hội Đồng Y Khoa <span>Tin Cậy</span></h2>
            <p className="section-subtitle">
              SafePharma được bảo trợ chuyên môn và cố vấn trực tiếp bởi các Bác sĩ chuyên khoa và Dược sĩ lâm sàng giàu kinh nghiệm trong lĩnh vực Y dược học.
            </p>
          </div>
          
          <div className="doctors-grid">
            {/* Doctor 1 */}
            <div className="doctor-card reveal">
              <div className="doctor-image-container">
                <img src="https://loremflickr.com/300/280/doctor,medical" alt="PGS. TS. Nguyễn Văn An" className="doctor-img" />
                <div className="doctor-badge">Cố Vấn Lâm Sàng</div>
              </div>
              <div className="doctor-info">
                <h3 className="doctor-name">PGS. TS. Nguyễn Văn An</h3>
                <p className="doctor-desc">Nguyên Trưởng khoa Khám bệnh - Bệnh viện Bạch Mai. Với hơn 25 năm kinh nghiệm chẩn trị lâm sàng và ứng dụng công nghệ trong điều trị đa khoa.</p>
                <div className="doctor-meta">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                    25 năm kinh nghiệm
                  </span>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#fbbf24' }}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    4.9 (420 đánh giá)
                  </span>
                </div>
              </div>
            </div>
            
            {/* Doctor 2 */}
            <div className="doctor-card reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="doctor-image-container">
                <img src="https://loremflickr.com/300/280/pharmacist,medical" alt="ThS. Dược sĩ Trần Thị Bình" className="doctor-img" />
                <div className="doctor-badge">Chuyên Gia Dược Lâm Sàng</div>
              </div>
              <div className="doctor-info">
                <h3 className="doctor-name">ThS. Dược sĩ Trần Thị Bình</h3>
                <p className="doctor-desc">Giảng viên bộ môn Dược lâm sàng, Đại học Y Dược. Chuyên gia nghiên cứu và xây dựng thuật toán tương tác thuốc cho cơ sở y học SafePharma.</p>
                <div className="doctor-meta">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                    15 năm kinh nghiệm
                  </span>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#fbbf24' }}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    4.85 (310 đánh giá)
                  </span>
                </div>
              </div>
            </div>
            
            {/* Doctor 3 */}
            <div className="doctor-card reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="doctor-image-container">
                <img src="https://loremflickr.com/300/280/doctor,hospital" alt="BS. CKII. Lê Hoàng Nam" className="doctor-img" />
                <div className="doctor-badge">Bác Sĩ Tư Vấn Đa Khoa</div>
              </div>
              <div className="doctor-info">
                <h3 className="doctor-name">BS. CKII. Lê Hoàng Nam</h3>
                <p className="doctor-desc">Bác sĩ chuyên khoa Nội tổng hợp với kinh nghiệm phong phú trong tư vấn khám trực tuyến (telehealth), tối ưu hóa lộ trình dùng thuốc dài hạn.</p>
                <div className="doctor-meta">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                    18 năm kinh nghiệm
                  </span>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#fbbf24' }}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    4.95 (560 đánh giá)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
           HIGHLIGHTED SERVICES SECTION
           ========================================== */}
      <section className="services section-padding" id="services">
        <div className="container">
          <div className="text-center reveal">
            <div className="badge">Dịch Vụ Cốt Lõi</div>
            <h2 className="section-title">Giải Pháp Y Tế <span>Chuyển Đổi Số</span></h2>
            <p className="section-subtitle">
              SafePharma giải quyết triệt để bài toán an toàn đơn thuốc bằng hệ thống tự động thông minh được phân chia chi tiết cho từng đối tượng sử dụng.
            </p>
          </div>
          
          <div className="services-grid">
            {/* Service 1 */}
            <div className="service-card reveal">
              <div className="service-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22h9a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-9M12 2v20M12 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h9M7 12h10"/></svg>
              </div>
              <h3 className="service-title">Cho Bác Sĩ: Kê Đơn Số AI</h3>
              <p className="service-desc">
                Hệ thống hỗ trợ gợi ý liều lượng phù hợp theo độ tuổi, giới tính, tiền sử bệnh án và tự động tra cứu nhanh hoạt chất tương thích để giảm thiểu thời gian xử lý đơn thuốc.
              </p>
            </div>
            
            {/* Service 2 */}
            <div className="service-card reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="service-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m14.5 9.5-5 5M9.5 9.5l5 5"/></svg>
              </div>
              <h3 className="service-title">Cho Dược Sĩ: Cảnh Báo Lâm Sàng</h3>
              <p className="service-desc">
                Công cụ quét đơn thuốc tự động phát hiện các tương tác thuốc chéo, tương kỵ hóa học, dị ứng chéo hoặc cảnh báo dùng trùng lặp hoạt chất gây quá liều trong quá trình bán thuốc.
              </p>
            </div>
            
            {/* Service 3 */}
            <div className="service-card reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="service-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/></svg>
              </div>
              <h3 className="service-title">Cho Bệnh Nhân: Tư Vấn 24/7</h3>
              <p className="service-desc">
                Đặt lịch khám bệnh online cùng bác sĩ chuyên khoa. Mọi đơn thuốc sau tư vấn đều được lưu trữ trực tuyến giúp dễ dàng tra cứu, nhắc nhở uống thuốc và kết nối vận chuyển thuốc an toàn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
           BEFORE/AFTER COMPARISON SECTION
           ========================================== */}
      <section className="comparison section-padding" id="comparison">
        <div className="container">
          <div className="text-center reveal">
            <div className="badge">Đột Phá An Toàn</div>
            <h2 className="section-title">Khác Biệt Giữa <span>Truyền Thống & SafePharma</span></h2>
            <p className="section-subtitle">
              So sánh quy trình ghi đơn tay tiềm ẩn rủi ro với quy trình xác thực đơn thuốc số được bảo vệ bởi AI.
            </p>
          </div>
          
          <div className="comparison-wrapper reveal">
            <div className="comparison-container" id="beforeAfterSlider">
              <img src="https://images.unsplash.com/photo-1631217314830-4a18a8e5a320?w=900&h=480&fit=crop" alt="Đơn thuốc điện tử SafePharma sạch đẹp, rõ ràng" className="comparison-img img-after" />
              <span className="img-overlay-label label-after">Sau (Đơn Thuốc Số SafePharma)</span>

              <div className="comparison-slider" id="sliderOverlay" style={{ width: '50%' }}>
                <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&h=480&fit=crop" alt="Đơn thuốc viết tay mờ nhạt, khó đọc" className="comparison-img img-before" />
                <span className="img-overlay-label label-before">Trước (Kê Đơn Viết Tay Truyền Thống)</span>
              </div>

              <div className="comparison-handle" id="sliderHandle" style={{ left: '50%' }}>
                <div className="handle-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </div>
              </div>
            </div>
          </div>
          
          <div className="compare-bullets reveal">
            <div className="bullet-box before">
              <h4>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" x2="9" y1="9" y2="15"/><line x1="9" x2="15" y1="9" y2="15"/></svg>
                Kê đơn truyền thống
              </h4>
              <ul>
                <li>Chữ viết tay bác sĩ khó đọc, dễ gây nhầm lẫn tên biệt dược.</li>
                <li>Không kiểm soát được tương tác chéo giữa các thuốc bệnh nhân đang uống ở nơi khác.</li>
                <li>Không hỗ trợ tính toán liều dùng theo thể trạng, dễ sai sót liều.</li>
                <li>Thông tin đơn thuốc dễ rách, thất lạc và khó theo dõi lịch sử bệnh án.</li>
              </ul>
            </div>
            
            <div className="bullet-box after">
              <h4>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 8 12 12 14 14"/><path d="M12 2a10 10 0 1 0 10 10H12V2Z"/></svg>
                Với SafePharma AI
              </h4>
              <ul>
                <li>Đơn thuốc số chuẩn hóa rõ ràng, hiển thị trực quan liều lượng và cách dùng.</li>
                <li>AI quét dữ liệu y văn thế giới và đưa cảnh báo thời gian thực về tương tác nguy hiểm.</li>
                <li>Tự động điều chỉnh liều thông minh dựa trên cân nặng và chức năng gan, thận.</li>
                <li>Đồng bộ đám mây giúp bác sĩ, dược sĩ và bệnh nhân dễ dàng tra cứu mọi lúc mọi nơi.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
           EXAMINATION & PRESCRIPTION PROCESS
           ========================================== */}
      <section className="process section-padding" id="process">
        <div className="container">
          <div className="text-center reveal">
            <div className="badge">Cách Thức Hoạt Động</div>
            <h2 className="section-title">Quy Trình <span>Khám & Tư Vấn</span> Đơn Thuốc</h2>
            <p className="section-subtitle">
              Quy trình chuẩn hóa khép kín bảo vệ sức khỏe của bạn thông qua 4 bước kiểm duyệt chặt chẽ từ bác sĩ đến dược sĩ.
            </p>
          </div>
          
          <div className="process-steps reveal">
            {/* Step 1 */}
            <div className="process-step">
              <div className="step-num">1</div>
              <div className="step-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h4 className="step-title">1. Đăng Ký Đặt Hẹn</h4>
              <p className="step-desc">Điền thông tin và lựa chọn khung giờ rảnh phù hợp để bác sĩ chuyên khoa liên hệ tư vấn trực tuyến.</p>
            </div>
            
            {/* Step 2 */}
            <div className="process-step">
              <div className="step-num">2</div>
              <div className="step-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.8 2.2c-.2-.2-.5-.3-.8-.3H3c-1.1 0-2 .9-2 2v3c0 .3.1.6.3.8l10.9 10.9c.4.4 1 .4 1.4 0l4.3-4.3c.4-.4.4-1 0-1.4L6.1 2.2ZM3 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1ZM19.5 13.5c-.3 0-.6.1-.8.3L15.3 17c-.4.4-.4 1 0 1.4l1.3 1.3-3.1 3.1c-.4.4-.4 1 0 1.4l.6.6c.4.4 1 .4 1.4 0l3.1-3.1 1.3 1.3c.4.4 1 .4 1.4 0l3.2-3.4c.2-.2.3-.5.3-.8v-1.2c0-1.1-.9-2-2-2h-3Z"/></svg>
              </div>
              <h4 className="step-title">2. Khám & Kê Đơn</h4>
              <p className="step-desc">Bác sĩ khám lâm sàng qua video call và nhập đơn thuốc. AI lập tức quét các tương tác thành phần thuốc.</p>
            </div>
            
            {/* Step 3 */}
            <div className="process-step">
              <div className="step-num">3</div>
              <div className="step-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>
              </div>
              <h4 className="step-title">3. Dược Sĩ Kiểm Duyệt</h4>
              <p className="step-desc">Dược sĩ lâm sàng của hệ thống đánh giá lại cảnh báo của AI, xác nhận đơn thuốc đã an toàn trước khi phê duyệt.</p>
            </div>
            
            {/* Step 4 */}
            <div className="process-step">
              <div className="step-num">4</div>
              <div className="step-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="12" x="2" y="6" rx="2"/><path d="M22 17H18M22 7H18M22 12H18M2 10h16"/></svg>
              </div>
              <h4 className="step-title">4. Nhận Thuốc Tại Nhà</h4>
              <p className="step-desc">Thuốc được đóng gói quy chuẩn, giao siêu tốc tận nơi cùng mã QR để tra cứu cách uống chi tiết.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
           CUSTOMER REVIEWS SECTION
           ========================================== */}
      <section className="reviews section-padding" id="reviews">
        <div className="container">
          <div className="text-center reveal">
            <div className="badge">Đánh Giá Thực Tế</div>
            <h2 className="section-title">Khách Hàng Nói Gì Về <span>Chúng Tôi</span></h2>
            <p className="section-subtitle">
              Sự an tâm của bệnh nhân và sự tiện lợi của y bác sĩ chính là thước đo thành công lớn nhất của SafePharma.
            </p>
          </div>
          
          <div className="reviews-grid">
            {/* Review 1 */}
            <div className="review-card reveal">
              <div className="review-stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                ))}
              </div>
              <p className="review-text">
                "Hệ thống hỗ trợ kê đơn AI của SafePharma thực sự giảm bớt gánh nặng tâm lý cho tôi. Khi điều trị cho những bệnh nhân cao tuổi mắc nhiều bệnh nền, AI cảnh báo ngay nếu tôi vô tình kê các loại hoạt chất tương kỵ nhau."
              </p>
              <div className="review-user">
                <img src="https://loremflickr.com/60/60/doctor" alt="Bác sĩ Lê Minh" className="user-avatar" />
                <div>
                  <h4 className="user-name">BS. Lê Minh</h4>
                  <p className="user-role">Bác sĩ Đa khoa - BV Chợ Rẫy</p>
                </div>
              </div>
            </div>
            
            {/* Review 2 */}
            <div className="review-card reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="review-stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                ))}
              </div>
              <p className="review-text">
                "Với tư cách dược sĩ bán thuốc tại quầy, SafePharma giúp tôi có cơ sở khoa học tin cậy để phản hồi với bác sĩ hoặc hướng dẫn chi tiết cho bệnh nhân thay đổi liều lượng an toàn. Khách hàng cực kỳ tin tưởng."
              </p>
              <div className="review-user">
                <img src="https://loremflickr.com/60/60/pharmacist" alt="Dược sĩ Nguyễn Thị Mai" className="user-avatar" />
                <div>
                  <h4 className="user-name">DS. Nguyễn Thị Mai</h4>
                  <p className="user-role">Quản lý Nhà thuốc An Tâm</p>
                </div>
              </div>
            </div>
            
            {/* Review 3 */}
            <div className="review-card reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="review-stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                ))}
              </div>
              <p className="review-text">
                "Tôi hay quên và uống nhiều thuốc huyết áp lẫn tiểu đường cùng lúc. Bác sĩ ở SafePharma khám và kê đơn rất chi tiết, tôi có thể xem đơn thuốc trên điện thoại bất cứ lúc nào, thuốc giao tận nhà rất tiện."
              </p>
              <div className="review-user">
                <img src="https://loremflickr.com/60/60/person" alt="Chú Trần Quốc Hùng" className="user-avatar" />
                <div>
                  <h4 className="user-name">Chú Trần Quốc Hùng</h4>
                  <p className="user-role">Bệnh nhân (62 tuổi) - Hà Nội</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
           FAQ SECTION (ACCORDION)
           ========================================== */}
      <section className="faq section-padding" id="faq">
        <div className="container">
          <div className="text-center reveal">
            <div className="badge">Giải Đáp Thắc Mắc</div>
            <h2 className="section-title">Câu Hỏi <span>Thường Gặp</span></h2>
            <p className="section-subtitle">
              Tìm câu trả lời nhanh chóng cho các câu hỏi phổ biến nhất về cách vận hành và độ an toàn của hệ thống SafePharma.
            </p>
          </div>
          
          <div className="faq-wrapper reveal">
            {/* FAQ 1 */}
            <div className={`faq-item ${openFaqIndex === 0 ? 'active' : ''}`}>
              <div className="faq-question" onClick={() => toggleFaq(0)}>
                <span>Hệ thống SafePharma kiểm tra tương tác thuốc như thế nào?</span>
                <div className="faq-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
              <div className="faq-answer">
                <p>
                  SafePharma sử dụng động cơ AI liên tục đối chiếu các hoạt chất kê trong đơn với cơ sở dữ liệu y khoa quốc tế (Dược thư Việt Nam, FDA, ChEMBL). Khi phát hiện các cặp thuốc tương kỵ (mức độ từ chú ý đến nghiêm trọng), hệ thống sẽ ngay lập tức phát cảnh báo hiển thị trên màn hình của Bác sĩ và Dược sĩ cùng với giải pháp thay thế đề xuất.
                </p>
              </div>
            </div>
            
            {/* FAQ 2 */}
            <div className={`faq-item ${openFaqIndex === 1 ? 'active' : ''}`}>
              <div className="faq-question" onClick={() => toggleFaq(1)}>
                <span>Bệnh nhân lớn tuổi có sử dụng hệ thống này được không?</span>
                <div className="faq-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
              <div className="faq-answer">
                <p>
                  Hoàn toàn được. Hệ thống của chúng tôi được thiết kế với giao diện đơn giản, cỡ chữ lớn và trực quan. Đối với bệnh nhân cao tuổi không thạo công nghệ, SafePharma cung cấp tính năng gửi thông tin hướng dẫn và đơn thuốc số trực tiếp qua SMS/Zalo hoặc in kèm theo đơn thuốc giao tận tay với các biểu tượng dễ hiểu.
                </p>
              </div>
            </div>
            
            {/* FAQ 3 */}
            <div className={`faq-item ${openFaqIndex === 2 ? 'active' : ''}`}>
              <div className="faq-question" onClick={() => toggleFaq(2)}>
                <span>Thông tin bệnh án và đơn thuốc của tôi có được bảo mật không?</span>
                <div className="faq-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
              <div className="faq-answer">
                <p>
                  SafePharma tuân thủ nghiêm ngặt các tiêu chuẩn bảo mật dữ liệu y tế quốc tế (như HIPAA). Mọi dữ liệu liên quan đến thông tin cá nhân, bệnh lịch, và hồ sơ đơn thuốc của bệnh nhân đều được mã hóa đầu cuối (End-to-End Encryption) và chỉ những bác sĩ/dược sĩ được cấp quyền trực tiếp điều trị mới có thể xem thông tin này.
                </p>
              </div>
            </div>
            
            {/* FAQ 4 */}
            <div className={`faq-item ${openFaqIndex === 3 ? 'active' : ''}`}>
              <div className="faq-question" onClick={() => toggleFaq(3)}>
                <span>Chi phí sử dụng và đăng ký tư vấn y tế là bao nhiêu?</span>
                <div className="faq-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
              <div className="faq-answer">
                <p>
                  Việc tra cứu đơn thuốc cơ bản và lưu trữ đơn trực tuyến dành cho bệnh nhân là hoàn toàn miễn phí. Chi phí tư vấn trực tiếp với bác sĩ chuyên khoa dao động tùy theo từng bác sĩ và chuyên khoa cụ thể (sẽ hiển thị công khai trước khi bạn xác nhận đặt lịch hẹn). Các nhà thuốc hoặc phòng khám muốn tích hợp hệ thống AI có thể đăng ký gói dùng thử 30 ngày miễn phí.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
           CALL TO ACTION (CTA)
           ========================================== */}
      <section className="cta-section reveal">
        <div className="container">
          <div className="cta-container">
            <h2 className="cta-title">Bảo Vệ Bản Thân & Gia Đình Khỏi Sai Sót Đơn Thuốc</h2>
            <p className="cta-desc">
              Hãy bắt đầu kê đơn thông minh và đặt lịch tư vấn y tế cùng SafePharma ngay hôm nay để nhận được sự đồng hành của đội ngũ bác sĩ, dược sĩ hàng đầu.
            </p>
            <div className="cta-buttons">
              <button className="btn btn-primary" onClick={() => setIsModalOpen(true)} style={{ background: 'white', color: 'var(--color-slate-900)', boxShadow: 'none' }}>
                Đặt Lịch Khám Tư Vấn
              </button>
              <a href="#services" className="btn btn-secondary" style={{ background: 'transparent', color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}>
                Tìm Hiểu Thêm Dịch Vụ
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
           FOOTER SECTION
           ========================================== */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            {/* Col 1 */}
            <div className="footer-col-1">
              <a href="#" className="logo footer-logo">
                <div className="logo-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                SafePharma
              </a>
              <p className="footer-desc">
                Nền tảng công nghệ kết nối bác sĩ, dược sĩ và bệnh nhân, tiên phong kiểm soát an toàn đơn thuốc bằng trí tuệ nhân tạo (AI) tại Việt Nam.
              </p>
              <div className="footer-socials">
                <a href="#" className="social-link" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#" className="social-link" aria-label="Youtube">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25a29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                </a>
                <a href="#" className="social-link" aria-label="Linkedin">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </div>
            </div>
            
            {/* Col 2 */}
            <div>
              <h3 className="footer-heading">Liên Kết Nhanh</h3>
              <ul className="footer-links">
                <li><a href="#services" className="footer-link">Dịch Vụ Nổi Bật</a></li>
                <li><a href="#doctors" className="footer-link">Giới Thiệu Bác Sĩ</a></li>
                <li><a href="#comparison" className="footer-link">So Sánh Giải Pháp</a></li>
                <li><a href="#process" className="footer-link">Quy Trình Hoạt Động</a></li>
                <li><a href="#faq" className="footer-link">Hỏi Đáp FAQ</a></li>
              </ul>
            </div>
            
            {/* Col 3 */}
            <div>
              <h3 className="footer-heading">Pháp Lý & Hướng Dẫn</h3>
              <ul className="footer-links">
                <li><a href="#" className="footer-link">Điều khoản sử dụng</a></li>
                <li><a href="#" className="footer-link">Chính sách bảo mật</a></li>
                <li><a href="#" className="footer-link">Quyền lợi bệnh nhân</a></li>
                <li><a href="#" className="footer-link">Tài liệu tích hợp API</a></li>
                <li><a href="#" className="footer-link">Liên hệ hợp tác</a></li>
              </ul>
            </div>
            
            {/* Col 4 */}
            <div>
              <h3 className="footer-heading">Thông Tin Liên Hệ</h3>
              <div className="footer-contact">
                <div className="contact-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <span>Hotline: 1900 6868 (Phím 3)</span>
                </div>
                <div className="contact-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  <span>Email: support@safepharma.vn</span>
                </div>
                <div className="contact-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>Địa chỉ: Tòa nhà TechMed, 125 Giải Phóng, Hà Nội</span>
                </div>
              </div>
              <div className="footer-map-container">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.823978393561!2d105.8407469759247!3d21.000095988775693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1m3!1d9000!2s125+Giai+Phong%2C+Hai+Ba+Trung%2C+Ha+Noi!5e0!3m2!1svi!2s!4v1700000000000" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" title="SafePharma Location"></iframe>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div>© 2026 SafePharma JSC. Bảo lưu mọi quyền. Giấy phép hoạt động khám chữa bệnh số: 0184/BYT-GPHĐ.</div>
            <div className="footer-bottom-links">
              <a href="#" className="footer-bottom-link">Điều Khoản</a>
              <a href="#" className="footer-bottom-link">Bảo Mật</a>
              <a href="#" className="footer-bottom-link">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ==========================================
           APPOINTMENT BOOKING MODAL (POPUP)
           ========================================== */}
      {isModalOpen && (
        <div className="modal-overlay active" id="bookingModal" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-close" id="closeModal" aria-label="Đóng" onClick={closeModal}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
            </div>
            
            {!isSubmitted ? (
              <>
                <div className="modal-header">
                  <h3 className="modal-title">Đặt Lịch Hẹn Tư Vấn</h3>
                  <p className="modal-subtitle">Để lại thông tin, đội ngũ chuyên gia của SafePharma sẽ liên hệ hỗ trợ bạn trong vòng 15 phút.</p>
                </div>
                
                <form className="modal-form" id="appointmentForm" onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="fullName">Họ và Tên *</label>
                    <input type="text" id="fullName" className="form-input" placeholder="Ví dụ: Nguyễn Văn A" required />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="phoneNumber">Số Điện Thoại *</label>
                      <input type="tel" id="phoneNumber" className="form-input" placeholder="Ví dụ: 0987xxxxxx" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="userRole">Bạn là ai? *</label>
                      <select id="userRole" className="form-select" required>
                        <option value="" disabled defaultValue>Vui lòng chọn...</option>
                        <option value="patient">Bệnh nhân / Người nhà</option>
                        <option value="doctor">Bác sĩ / Phòng khám</option>
                        <option value="pharmacist">Dược sĩ / Chủ nhà thuốc</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="healthNote">Ghi chú tình trạng / Yêu cầu tư vấn</label>
                    <textarea id="healthNote" className="form-textarea" placeholder="Nhập tình trạng sức khỏe hoặc thuốc đang quan tâm (Không bắt buộc)..."></textarea>
                  </div>
                  
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    Gửi Đăng Ký Tư Vấn
                  </button>
                </form>
              </>
            ) : (
              <div className="success-alert" id="successAlert" style={{ display: 'block' }}>
                <div className="success-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h4 style={{ fontWeight: 800, marginBottom: '10px' }}>Đăng Ký Thành Công!</h4>
                <p style={{ color: 'var(--color-slate-600)', marginBottom: '15px' }}>
                  Cảm ơn bạn đã lựa chọn SafePharma. Bác sĩ/Dược sĩ tư vấn sẽ gọi lại cho bạn qua số điện thoại cung cấp trong thời gian sớm nhất.
                </p>
                <button type="button" className="btn btn-secondary" onClick={closeModal} style={{ marginTop: '10px' }}>Đóng Cửa Sổ</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}