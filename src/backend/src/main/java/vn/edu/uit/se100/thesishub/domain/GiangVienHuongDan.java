package vn.edu.uit.se100.thesishub.domain;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "giang_vien_huong_dan")
public class GiangVienHuongDan extends NguoiDung {

    @Column(name = "ma_giang_vien")
    private String maGiangVien;

    @Column(name = "so_luong_sinh_vien_toi_da", nullable = false)
    private int soLuongSinhVienToiDa;

    @Column(name = "so_luong_hien_tai", nullable = false)
    private int soLuongHienTai;

    protected GiangVienHuongDan() {
        super();
    }

    public GiangVienHuongDan(String maNguoiDung, String hoTen, String email, String soDienThoai, String maGiangVien, int soLuongSinhVienToiDa) {
        super(maNguoiDung, hoTen, email, soDienThoai);
        this.maGiangVien = maGiangVien;
        this.soLuongSinhVienToiDa = soLuongSinhVienToiDa;
        this.soLuongHienTai = 0;
    }

    public int kiemTraSoLuongHienTai() {
        return this.soLuongHienTai;
    }

    public boolean coTheNhanThem() {
        return this.soLuongHienTai < this.soLuongSinhVienToiDa;
    }

    public void tangSoLuong(int soLuong) {
        if (this.soLuongHienTai + soLuong > this.soLuongSinhVienToiDa) {
            throw new IllegalStateException("Da vuot qua so luong toi da");
        }
        this.soLuongHienTai += soLuong;
    }

    public void giamSoLuong(int soLuong) {
        if (this.soLuongHienTai - soLuong < 0) {
            throw new IllegalStateException("So luong sinh vien giam nhieu hon so sinh vien dang ky");
        }
        this.soLuongHienTai -= soLuong;
    }

    public String getMaGiangVien() {
        return maGiangVien;
    }

    public void setMaGiangVien(String maGiangVien) {
        this.maGiangVien = maGiangVien;
    }

    public int getSoLuongSinhVienToiDa() {
        return soLuongSinhVienToiDa;
    }

    public void setSoLuongSinhVienToiDa(int soLuongSinhVienToiDa) {
        this.soLuongSinhVienToiDa = soLuongSinhVienToiDa;
    }

    public int getSoLuongHienTai() {
        return soLuongHienTai;
    }
}