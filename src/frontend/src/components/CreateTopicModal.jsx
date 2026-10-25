import React from 'react';

export default function CreateTopicModal({
  isOpen,
  onClose,
  onSubmit,
  form,
  setForm,
  giangVienList,
  deTaiList
}) {
  if (!isOpen) return null;

  const existingTopicOfStudent = (deTaiList || []).find(d =>
    d.trangThai !== 'GV_TU_CHOI' &&
    d.trangThai !== 'BO_MON_TU_CHOI' &&
    (d.danhSachSinhVien || []).some(s => s.maSoSinhVien === form.maSoSinhVien?.trim())
  );

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
      <div style={{ background: '#fff', borderRadius: '8px', maxWidth: '580px', width: '100%', padding: '1.75rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
        <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1.15rem', fontWeight: 600 }}>Nộp Đề xuất Đề tài Khóa luận Tốt nghiệp</h3>

        <form onSubmit={onSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>Mã đề tài</label>
              <input
                type="text"
                value={form.maDeTai}
                onChange={(e) => setForm({ ...form, maDeTai: e.target.value })}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>MSSV đăng ký</label>
              <input
                type="text"
                value={form.maSoSinhVien}
                onChange={(e) => setForm({ ...form, maSoSinhVien: e.target.value })}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>Tên đề tài</label>
            <input
              type="text"
              placeholder="Nhập tên đề tài nghiên cứu..."
              value={form.tenDeTai}
              onChange={(e) => setForm({ ...form, tenDeTai: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }}
              required
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>Giảng viên hướng dẫn</label>
            <select
              value={form.maGiangVien}
              onChange={(e) => setForm({ ...form, maGiangVien: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }}
            >
              {giangVienList.map((gv) => (
                <option key={gv.maGiangVien} value={gv.maGiangVien}>
                  {gv.hoTen} ({gv.maGiangVien})
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>Mô tả phạm vi nghiên cứu</label>
            <textarea
              rows={3}
              placeholder="Trình bày vắn tắt mục tiêu và phương pháp..."
              value={form.moTa}
              onChange={(e) => setForm({ ...form, moTa: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={form.timDongDoi}
                onChange={(e) => setForm({ ...form, timDongDoi: e.target.checked })}
              />
              <span>Bật tính năng tìm kiếm 01 thành viên ghép đội (BR-01)</span>
            </label>
          </div>

          {existingTopicOfStudent && (
            <div style={{ color: '#b91c1c', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', marginBottom: '1.25rem', lineHeight: 1.4 }}>
              ⚠️ <strong>Cảnh báo quy chế BR-04:</strong> Sinh viên <strong>{form.maSoSinhVien}</strong> hiện đã tham gia đề tài <strong>{existingTopicOfStudent.maDeTai}</strong>. Mỗi sinh viên chỉ được tham gia tối đa 1 đề tài trong một học kỳ.
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-outline"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={Boolean(existingTopicOfStudent)}
              style={{
                opacity: existingTopicOfStudent ? 0.5 : 1,
                cursor: existingTopicOfStudent ? 'not-allowed' : 'pointer'
              }}
            >
              Gửi đề xuất
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
