import React from 'react';

export default function RegulationsPage() {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.75rem', boxShadow: '0 1px 2px rgba(15,23,42,.03)' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 6px 0', color: 'var(--text)' }}>
        Quy chế đào tạo & Bất biến nghiệp vụ
      </h2>
      <p style={{ margin: '0 0 1.5rem 0', fontSize: '14px', color: 'var(--text-muted)' }}>
        Các nguyên tắc toàn vẹn nghiệp vụ (Domain Invariants) được bảo vệ chặt chẽ tại tầng mô hình miền của ThesisHub.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        <div style={{ border: '1px solid var(--border)', borderRadius: '10px', padding: '16px', background: '#f8fafc' }}>
          <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="code-pill">BR-01</span>
            <span>Quy mô nhóm nghiên cứu</span>
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Mỗi đề tài Khóa luận tốt nghiệp chỉ được tối đa 02 sinh viên cùng thực hiện. Khi đủ 02 thành viên, hệ thống tự động khóa tính năng tìm đồng đội.
          </div>
        </div>

        <div style={{ border: '1px solid var(--border)', borderRadius: '10px', padding: '16px', background: '#f8fafc' }}>
          <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="code-pill">BR-02</span>
            <span>Hạn mức của Giảng viên</span>
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Mỗi giảng viên chỉ được hướng dẫn tối đa N sinh viên (mặc định N = 10) trong một học kỳ để bảo đảm chất lượng cố vấn học thuật.
          </div>
        </div>

        <div style={{ border: '1px solid var(--border)', borderRadius: '10px', padding: '16px', background: '#f8fafc' }}>
          <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="code-pill">BR-03</span>
            <span>Quy trình thẩm định 2 cấp</span>
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Đề xuất đề tài bắt buộc phải được Giảng viên hướng dẫn thẩm định và đồng ý trước khi chuyển tiếp lên Trưởng bộ môn phê duyệt chính thức.
          </div>
        </div>

        <div style={{ border: '1px solid var(--border)', borderRadius: '10px', padding: '16px', background: '#f8fafc' }}>
          <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="code-pill">BR-04</span>
            <span>Toàn vẹn hồ sơ đề tài</span>
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Sinh viên đã có đề tài được phê duyệt không được phép nộp đề xuất mới hoặc tham gia nhóm đề tài khác trong cùng một học kỳ.
          </div>
        </div>
      </div>
    </div>
  );
}
