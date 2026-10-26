# Log phiên Agent 1 — Mô phỏng thay đổi đợt 1

- **Nhóm:** N14 (cụm 3, vị trí 4)
- **Người điều khiển:** N14-A
- **Thời điểm:** 2026-10-26T08:12:50+07:00 → 2026-10-26T08:16:00+07:00
- **Công cụ agent:** Antigravity (Google DeepMind)
- **Đợt:** 1
- **Mã đợt giảng viên công bố:** 6ALT
- **Commit kho:** 5293f695c4782cc54c985a96fe2072399cec4181
- **Mã phiếu xác định:** TD-04 (Một thành nhiều)

---

## 1. Tóm tắt phiên

### 1.1. Đầu vào đã nhận
- Mã nhóm: `N14` (chuẩn hóa: nhóm 14, cụm 3, vị trí 4).
- Số đợt: `1`.
- Mã đợt: `6ALT` (chuẩn hóa: viết hoa, không khoảng trắng).
- Mã người chạy: `N14-A` (bút danh nhóm trưởng).
- Commit kho: `5293f695c4782cc54c985a96fe2072399cec4181`.

### 1.2. Các tệp đã đọc
- `.se100/01_mo_phong_thay_doi.md`
- `.se100/01a_danh_muc_phieu.md`
- `README.md`
- `docs/yeu-cau.md`
- `docs/dac-ta-UC-01.md`
- `docs/dac-ta-UC-02.md`
- `docs/dac-ta-UC-03.md`
- `diagrams/use-case.mmd`
- `src/backend/src/main/java/vn/edu/uit/se100/thesishub/domain/DeTaiTotNghiep.java`
- `src/backend/src/main/java/vn/edu/uit/se100/thesishub/domain/GiangVienHuongDan.java`
- `src/backend/src/main/java/vn/edu/uit/se100/thesishub/domain/NguoiDung.java`
- `src/backend/src/main/java/vn/edu/uit/se100/thesishub/domain/SinhVien.java`
- `src/backend/src/main/java/vn/edu/uit/se100/thesishub/domain/TrangThaiDeTai.java`
- `src/backend/src/main/java/vn/edu/uit/se100/thesishub/service/DeTaiService.java`
- `src/backend/src/main/java/vn/edu/uit/se100/thesishub/controller/DeTaiController.java`
- `src/backend/pom.xml`
- `src/frontend/package.json`

### 1.3. Đường đi xác định mã phiếu (Bước 2)
- Số nhóm: $g = 14$.
- Cụm: $\lfloor(14 - 1) \div 5\rfloor + 1 = 3$ (Cụm 3: N11–N15).
- Vị trí: $((14 - 1) \bmod 5) + 1 = 4$.
- Tra bảng ma trận vị trí 2b: Cụm 3, Vị trí 4, Đợt 1 $\to$ **Mã phiếu `TD-04` (Một thành nhiều)**.

### 1.4. Mười hai mục hồ sơ kho (Bước 4)
- **H1. Tên hệ thống:** `ThesisHub` (nguồn: `README.md:1`).
- **H2. Tác nhân:** Sinh viên (4 FR: FR-01, FR-02, FR-03, FR-09), Giảng viên hướng dẫn (3 FR: FR-04, FR-05, FR-09), Trưởng bộ môn (4 FR: FR-06, FR-07, FR-08, FR-09). Tác nhân chính: Sinh viên (nguồn: `docs/yeu-cau.md:11`, hòa số FR với Trưởng bộ môn nhưng đứng trước trong bảng Tác nhân).
- **H3. Use case:** UC-01 đến UC-08 từ `diagrams/use-case.mmd:10-17`. Use case của Sinh viên: UC-01, UC-02, UC-03. Use case chính: UC-01 (nguồn: `docs/dac-ta-UC-01.md`).
- **H4. Luật:** BR-01 (hạn ngạch N SV/GV), BR-02 (tối đa 2 SV/đề tài), BR-03 (quy trình duyệt 2 cấp), BR-04 (chặn sinh viên có nhiều đề tài) (nguồn: `docs/yeu-cau.md:51-54`).
- **H5. Lớp:** Chưa có `diagrams/class.mmd`. Các lớp miền trong `src/backend/.../domain/`: `DeTaiTotNghiep`, `GiangVienHuongDan`, `NguoiDung`, `SinhVien`, `TrangThaiDeTai`. Lớp của tác nhân chính: `SinhVien`.
- **H6. Đối tượng trung tâm (ĐTTT):** `DeTaiTotNghiep` (nguồn: `src/backend/.../domain/DeTaiTotNghiep.java:20`, theo quy tắc H6.3: lớp duy nhất có thuộc tính trạng thái `trangThai` tại dòng 37).
- **H7. Trạng thái của ĐTTT:** Chưa có `state.mmd`. Suy từ enum `TrangThaiDeTai.java:2-8`: `CHO_GV_DONG_Y`, `GV_TU_CHOI`, `CHO_BO_MON_DUYET`, `BO_MON_TU_CHOI`, `DUOC_BAO_VE`, `DA_HOAN_THANH`. Luồng chính: `CHO_GV_DONG_Y` → `CHO_BO_MON_DUYET` → `DUOC_BAO_VE` → `DA_HOAN_THANH`. Kết thúc không thành công: `GV_TU_CHOI`, `BO_MON_TU_CHOI`. Kết thúc thành công: `DA_HOAN_THANH`.
- **H8. Dịch vụ ngoài:** Không có (không sử dụng SDK dịch vụ bên thứ ba trong `pom.xml` hay `package.json`).
- **H9. Chỗ gửi thông báo:** Không có trong mã nguồn nghiệp vụ (chỉ có câu báo trên UI).
- **H10. Dữ liệu cá nhân:** `hoTen`, `email`, `soDienThoai` (trong `NguoiDung.java:16-18`), `maSoSinhVien` (trong `SinhVien.java:14`), `maGiangVien` (trong `GiangVienHuongDan.java:15`).
- **H11. Đường tạo ĐTTT:** `POST /api/de-tai` (`DeTaiController.dangKyDeTai` tại dòng 34-45), phương thức nghiệp vụ `DeTaiService.dangKyDeTai` tại dòng 32-67, use case `UC-01` tại `docs/dac-ta-UC-01.md`.
- **H12. Người phụ trách:** `docs/dac-ta-UC-01.md`: `N14-B`; `diagrams/use-case.mmd`: `N14-B`; `docs/yeu-cau.md`: `N14-B`; `docs/dac-ta-UC-03.md`: `N14-C`.

