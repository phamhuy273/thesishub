import pytest

class ViPhamQuyChe(Exception):
    pass

class VuotQuaSoLuongSinhVien(ViPhamQuyChe):
    pass

class VuotQuaHanNgachGiangVien(ViPhamQuyChe):
    pass

class KhongDuocPhepHuy(ViPhamQuyChe):
    pass

class ViPhamBatBienBR04(ViPhamQuyChe):
    pass

class TuUngTuyenChinhMinh(ViPhamQuyChe):
    pass

class GiangVien:
    def __init__(self, ma_gv, ho_ten, so_luong_toi_da=10):
        self.ma_gv = ma_gv
        self.ho_ten = ho_ten
        self.so_luong_toi_da = so_luong_toi_da
        self.so_luong_hien_tai = 0

    def tang_so_luong(self, so_luong=1):
        if self.so_luong_hien_tai + so_luong > self.so_luong_toi_da:
            raise VuotQuaHanNgachGiangVien(
                f"Giang vien {self.ho_ten} da dat toi da han ngach {self.so_luong_toi_da} sinh vien"
            )
        self.so_luong_hien_tai += so_luong

    def giam_so_luong(self, so_luong=1):
        self.so_luong_hien_tai = max(0, self.so_luong_hien_tai - so_luong)

class SinhVien:
    def __init__(self, mssv, ho_ten):
        self.mssv = mssv
        self.ho_ten = ho_ten

class DeTai:
    def __init__(self, ma_de_tai, ten_de_tai, giang_vien, sinh_vien_khoi_tao, tim_dong_doi=True):
        self.ma_de_tai = ma_de_tai
        self.ten_de_tai = ten_de_tai
        self.giang_vien = giang_vien
        self.danh_sach_sinh_vien = []
        self.trang_thai = "CHO_GV_DONG_Y"
        self.dang_tim_dong_doi = tim_dong_doi

        self.giang_vien.tang_so_luong(1)
        self.danh_sach_sinh_vien.append(sinh_vien_khoi_tao)

    def ung_tuyen_ghep_doi(self, sinh_vien):
        if any(s.mssv == sinh_vien.mssv for s in self.danh_sach_sinh_vien):
            raise TuUngTuyenChinhMinh(f"Sinh vien {sinh_vien.mssv} da la thanh vien cua de tai nay")

        if len(self.danh_sach_sinh_vien) >= 2 or not self.dang_tim_dong_doi:
            raise VuotQuaSoLuongSinhVien("De tai khong tim dong doi hoac da du 2 thanh vien")

        self.giang_vien.tang_so_luong(1)
        self.danh_sach_sinh_vien.append(sinh_vien)
        if len(self.danh_sach_sinh_vien) >= 2:
            self.dang_tim_dong_doi = False

    def huy_de_xuat(self, mssv_yeu_cau):
        if self.trang_thai != "CHO_GV_DONG_Y":
            raise KhongDuocPhepHuy("Chi duoc huy de xuat de tai khi dang o trang thai cho GV tham dinh")

        if not any(s.mssv == mssv_yeu_cau for s in self.danh_sach_sinh_vien):
            raise KhongDuocPhepHuy("Chi sinh vien trong nhom moi co quyen huy de xuat nay")

        self.giang_vien.giam_so_luong(len(self.danh_sach_sinh_vien))
        self.trang_thai = "DA_HUY"

    def gv_duyet(self):
        if self.trang_thai != "CHO_GV_DONG_Y":
            raise ViPhamQuyChe("Trang thai khong hop le de GV duyet")
        self.trang_thai = "CHO_BO_MON_DUYET"

    def gv_tu_choi(self):
        if self.trang_thai != "CHO_GV_DONG_Y":
            raise ViPhamQuyChe("Trang thai khong hop le de GV tu choi")
        self.giang_vien.giam_so_luong(len(self.danh_sach_sinh_vien))
        self.trang_thai = "GV_TU_CHOI"

    def bo_mon_duyet(self):
        if self.trang_thai != "CHO_BO_MON_DUYET":
            raise ViPhamQuyChe("Trang thai khong hop le de Bo mon duyet")
        self.trang_thai = "DUOC_BAO_VE"

    def bo_mon_tu_choi(self):
        if self.trang_thai != "CHO_BO_MON_DUYET":
            raise ViPhamQuyChe("Trang thai khong hop le de Bo mon tu choi")
        self.giang_vien.giam_so_luong(len(self.danh_sach_sinh_vien))
        self.trang_thai = "BO_MON_TU_CHOI"

