package vn.edu.uit.se100.thesishub.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.JoinTable;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "de_tai_tot_nghiep")
public class DeTaiTotNghiep {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ma_de_tai", nullable = false, unique = true)
    private String maDeTai;

    @Column(name = "ten_de_tai", nullable = false)
    private String tenDeTai;

    @Column(name = "mo_ta", columnDefinition = "TEXT")
    private String moTa;

    @Enumerated(EnumType.STRING)
    @Column(name = "trang_thai", nullable = false)
    private TrangThaiDeTai trangThai;

    @Column(name = "dang_tim_dong_doi", nullable = false)
    private boolean dangTimDongDoi;

    @ManyToOne
    @JoinColumn(name = "giang_vien_id")
    private GiangVienHuongDan giangVienHuongDan;

    @ManyToMany
    @JoinTable(
        name = "de_tai_sinh_vien",
        joinColumns = @JoinColumn(name = "de_tai_id"),
        inverseJoinColumns = @JoinColumn(name = "sinh_vien_id")
    )
    private List<SinhVien> danhSachSinhVien = new ArrayList<>();

    protected DeTaiTotNghiep() {}

    public DeTaiTotNghiep(String maDeTai, String tenDeTai, String moTa, GiangVienHuongDan giangVienHuongDan) {
        this.maDeTai = maDeTai;
        this.tenDeTai = tenDeTai;
        this.moTa = moTa;
        this.giangVienHuongDan = giangVienHuongDan;
        this.trangThai = TrangThaiDeTai.CHO_GV_DONG_Y;
        this.dangTimDongDoi = false;
        this.danhSachSinhVien = new ArrayList<>();
    }

    public void themSinhVien(SinhVien sv) {
        if (this.danhSachSinhVien.size() >= 2) {
            throw new IllegalStateException("Moi de tai toi da chi duoc 2 sinh vien thuc hien");
        }
        this.danhSachSinhVien.add(sv);
        if (this.danhSachSinhVien.size() == 2) { 
            this.dangTimDongDoi = false;
        }
    }

    public void capNhatTrangThai(TrangThaiDeTai trangThaiMoi) {
        this.trangThai = trangThaiMoi;
    }

    public void chuyenLenBoMon(String yKien) {
        this.trangThai = TrangThaiDeTai.CHO_BO_MON_DUYET;
    }

    public void tuChoi(String yKien) {
        this.trangThai = TrangThaiDeTai.GV_TU_CHOI;
    }

    public void boMonPheDuyet(String yKien) {
        this.trangThai = TrangThaiDeTai.DUOC_BAO_VE;
    }

    public void boMonTuChoi(String yKien) {
        this.trangThai = TrangThaiDeTai.BO_MON_TU_CHOI;
    }

    public int getSoLuongSinhVien() {
        return this.danhSachSinhVien != null ? this.danhSachSinhVien.size() : 0;
    }

    public void batTimDongDoi() {
        if (danhSachSinhVien.size() >= 2) {
            throw new IllegalStateException("Nhom da du 2 thanh vien, khong the tim dong doi");
        }
        dangTimDongDoi = true;
    }

    public void tatTimDongDoi() {
        dangTimDongDoi = false;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMaDeTai() {
        return maDeTai;
    }

    public void setMaDeTai(String maDeTai) {
        this.maDeTai = maDeTai;
    }

    public String getTenDeTai() {
        return tenDeTai;
    }

    public void setTenDeTai(String tenDeTai) {
        this.tenDeTai = tenDeTai;
    }

    public String getMoTa() {
        return moTa;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }

    public TrangThaiDeTai getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(TrangThaiDeTai trangThai) {
        this.trangThai = trangThai;
    }

    public boolean isDangTimDongDoi() {
        return dangTimDongDoi;
    }

    public void setDangTimDongDoi(boolean dangTimDongDoi) {
        this.dangTimDongDoi = dangTimDongDoi;
    }

    public GiangVienHuongDan getGiangVienHuongDan() {
        return giangVienHuongDan;
    }

    public void setGiangVienHuongDan(GiangVienHuongDan giangVienHuongDan) {
        this.giangVienHuongDan = giangVienHuongDan;
    }

    public List<SinhVien> getDanhSachSinhVien() {
        return danhSachSinhVien;
    }
}
