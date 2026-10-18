package vn.edu.uit.se100.thesishub.dto;

public class UngTuyenRequest {

    private String maSoSinhVien;

    public UngTuyenRequest() {}

    public UngTuyenRequest(String maSoSinhVien) {
        this.maSoSinhVien = maSoSinhVien;
    }

    public String getMaSoSinhVien() {
        return maSoSinhVien;
    }

    public void setMaSoSinhVien(String maSoSinhVien) {
        this.maSoSinhVien = maSoSinhVien;
    }
}
