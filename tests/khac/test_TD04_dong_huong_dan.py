"""Dac ta thuc thi duoc cho luat TD-04 (dong huong dan 1..5 giang vien).

Theo nep cua tests/luat/test_toan_bo_logic.py: chay khong can CSDL, dung mo hinh Python
mo phong. Cac test nay KHONG goi ma Java; ma that duoc kiem boi JUnit trong
src/backend/src/test/java/.../DeTaiTotNghiepTD04Test.java va DeTaiServiceTD04Test.java.
"""
import pytest

SO_GIANG_VIEN_TOI_DA = 5
HAN_MUC = 10


class ViPhamQuyChe(Exception):
    pass


class GiangVien:
    def __init__(self, ma, han_muc=HAN_MUC):
        self.ma = ma
        self.han_muc = han_muc
        self.so_luong = 0


class DeTai:
    def __init__(self, ma, ds_gv, so_sinh_vien=1):
        if not ds_gv or len(ds_gv) > SO_GIANG_VIEN_TOI_DA:
            raise ViPhamQuyChe("Moi de tai co tu 1 den 5 giang vien")
        if len({gv.ma for gv in ds_gv}) != len(ds_gv):
            raise ViPhamQuyChe("Giang vien bi chon hai lan")
        for gv in ds_gv:
            if gv.so_luong + so_sinh_vien > gv.han_muc:
                raise ViPhamQuyChe(f"BR-01: {gv.ma} het han muc")
        for gv in ds_gv:
            gv.so_luong += so_sinh_vien
        self.ma = ma
        self.so_sinh_vien = so_sinh_vien
        self.trang_thai = "CHO_GV_DONG_Y"
        self.phan = {gv.ma: {"gv": gv, "trang_thai": "CHO_DUYET"} for gv in ds_gv}

    def _phan_cho_duyet(self, ma_gv):
        if self.trang_thai != "CHO_GV_DONG_Y":
            raise ViPhamQuyChe("Trang thai khong hop le")
        if ma_gv not in self.phan:
            raise ViPhamQuyChe("Giang vien khong huong dan de tai")
        phan = self.phan[ma_gv]
        if phan["trang_thai"] != "CHO_DUYET":
            raise ViPhamQuyChe("Giang vien da cho y kien")
        return phan

    def _cap_nhat(self):
        trang_thai = [p["trang_thai"] for p in self.phan.values()]
        if "CHO_DUYET" in trang_thai:
            return
        self.trang_thai = "CHO_BO_MON_DUYET" if "DONG_Y" in trang_thai else "GV_TU_CHOI"

    def dong_y(self, ma_gv):
        self._phan_cho_duyet(ma_gv)["trang_thai"] = "DONG_Y"
        self._cap_nhat()

    def tu_choi(self, ma_gv):
        phan = self._phan_cho_duyet(ma_gv)
        phan["trang_thai"] = "TU_CHOI"
        phan["gv"].so_luong -= self.so_sinh_vien
        self._cap_nhat()

    def bo_mon_tu_choi(self):
        for phan in self.phan.values():
            if phan["trang_thai"] != "TU_CHOI":
                phan["gv"].so_luong -= self.so_sinh_vien
        self.trang_thai = "BO_MON_TU_CHOI"


def ds_gv(so_luong):
    return [GiangVien(f"GV{i}") for i in range(1, so_luong + 1)]


@pytest.mark.parametrize("so_luong", [1, 2, 5])
def test_TD04_chap_nhan_tu_1_den_5_giang_vien(so_luong):
    assert len(DeTai("DT", ds_gv(so_luong)).phan) == so_luong


@pytest.mark.parametrize("so_luong", [0, 6])
def test_TD04_ngoai_khoang_1_den_5_bi_tu_choi_va_khong_tinh_chi_tieu(so_luong):
    giang_vien = ds_gv(so_luong)
    with pytest.raises(ViPhamQuyChe):
        DeTai("DT", giang_vien)
    assert all(gv.so_luong == 0 for gv in giang_vien)


def test_TD04_mot_giang_vien_tu_choi_khong_huy_phan_khac():
    de_tai = DeTai("DT", ds_gv(3))
    de_tai.tu_choi("GV1")
    assert de_tai.phan["GV1"]["trang_thai"] == "TU_CHOI"
    assert de_tai.phan["GV2"]["trang_thai"] == "CHO_DUYET"
    assert de_tai.trang_thai == "CHO_GV_DONG_Y"


def test_TD04_chua_du_y_kien_thi_chua_len_bo_mon():
    de_tai = DeTai("DT", ds_gv(2))
    de_tai.dong_y("GV1")
    assert de_tai.trang_thai == "CHO_GV_DONG_Y"


def test_TD04_du_y_kien_va_mot_nguoi_dong_y_thi_len_bo_mon():
    de_tai = DeTai("DT", ds_gv(3))
    de_tai.tu_choi("GV1")
    de_tai.tu_choi("GV2")
    de_tai.dong_y("GV3")
    assert de_tai.trang_thai == "CHO_BO_MON_DUYET"


def test_TD04_tat_ca_tu_choi_thi_ve_GV_TU_CHOI():
    de_tai = DeTai("DT", ds_gv(2))
    de_tai.tu_choi("GV1")
    de_tai.tu_choi("GV2")
    assert de_tai.trang_thai == "GV_TU_CHOI"


def test_TD04_moi_giang_vien_chi_cho_y_kien_mot_lan():
    de_tai = DeTai("DT", ds_gv(2))
    de_tai.dong_y("GV1")
    with pytest.raises(ViPhamQuyChe):
        de_tai.tu_choi("GV1")


def test_BR01_mot_giang_vien_het_han_muc_thi_chan_ca_de_tai():
    con_cho = GiangVien("GV1")
    het_cho = GiangVien("GV2", han_muc=0)
    with pytest.raises(ViPhamQuyChe):
        DeTai("DT", [con_cho, het_cho])
    assert con_cho.so_luong == 0


def test_BR01_giang_vien_tu_choi_duoc_hoan_ngay_nguoi_khac_giu_nguyen():
    giang_vien = ds_gv(2)
    de_tai = DeTai("DT", giang_vien, so_sinh_vien=2)
    de_tai.tu_choi("GV1")
    assert [gv.so_luong for gv in giang_vien] == [0, 2]


def test_BR01_bo_mon_tu_choi_chi_hoan_cho_giang_vien_chua_tu_choi():
    giang_vien = ds_gv(2)
    de_tai = DeTai("DT", giang_vien)
    de_tai.tu_choi("GV1")
    de_tai.dong_y("GV2")
    de_tai.bo_mon_tu_choi()
    assert [gv.so_luong for gv in giang_vien] == [0, 0]