### 1.5. Mọi giá trị trung gian ở bước 3
- Khóa $K =$ `N14-6ALT`.
- Tổng mã ASCII $S = 78 + 49 + 52 + 45 + 54 + 65 + 76 + 84 = \mathbf{503}$.
- H6 không có hòa, không dùng $S_0$.
- Ô 1: $S_1 = S + 1 = 504$.
  - Danh sách các lớp mà `DeTaiTotNghiep` gắn với bản số một (khoá ngoại đơn `@ManyToOne` `@JoinColumn`), bỏ lớp của tác nhân chính (`SinhVien`):
    1. `GiangVienHuongDan` (`src/backend/.../domain/DeTaiTotNghiep.java:42-44`)
  - Danh sách có $n = 1$ phần tử $\to$ không băm, chọn vị trí 1 $\to$ **`GiangVienHuongDan`**.

### 1.6. Yêu cầu đã từ chối
- Không có yêu cầu nào từ người chạy xin làm nhẹ hoặc thay đổi tham số.

### 1.7. Chỗ không đủ dữ liệu / kho thiếu
- Kho thiếu: `diagrams/class.mmd` và `diagrams/state.mmd` (dùng dự phòng mã nguồn Java `src/backend/`).
- Kho chưa có: Cơ chế đồng hướng dẫn nhiều giảng viên (hiện `DeTaiTotNghiep` chỉ gắn đơn với 1 `GiangVienHuongDan`).

---

## 2. Toàn văn phiếu thay đổi đã sinh
Tệp phiếu đã sinh được lưu tại: `phieu-thay-doi/dot1_N14_TD-04.md`.

---

## 3. Nhắc việc nhóm phải làm và gói nộp

1. **Tạo 01 hạng mục trên tab Issues:**
   - Tiêu đề: `HM: Xử lý phiếu thay đổi đợt 1 TD-04 (Một thành nhiều - Cơ chế đồng hướng dẫn)`
   - Nhãn: `phieu-thay-doi`
   - Ô Truy vết: `TD-04`
   - Given–When–Then dùng đúng các con số trong tham số: `1 đến 5` giảng viên, phần thứ 6 bị từ chối, `ít nhất một` giảng viên đồng ý, tối đa 10 SV/GV theo `BR-01`.
2. **Viết 01 ADR `adr/0001-xu-ly-TD-04.md` theo khuôn `adr/0000-mau-xu-ly-phieu.md`:**
   - Phần 1–4 nộp cùng Gói 4 (hạn CN 08/11/2026).
   - Phần 5 (kết quả thực tế) điền ở Gói 5.
3. **Mở PR tài liệu đưa phiếu và log vào nhánh chính:**
   - Dòng ba thông tin: `Agent: Antigravity · Điều khiển: N14-A · Review: N14-B` (không cần `Đóng #`).
4. **Hiện thực bằng PR sửa mã:**
   - Có `Đóng #<số hạng mục>` trước hạn Gói 6.