class HeThongThesisHub:
    def __init__(self):
        self.danh_sach_de_tai = []

    def kiem_tra_sinh_vien_co_de_tai(self, mssv):
        for dt in self.danh_sach_de_tai:
            if dt.trang_thai not in ("GV_TU_CHOI", "BO_MON_TU_CHOI", "DA_HUY"):
                if any(s.mssv == mssv for s in dt.danh_sach_sinh_vien):
                    return True
        return False

    def nop_de_tai(self, ma_de_tai, ten_de_tai, giang_vien, sinh_vien, tim_dong_doi=True):
        if any(d.ma_de_tai == ma_de_tai and d.trang_thai != "DA_HUY" for d in self.danh_sach_de_tai):
            raise ViPhamQuyChe(f"Ma de tai {ma_de_tai} da ton tai")

        if self.kiem_tra_sinh_vien_co_de_tai(sinh_vien.mssv):
            raise ViPhamBatBienBR04(f"Sinh vien {sinh_vien.mssv} da co de tai trong hoc ky (BR-04)")

        dt = DeTai(ma_de_tai, ten_de_tai, giang_vien, sinh_vien, tim_dong_doi)
        self.danh_sach_de_tai.append(dt)
        return dt

    def ung_tuyen(self, ma_de_tai, sinh_vien):
        dt = next((d for d in self.danh_sach_de_tai if d.ma_de_tai == ma_de_tai), None)
        if not dt:
            raise ViPhamQuyChe("Khong tim thay de tai")

        if self.kiem_tra_sinh_vien_co_de_tai(sinh_vien.mssv):
            raise ViPhamBatBienBR04(f"Sinh vien {sinh_vien.mssv} da co de tai trong hoc ky (BR-04)")

        dt.ung_tuyen_ghep_doi(sinh_vien)
        return dt

    def huy_de_tai(self, ma_de_tai, mssv):
        dt = next((d for d in self.danh_sach_de_tai if d.ma_de_tai == ma_de_tai), None)
        if not dt:
            raise ViPhamQuyChe("Khong tim thay de tai de huy")
        dt.huy_de_xuat(mssv)
        return dt


def test_BR01_de_tai_toi_da_2_sinh_vien():
    gv = GiangVien("GV01", "Nguyen Van A")
    sv1 = SinhVien("SV01", "Sinh vien 1")
    sv2 = SinhVien("SV02", "Sinh vien 2")
    sv3 = SinhVien("SV03", "Sinh vien 3")

    dt = DeTai("DT01", "De tai 1", gv, sv1, tim_dong_doi=True)
    assert len(dt.danh_sach_sinh_vien) == 1
    assert dt.dang_tim_dong_doi is True

    dt.ung_tuyen_ghep_doi(sv2)
    assert len(dt.danh_sach_sinh_vien) == 2
    assert dt.dang_tim_dong_doi is False

    with pytest.raises(VuotQuaSoLuongSinhVien):
        dt.ung_tuyen_ghep_doi(sv3)


def test_BR02_giang_vien_gioi_han_10_sinh_vien():
    gv = GiangVien("GV01", "Nguyen Van A", so_luong_toi_da=10)
    for i in range(10):
        gv.tang_so_luong(1)
    assert gv.so_luong_hien_tai == 10

    with pytest.raises(VuotQuaHanNgachGiangVien):
        gv.tang_so_luong(1)


def test_BR02_hoan_tra_chi_tieu_khi_huy_de_tai():
    gv = GiangVien("GV01", "Nguyen Van A", so_luong_toi_da=10)
    sv1 = SinhVien("SV01", "Sinh vien 1")
    sv2 = SinhVien("SV02", "Sinh vien 2")

    dt = DeTai("DT01", "De tai 1", gv, sv1, tim_dong_doi=True)
    dt.ung_tuyen_ghep_doi(sv2)
    assert gv.so_luong_hien_tai == 2

    dt.huy_de_xuat("SV01")
    assert gv.so_luong_hien_tai == 0
    assert dt.trang_thai == "DA_HUY"


