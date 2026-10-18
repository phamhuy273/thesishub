package vn.edu.uit.se100.thesishub.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "sinh_vien")
public class SinhVien extends NguoiDung {

    @Column(name = "ma_so_sinh_vien", nullable = false, unique = true)
    private String maSoSinhVien;

    @Column(name = "lop")
    private String lop;

    protected SinhVien() {
        super();
    }

    public SinhVien(String maNguoiDung, String hoTen, String email, String soDienThoai, String maSoSinhVien, String lop) {
        super(maNguoiDung, hoTen, email, soDienThoai);
        this.maSoSinhVien = maSoSinhVien;
        this.lop = lop;
    }

    public String getMaSoSinhVien() {
        return maSoSinhVien;
    }

    public void setMaSoSinhVien(String maSoSinhVien) {
        this.maSoSinhVien = maSoSinhVien;
    }

    public String getLop() {
        return lop;
    }

    public void setLop(String lop) {
        this.lop = lop;
    }
}