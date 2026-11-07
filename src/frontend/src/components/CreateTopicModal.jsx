import React from 'react';
import { SO_GIANG_VIEN_TOI_DA, demSinhVienDangHuongDan } from '../utils/phanCong';

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

  const selectedGV = form.danhSachMaGiangVien || [];
  const isDuGiangVien = selectedGV.length >= SO_GIANG_VIEN_TOI_DA;
  const isSelectedGVFull = selectedGV.some(ma => demSinhVienDangHuongDan(deTaiList, ma) >= 10);
  const isThieuGiangVien = selectedGV.length === 0;

  const toggleGiangVien = (ma) => {
    const daChon = selectedGV.includes(ma);
    if (!daChon && isDuGiangVien) return;
    setForm({ ...form, danhSachMaGiangVien: daChon ? selectedGV.filter(m => m !== ma) : [...selectedGV, ma] });
  };

  const isDuplicateMaDeTai = (deTaiList || []).some(d => d.maDeTai?.toLowerCase() === form.maDeTai?.trim().toLowerCase());

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
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
              Giảng viên hướng dẫn ({selectedGV.length}/{SO_GIANG_VIEN_TOI_DA})
            </label>
            <div style={{ border: '1px solid #cbd5e1', borderRadius: '4px', padding: '0.5rem', maxHeight: '140px', overflowY: 'auto' }}>
              {giangVienList.map((gv) => {
                const count = demSinhVienDangHuongDan(deTaiList, gv.maGiangVien);
                const isFull = count >= (gv.soLuongSinhVienToiDa || 10);
                const daChon = selectedGV.includes(gv.maGiangVien);
                const khongChonDuoc = !daChon && (isFull || isDuGiangVien);
                return (
                  <label key={gv.maGiangVien} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', padding: '2px 0', cursor: khongChonDuoc ? 'not-allowed' : 'pointer', color: khongChonDuoc ? '#94a3b8' : 'inherit' }}>
                    <input
                      type="checkbox"
                      checked={daChon}
                      disabled={khongChonDuoc}
                      onChange={() => toggleGiangVien(gv.maGiangVien)}
                    />
                    <span>{gv.hoTen} ({gv.maGiangVien}) — {isFull ? 'Đã đủ hạn ngạch 10/10 (BR-01)' : `Còn ${10 - count} chỗ`}</span>
                  </label>
                );
              })}
            </div>
            {isDuGiangVien && (
              <div style={{ fontSize: '0.75rem', color: '#b45309', marginTop: '0.25rem' }}>
                Đã chọn đủ {SO_GIANG_VIEN_TOI_DA} giảng viên, không thể thêm người thứ {SO_GIANG_VIEN_TOI_DA + 1}.
              </div>
            )}
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

          {isDuplicateMaDeTai && (
            <div style={{ color: '#b91c1c', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', marginBottom: '1.25rem', lineHeight: 1.4 }}>
              ⚠️ Mã đề tài <strong>{form.maDeTai}</strong> đã tồn tại trên hệ thống. Vui lòng nhập mã khác.
            </div>
          )}

          {isSelectedGVFull && (
            <div style={{ color: '#b91c1c', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', marginBottom: '1.25rem', lineHeight: 1.4 }}>
              ⚠️ <strong>Cảnh báo quy chế BR-01:</strong> Có giảng viên đã đạt giới hạn tối đa 10 sinh viên hướng dẫn. Vui lòng bỏ chọn giảng viên đó.
            </div>
          )}

          {existingTopicOfStudent && (
            <div style={{ color: '#b91c1c', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', marginBottom: '1.25rem', lineHeight: 1.4 }}>
              ⚠️ <strong>Cảnh báo quy chế BR-04:</strong> Sinh viên <strong>{form.maSoSinhVien}</strong> hiện đã tham gia đề tài <strong>{existingTopicOfStudent.maDeTai}</strong>. Mỗi sinh viên chỉ được tham gia tối đa 1 đề tài trong một học kỳ.
              <div style={{ marginTop: '6px' }}>
                <span style={{ fontSize: '12px', color: '#475569' }}>Gợi ý: Chọn MSSV chưa có đề tài như </span>
                {['SV04', 'SV05', 'SV06', 'SV07', 'SV08']
                  .filter(id => !(deTaiList || []).some(d => d.trangThai !== 'GV_TU_CHOI' && d.trangThai !== 'BO_MON_TU_CHOI' && (d.danhSachSinhVien || []).some(s => s.maSoSinhVien === id)))
                  .slice(0, 3)
                  .map(suggestId => (
                    <button
                      key={suggestId}
                      type="button"
                      onClick={() => setForm({ ...form, maSoSinhVien: suggestId })}
                      style={{ marginLeft: '4px', padding: '2px 8px', fontSize: '12px', background: '#e0f2fe', color: '#0369a1', border: '1px solid #bae6fd', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Dùng {suggestId}
                    </button>
                  ))}
              </div>
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
              disabled={Boolean(existingTopicOfStudent || isSelectedGVFull || isDuplicateMaDeTai || isThieuGiangVien)}
              style={{
                opacity: (existingTopicOfStudent || isSelectedGVFull || isDuplicateMaDeTai || isThieuGiangVien) ? 0.5 : 1,
                cursor: (existingTopicOfStudent || isSelectedGVFull || isDuplicateMaDeTai || isThieuGiangVien) ? 'not-allowed' : 'pointer'
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
