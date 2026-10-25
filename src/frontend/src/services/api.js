const API_BASE = import.meta.env.DEV
  ? (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api')
  : ((import.meta.env.VITE_API_BASE_URL && !import.meta.env.VITE_API_BASE_URL.includes('localhost'))
      ? import.meta.env.VITE_API_BASE_URL
      : 'https://thesishub-4oxj.onrender.com/api');

const DEFAULT_GV = [
  { id: 1, maGiangVien: 'GV01', hoTen: 'TS. Nguyễn Văn A', email: 'nva@uit.edu.vn', soLuongSinhVienToiDa: 10, soLuongHienTai: 2 },
  { id: 2, maGiangVien: 'GV02', hoTen: 'PGS.TS. Trần Thị B', email: 'ttb@uit.edu.vn', soLuongSinhVienToiDa: 10, soLuongHienTai: 1 }
];

const DEFAULT_SV = [
  { id: 1, maSoSinhVien: 'SV01', hoTen: 'Nguyễn Văn C', lop: 'KTPM2023', email: 'sv.c@uit.edu.vn' },
  { id: 2, maSoSinhVien: 'SV02', hoTen: 'Lê Thị D', lop: 'KTPM2023', email: 'sv.d@uit.edu.vn' },
  { id: 3, maSoSinhVien: 'SV03', hoTen: 'Phạm Văn E', lop: 'KTPM2023', email: 'sv.e@uit.edu.vn' }
];

const DEFAULT_DE_TAI = [
  {
    id: 1,
    maDeTai: 'DT01',
    tenDeTai: 'Xây dựng hệ thống quản lý và xét duyệt đề tài tốt nghiệp ThesisHub',
    moTa: 'Hệ thống hỗ trợ sinh viên và giảng viên quản lý quy trình đồ án tốt nghiệp bậc đại học.',
    trangThai: 'CHO_GV_DONG_Y',
    dangTimDongDoi: false,
    giangVienHuongDan: DEFAULT_GV[0],
    danhSachSinhVien: [DEFAULT_SV[0], DEFAULT_SV[2]]
  },
  {
    id: 2,
    maDeTai: 'DT02',
    tenDeTai: 'Nghiên cứu ứng dụng Blockchain trong xác thực văn bằng tốt nghiệp',
    moTa: 'Đề tài phân tích mô hình xác thực bằng đại học trên hệ thống phân tán chống gian lận.',
    trangThai: 'DUOC_BAO_VE',
    dangTimDongDoi: true,
    giangVienHuongDan: DEFAULT_GV[1],
    danhSachSinhVien: [DEFAULT_SV[1]]
  }
];

function getStorage(key, fallback) {
  const data = localStorage.getItem('th_' + key);
  if (!data) {
    localStorage.setItem('th_' + key, JSON.stringify(fallback));
    return fallback;
  }
  try {
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed) && parsed.some(d => (d.tenDeTai && d.tenDeTai.includes('coding fixed')) || (d.moTa && d.moTa.includes('coding fixed')))) {
      localStorage.setItem('th_' + key, JSON.stringify(fallback));
      return fallback;
    }
    return parsed;
  } catch (e) {
    return fallback;
  }
}

function setStorage(key, value) {
  localStorage.setItem('th_' + key, JSON.stringify(value));
}

export async function fetchDeTaiList() {
  try {
    const res = await fetch(`${API_BASE}/de-tai`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const data = await res.json();
      setStorage('detai', data);
      return { data, isBackend: true };
    }
  } catch (err) {}
  return { data: getStorage('detai', DEFAULT_DE_TAI), isBackend: false };
}

export async function createDeTai(payload) {
  try {
    const res = await fetch(`${API_BASE}/de-tai`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(6000)
    });
    if (res.ok) {
      return await res.json();
    }
    const errText = await res.text();
    let errMsg = 'Lỗi khi gửi đề xuất lên máy chủ';
    try {
      const errJson = JSON.parse(errText);
      errMsg = errJson.message || (errJson.error === 'Internal Server Error' ? `Mã đề tài "${payload.maDeTai}" đã tồn tại` : errJson.error) || errText;
    } catch (e) {
      errMsg = errText || 'Lỗi khi gửi đề xuất lên máy chủ';
    }
    throw new Error(errMsg);
  } catch (err) {
    if (err.message && !err.message.includes('fetch')) {
      throw err;
    }
  }

  const list = getStorage('detai', DEFAULT_DE_TAI);
  if (list.some(d => d.maDeTai === payload.maDeTai)) {
    throw new Error('Mã đề tài đã tồn tại');
  }

  const daCoDeTai = list.some(d =>
    d.trangThai !== 'GV_TU_CHOI' &&
    d.trangThai !== 'BO_MON_TU_CHOI' &&
    (d.danhSachSinhVien || []).some(s => s.maSoSinhVien === payload.maSoSinhVien)
  );
  if (daCoDeTai) {
    throw new Error(`Sinh viên ${payload.maSoSinhVien} đã có đề tài trong học kỳ (Vi phạm bất biến BR-04)`);
  }

  const gv = DEFAULT_GV.find(g => g.maGiangVien === payload.maGiangVien) || DEFAULT_GV[0];
  const sv = DEFAULT_SV.find(s => s.maSoSinhVien === payload.maSoSinhVien) || {
    maSoSinhVien: payload.maSoSinhVien,
    hoTen: 'Sinh viên ' + payload.maSoSinhVien,
    lop: 'KTPM2023'
  };

  const newTopic = {
    id: Date.now(),
    maDeTai: payload.maDeTai,
    tenDeTai: payload.tenDeTai,
    moTa: payload.moTa,
    trangThai: 'CHO_GV_DONG_Y',
    dangTimDongDoi: Boolean(payload.timDongDoi),
    giangVienHuongDan: gv,
    danhSachSinhVien: [sv]
  };

  list.unshift(newTopic);
  setStorage('detai', list);
  return newTopic;
}

