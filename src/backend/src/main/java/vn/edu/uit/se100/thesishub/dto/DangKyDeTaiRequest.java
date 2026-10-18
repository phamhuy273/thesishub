package vn.edu.uit.se100.thesishub.dto;

public class DangKyDeTaiRequest {

    private String maDeTai;
    private String tenDeTai;
    private String moTa;
    private String maGiangVien;
    private String maSoSinhVien;
    private boolean timDongDoi;

    public DangKyDeTaiRequest() {}

    public DangKyDeTaiRequest(String maDeTai, String tenDeTai, String moTa, String maGiangVien, String maSoSinhVien, boolean timDongDoi) {
        this.maDeTai = maDeTai;
        this.tenDeTai = tenDeTai;
        this.moTa = moTa;
        this.maGiangVien = maGiangVien;
        this.maSoSinhVien = maSoSinhVien;
        this.timDongDoi = timDongDoi;
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

    public String getMaGiangVien() {
        return maGiangVien;
    }

    public void setMaGiangVien(String maGiangVien) {
        this.maGiangVien = maGiangVien;
    }

    public String getMaSoSinhVien() {
        return maSoSinhVien;
    }

    public void setMaSoSinhVien(String maSoSinhVien) {
        this.maSoSinhVien = maSoSinhVien;
    }

    public boolean isTimDongDoi() {
        return timDongDoi;
    }

    public void setTimDongDoi(boolean timDongDoi) {
        this.timDongDoi = timDongDoi;
    }
}
