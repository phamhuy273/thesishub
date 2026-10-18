import React from 'react';

export default function RegulationsPage() {
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem' }}>
      <h2 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '0 0 1rem 0' }}>
        Quy chế Đào tạo & Bất biến Nghiệp vụ (Academic Business Rules)
      </h2>
      <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.85rem', color: '#64748b' }}>
        Các nguyên tắc toàn vẹn nghiệp vụ được bảo vệ chặt chẽ tại tầng mô hình miền (Domain Invariants).
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '6px', padding: '1rem', background: '#fafafa' }}>
          <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0f172a', marginBottom: '0.35rem' }}>
            BR-01 · Quy mô nhóm nghiên cứu
          </div>
          <div style={{ fontSize: '0.825rem', color: '#475569', lineHeight: 1.5 }}>
            Mỗi đề tài Khóa luận tốt nghiệp chỉ được tối đa 02 sinh viên cùng thực hiện. Khi đủ 02 thành viên, hệ thống tự động khóa tính năng tìm đồng đội.
          </div>
        </div>

        <div style={{ border: '1px solid #e2e8f0', borderRadius: '6px', padding: '1rem', background: '#fafafa' }}>
          <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0f172a', marginBottom: '0.35rem' }}>
            BR-02 · Hạn mức hướng dẫn của Giảng viên
          </div>
          <div style={{ fontSize: '0.825rem', color: '#475569', lineHeight: 1.5 }}>
            Mỗi giảng viên chỉ được hướng dẫn tối đa N sinh viên (mặc định N = 10) trong một học kỳ để bảo đảm tải làm việc và chất lượng cố vấn học thuật.
          </div>
        </div>

        <div style={{ border: '1px solid #e2e8f0', borderRadius: '6px', padding: '1rem', background: '#fafafa' }}>
          <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0f172a', marginBottom: '0.35rem' }}>
            BR-03 · Quy trình thẩm định 2 cấp
          </div>
          <div style={{ fontSize: '0.825rem', color: '#475569', lineHeight: 1.5 }}>
            Đề xuất đề tài bắt buộc phải được Giảng viên hướng dẫn thẩm định và đồng ý trước khi chuyển tiếp lên Trưởng bộ môn phê duyệt chính thức.
          </div>
        </div>

        <div style={{ border: '1px solid #e2e8f0', borderRadius: '6px', padding: '1rem', background: '#fafafa' }}>
          <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0f172a', marginBottom: '0.35rem' }}>
            BR-04 · Toàn vẹn hồ sơ đề tài
          </div>
          <div style={{ fontSize: '0.825rem', color: '#475569', lineHeight: 1.5 }}>
            Sinh viên đã có đề tài được phê duyệt không được phép nộp đề xuất mới hoặc tham gia nhóm đề tài khác trong cùng một học kỳ.
          </div>
        </div>
      </div>
    </div>
  );
}
