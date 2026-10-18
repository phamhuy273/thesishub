import React from 'react';

export default function CreateTopicModal({
  isOpen,
  onClose,
  onSubmit,
  form,
  setForm,
  giangVienList
}) {
  if (!isOpen) return null;

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

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={onClose}
              style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.85rem', cursor: 'pointer' }}
            >
              Hủy
            </button>
            <button
              type="submit"
              style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.5rem 1.25rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
            >
              Gửi đề xuất
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
