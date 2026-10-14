import React from 'react';

export default function App() {
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', padding: '2rem', maxWidth: '800px', margin: '0 auto', color: '#1f2937' }}>
      <header style={{ borderBottom: '2px solid #2563eb', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        <h1 style={{ color: '#1e3a8a', margin: 0, fontSize: '1.75rem' }}>ThesisHub — SE100 · Nhóm N14</h1>
        <p style={{ color: '#4b5563', margin: '0.5rem 0 0 0' }}>
          Hệ thống Quản lý và Xét duyệt Đăng ký Đồ án Tốt nghiệp
        </p>
      </header>
      <main>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem', lineHeight: '1.6' }}>
          <h2 style={{ fontSize: '1.25rem', marginTop: 0, color: '#0f172a' }}>Khung cấu hình cơ bản</h2>
          <p>Dự án đã được thiết lập cấu hình cơ bản cho cả Frontend và Backend:</p>
          <ul style={{ paddingLeft: '1.25rem' }}>
            <li><strong>Frontend:</strong> React 18 + Vite</li>
            <li><strong>Backend:</strong> Java 21 + Spring Boot 4</li>
            <li><strong>Database:</strong> PostgreSQL 16 (chạy qua Docker Compose)</li>
            <li><strong>Deployment:</strong> Sẵn sàng triển khai trên Vercel</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