def test_BR02_hoan_tra_chi_tieu_khi_gv_hoac_bo_mon_tu_choi():
    gv = GiangVien("GV01", "Nguyen Van A", so_luong_toi_da=10)
    sv1 = SinhVien("SV01", "Sinh vien 1")

    dt1 = DeTai("DT01", "De tai 1", gv, sv1)
    assert gv.so_luong_hien_tai == 1
    dt1.gv_tu_choi()
    assert gv.so_luong_hien_tai == 0
    assert dt1.trang_thai == "GV_TU_CHOI"

    dt2 = DeTai("DT02", "De tai 2", gv, sv1)
    assert gv.so_luong_hien_tai == 1
    dt2.gv_duyet()
    assert dt2.trang_thai == "CHO_BO_MON_DUYET"
    dt2.bo_mon_tu_choi()
    assert gv.so_luong_hien_tai == 0
    assert dt2.trang_thai == "BO_MON_TU_CHOI"


def test_BR03_quy_trinh_xet_duyet_2_cap():
    gv = GiangVien("GV01", "Nguyen Van A")
    sv = SinhVien("SV01", "Sinh vien 1")

    dt = DeTai("DT01", "De tai 1", gv, sv)
    assert dt.trang_thai == "CHO_GV_DONG_Y"

    dt.gv_duyet()
    assert dt.trang_thai == "CHO_BO_MON_DUYET"

    dt.bo_mon_duyet()
    assert dt.trang_thai == "DUOC_BAO_VE"


def test_BR03_khong_the_huy_khi_da_qua_cho_bo_mon_duyet():
    gv = GiangVien("GV01", "Nguyen Van A")
    sv = SinhVien("SV01", "Sinh vien 1")

    dt = DeTai("DT01", "De tai 1", gv, sv)
    dt.gv_duyet()

    with pytest.raises(KhongDuocPhepHuy):
        dt.huy_de_xuat("SV01")


def test_BR04_sinh_vien_da_co_de_tai_khong_duoc_nop_de_tai_khac():
    ht = HeThongThesisHub()
    gv = GiangVien("GV01", "Nguyen Van A")
    sv1 = SinhVien("SV01", "Sinh vien 1")

    ht.nop_de_tai("DT01", "De tai 1", gv, sv1)

    with pytest.raises(ViPhamBatBienBR04):
        ht.nop_de_tai("DT02", "De tai 2", gv, sv1)


def test_BR04_sinh_vien_da_co_de_tai_khong_duoc_ung_tuyen_de_tai_khac():
    ht = HeThongThesisHub()
    gv = GiangVien("GV01", "Nguyen Van A")
    sv1 = SinhVien("SV01", "Sinh vien 1")
    sv2 = SinhVien("SV02", "Sinh vien 2")

    ht.nop_de_tai("DT01", "De tai 1", gv, sv1)
    ht.nop_de_tai("DT02", "De tai 2", gv, sv2, tim_dong_doi=True)

    with pytest.raises(ViPhamBatBienBR04):
        ht.ung_tuyen("DT02", sv1)


def test_BR04_sinh_vien_khong_duoc_tu_ung_tuyen_vao_de_tai_cua_minh():
    ht = HeThongThesisHub()
    gv = GiangVien("GV01", "Nguyen Van A")
    sv1 = SinhVien("SV01", "Sinh vien 1")

    ht.nop_de_tai("DT01", "De tai 1", gv, sv1, tim_dong_doi=True)

    with pytest.raises(TuUngTuyenChinhMinh):
        dt = ht.danh_sach_de_tai[0]
        dt.ung_tuyen_ghep_doi(sv1)


def test_BR04_giai_phong_sinh_vien_sau_khi_huy_de_tai():
    ht = HeThongThesisHub()
    gv = GiangVien("GV01", "Nguyen Van A")
    sv1 = SinhVien("SV01", "Sinh vien 1")

    ht.nop_de_tai("DT01", "De tai 1", gv, sv1)
    assert ht.kiem_tra_sinh_vien_co_de_tai("SV01") is True

    ht.huy_de_tai("DT01", "SV01")
    assert ht.kiem_tra_sinh_vien_co_de_tai("SV01") is False

    dt_moi = ht.nop_de_tai("DT02", "De tai 2 moi", gv, sv1)
    assert dt_moi.ma_de_tai == "DT02"
    assert len(dt_moi.danh_sach_sinh_vien) == 1