export async function applyTeam(maDeTai, maSoSinhVien) {
  try {
    const res = await fetch(`${API_BASE}/de-tai/${maDeTai}/ung-tuyen`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ maSoSinhVien }),
      signal: AbortSignal.timeout(6000)
    });
    if (res.ok) {
      return await res.json();
    }
    const errText = await res.text();
    let errMsg = 'Lỗi khi ứng tuyển';
    try {
      const errJson = JSON.parse(errText);
      errMsg = errJson.message || errJson.error || errText;
    } catch (e) {
      errMsg = errText || 'Lỗi khi ứng tuyển';
    }
    throw new Error(errMsg);
  } catch (err) {
    if (err.message && !err.message.includes('fetch')) {
      throw err;
    }
  }

  const list = getStorage('detai', DEFAULT_DE_TAI);
  const target = list.find(d => d.maDeTai === maDeTai);
  if (!target) throw new Error('Không tìm thấy đề tài');
  if (!target.dangTimDongDoi || (target.danhSachSinhVien && target.danhSachSinhVien.length >= 2)) {
    throw new Error('Đề tài không tìm đồng đội hoặc đã đủ 2 thành viên');
  }

  if (target.danhSachSinhVien && target.danhSachSinhVien.some(s => s.maSoSinhVien === maSoSinhVien)) {
    throw new Error('Sinh viên đã là thành viên của đề tài này');
  }

  const daCoDeTaiKhac = list.some(d =>
    d.maDeTai !== maDeTai &&
    d.trangThai !== 'GV_TU_CHOI' &&
    d.trangThai !== 'BO_MON_TU_CHOI' &&
    (d.danhSachSinhVien || []).some(s => s.maSoSinhVien === maSoSinhVien)
  );
  if (daCoDeTaiKhac) {
    throw new Error(`Sinh viên ${maSoSinhVien} đã có đề tài trong học kỳ, không thể ứng tuyển (Vi phạm BR-04)`);
  }

  const sv = DEFAULT_SV.find(s => s.maSoSinhVien === maSoSinhVien) || {
    maSoSinhVien,
    hoTen: 'Sinh viên ' + maSoSinhVien,
    lop: 'KTPM2023'
  };

  target.danhSachSinhVien = target.danhSachSinhVien || [];
  target.danhSachSinhVien.push(sv);
  if (target.danhSachSinhVien.length >= 2) {
    target.dangTimDongDoi = false;
  }
  setStorage('detai', list);
  return target;
}

export async function updateTrangThai(maDeTai, actionEndpoint) {
  try {
    const res = await fetch(`${API_BASE}/de-tai/${maDeTai}/${actionEndpoint}`, {
      method: 'PUT',
      signal: AbortSignal.timeout(6000)
    });
    if (res.ok) {
      return await res.json();
    }
    const errText = await res.text();
    let errMsg = 'Lỗi khi cập nhật trạng thái';
    try {
      const errJson = JSON.parse(errText);
      errMsg = errJson.message || errJson.error || errText;
    } catch (e) {
      errMsg = errText || 'Lỗi khi cập nhật trạng thái';
    }
    throw new Error(errMsg);
  } catch (err) {
    if (err.message && !err.message.includes('fetch')) {
      throw err;
    }
  }

  const list = getStorage('detai', DEFAULT_DE_TAI);
  const target = list.find(d => d.maDeTai === maDeTai);
  if (!target) throw new Error('Không tìm thấy đề tài');

  if (actionEndpoint === 'gv-duyet') {
    target.trangThai = 'CHO_BO_MON_DUYET';
  } else if (actionEndpoint === 'gv-tu-choi') {
    target.trangThai = 'GV_TU_CHOI';
  } else if (actionEndpoint === 'bo-mon-duyet') {
    target.trangThai = 'DUOC_BAO_VE';
  } else if (actionEndpoint === 'bo-mon-tu-choi') {
    target.trangThai = 'BO_MON_TU_CHOI';
  }

  setStorage('detai', list);
  return target;
}

export function getGiangVienList() {
  return DEFAULT_GV;
}
