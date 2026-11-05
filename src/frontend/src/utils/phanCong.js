export const SO_GIANG_VIEN_TOI_DA = 5;

export const NHAN_TRANG_THAI_DUYET = {
  CHO_DUYET: { text: 'Chờ duyệt', color: '#b45309', bg: '#fffbeb', border: '#fde68a' },
  DONG_Y: { text: 'Đồng ý', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0' },
  TU_CHOI: { text: 'Từ chối', color: '#b91c1c', bg: '#fef2f2', border: '#fecaca' }
};

function suyTrangThaiPhanCu(trangThaiDeTai) {
  if (trangThaiDeTai === 'CHO_GV_DONG_Y') return 'CHO_DUYET';
  if (trangThaiDeTai === 'GV_TU_CHOI') return 'TU_CHOI';
  return 'DONG_Y';
}

// Đề tài lưu tạm trong trình duyệt từ trước TD-04 chỉ có giangVienHuongDan.
export function layPhanCong(topic) {
  if (topic?.danhSachPhanCong?.length) return topic.danhSachPhanCong;
  if (!topic?.giangVienHuongDan) return [];
  return [{ giangVien: topic.giangVienHuongDan, trangThaiDuyet: suyTrangThaiPhanCu(topic.trangThai) }];
}

export function giuChiTieuCuaGiangVien(topic, maGiangVien) {
  if (topic.trangThai === 'GV_TU_CHOI' || topic.trangThai === 'BO_MON_TU_CHOI') return false;
  return layPhanCong(topic).some(pc => pc.giangVien?.maGiangVien === maGiangVien && pc.trangThaiDuyet !== 'TU_CHOI');
}

export function demSinhVienDangHuongDan(deTaiList, maGiangVien) {
  return (deTaiList || [])
    .filter(d => giuChiTieuCuaGiangVien(d, maGiangVien))
    .reduce((sum, d) => sum + (d.danhSachSinhVien || []).length, 0);
}

export function tinhTrangThaiSauThamDinh(danhSachPhanCong) {
  if (danhSachPhanCong.some(pc => pc.trangThaiDuyet === 'CHO_DUYET')) return 'CHO_GV_DONG_Y';
  return danhSachPhanCong.some(pc => pc.trangThaiDuyet === 'DONG_Y') ? 'CHO_BO_MON_DUYET' : 'GV_TU_CHOI';
}
