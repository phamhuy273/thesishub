# Báo cáo Gói 4: Mô hình miền

- **Mã nhóm:** N14
- **Đề tài:** ThesisHub — Hệ thống Quản lý và Xét duyệt Đăng ký Đồ án Tốt nghiệp
- **Thành viên:** N14-A (Nhóm trưởng), N14-B, N14-C

---

## 1. Đã làm gì

- **Sơ đồ lớp miền (Class Diagram):** Xây dựng tệp `diagrams/class.mmd` gồm 8 lớp miền (`NguoiDung`, `SinhVien`, `GiangVienHuongDan`, `DeTaiTotNghiep`, `PhanCongHuongDan`, `TrangThaiPheDuyetGV`, `DeTaiService`, `DeTaiController`). Mô hình hóa đúng ranh giới trách nhiệm, bao đóng thuộc tính, quan hệ kế thừa và liên kết 1..5 phân công hướng dẫn theo TD-04; vượt qua 100% kiểm tra mốc M3 (`python scripts/kiem_moc.py M3 .` đạt 8/8 mục).
- **Sơ đồ trạng thái (State Diagram):** Xây dựng tệp `diagrams/state.mmd` mô hình hóa cỗ máy trạng thái vòng đời đề tài `DeTaiTotNghiep`, tích hợp hai mức trạng thái: mức đề tài (`CHO_GV_DONG_Y`, `CHO_BO_MON_DUYET`, `DUOC_BAO_VE`, `GV_TU_CHOI`, `BO_MON_TU_CHOI`, `DA_HUY`, `DA_HOAN_THANH`, luồng ân hạn hiệu chỉnh 72h) và mức từng phần phân công `PhanCongHuongDan` (`CHO_DUYET`, `DONG_Y`, `TU_CHOI`).
- **Bản tự đánh giá Cohesion và Coupling:** Soạn thảo tài liệu `docs/tu-danh-gia-M3.md` đánh giá chi tiết trách nhiệm đơn, mức độ phụ thuộc của từng lớp trong mô hình miền và trả lời thấu đáo 3 câu hỏi thiết kế phần mềm cốt lõi (lớp gánh nhiều trách nhiệm nhất, tác động khi thay đổi CSDL, tác động khi đổi luật nghiệp vụ hạn ngạch BR-01).
- **Hiện thực mã nguồn khớp 100% sơ đồ và phiếu TD-04:** Bổ sung thực thể `PhanCongHuongDan` và enum `TrangThaiPheDuyetGV` trong `src/backend`; cập nhật `DeTaiTotNghiep` và `DeTaiService` tiếp nhận từ 1 đến 5 giảng viên hướng dẫn độc lập; nâng cấp giao diện React Frontend hỗ trợ chọn đa giảng viên và hiển thị trạng thái duyệt riêng từng thầy/cô; bổ sung bộ kiểm thử 25 test pytest và bộ JUnit test đạt 100% tỷ lệ vượt qua.
- **Các Pull Request chính:** Đã thẩm định và sáp nhập thành công 3 PR cốt lõi: PR #14 (Sơ đồ trạng thái `state.mmd` và chuẩn bị vòng đời TD-04), PR #20 (Sơ đồ lớp `class.mmd` và bản tự đánh giá mốc M3 `tu-danh-gia-M3.md`), và PR #21 (Hiện thực hóa toàn diện phiếu thay đổi TD-04 trên Backend và Frontend).
- **Việc chưa xong và lý do:** Nhóm đã hoàn thành 100% các mục tiêu và chuẩn đầu ra của Gói 4. Đề tài chạy thông suốt luồng đăng ký, thẩm định đa giảng viên và xét duyệt hai cấp trên cả môi trường cục bộ và môi trường đám mây Vercel.

---

## 2. Ba quyết định thiết kế lớn nhất

1. **Tách lớp thực thể liên kết trung gian `PhanCongHuongDan` để mỗi giảng viên thẩm định độc lập:** Chuyển quan hệ gắn cứng 1 GV sang quan hệ 1--1..5 với `PhanCongHuongDan`, bảo toàn nguyên lý Single Responsibility và giải quyết triệt để yêu cầu của TD-04: một giảng viên từ chối không làm hủy bỏ phần của giảng viên khác (trỏ tới `adr/0001-xu-ly-TD-04.md`, `diagrams/class.mmd:46-56` và PR #21).
2. **Lồng ghép cỗ máy trạng thái hai mức (mức đề tài và mức từng phần) trong `diagrams/state.mmd`:** Thiết kế trạng thái `CHO_GV_DONG_Y` chứa máy trạng thái con của `PhanCongHuongDan` (`CHO_DUYET` $\to$ `DONG_Y` / `TU_CHOI`) và áp dụng luật hoàn tất vòng 1: chỉ chuyển lên `CHO_BO_MON_DUYET` khi mọi GV đã cho ý kiến và có ít nhất 1 GV đồng ý; tất cả từ chối mới chuyển về `GV_TU_CHOI` (trỏ tới `diagrams/state.mmd:18-35` và PR #14).
3. **Cơ chế chuyển đổi tương thích ngược dữ liệu cũ (`chuyenDoiDuLieuCu`) và tương thích kép Payload:** Thiết kế phương thức nạp dữ liệu cũ 1 GV thành 1 phân công hướng dẫn tự động, đồng thời giữ cả trường `maGiangVien` và `danhSachMaGiangVien` trong API payload giúp hệ thống vận hành liên tục không gián đoạn dịch vụ giữa các phiên bản (trỏ tới `src/backend/src/main/java/.../DeTaiTotNghiep.java:136-150` và PR #21).

---

## 3. Thẩm định

- **Lần 1 (Thẩm định sơ đồ lớp và sơ đồ trạng thái tại PR #14 và PR #20):**  
  - *Đối tượng:* PR #14 và PR #20, lưu vết tại `log-tac-tu/PR-14.md` và `log-tac-tu/PR-20.md`.  
  - *Cách kiểm:* Nhóm (N14-A) chạy script kiểm tra cú pháp và ràng buộc mốc M3 `python scripts/kiem_moc.py M3 .`, đồng thời đối chiếu chéo giữa các participant trong sequence diagram (`seq-dang-ky.mmd`, `seq-xet-duyet.mmd`) với các phương thức trong `class.mmd`.  
  - *Kết luận:* Đạt 8/8 tiêu chí mốc M3; agent thiết kế đúng số lượng lớp ($\ge 5$), không có túi dữ liệu thiếu phương thức; nhóm đã yêu cầu agent bổ sung thêm các phương thức nghiệp vụ kiểm soát hạn ngạch và thẩm định độc lập theo TD-04 vào `class.mmd` trước khi phê duyệt merge.
- **Lần 2 (Thẩm định hiện thực mã nguồn và bộ kiểm thử TD-04 tại PR #21):**  
  - *Đối tượng:* PR #21, lưu vết tại `log-tac-tu/PR-21.md`.  
  - *Cách kiểm:* Nhóm (N14-A) chạy bộ kiểm thử toàn diện gồm 25 ca kiểm thử logic nghiệp vụ bằng `pytest` (`python -m pytest tests -v`), chạy bộ kiểm thử đơn vị Spring Boot `mvn test`, và kiểm tra chạy thực tế trên giao diện Frontend.  
  - *Kết luận:* Toàn bộ 25/25 ca kiểm thử pytest và 9/9 ca kiểm thử JUnit đều đạt; nhóm phát hiện trường hợp đề tài nộp thiếu giảng viên (0 GV) hoặc quá 5 GV bị từ chối chính xác; kiểm soát hoàn trả chỉ tiêu tức thì khi GV từ chối và hoàn tất chuyển giao diện sang hỗ trợ chọn nhiều GV.

---

## 4. Retro ba dòng

- **Làm tốt:** Mô hình hóa sơ đồ lớp và sơ đồ trạng thái chuẩn xác, khớp 100% với mã nguồn Spring Boot; xử lý xuất sắc phiếu thay đổi TD-04 với tài liệu kiến trúc ADR chi tiết và bộ kiểm thử hồi quy 25 ca test bao phủ toàn bộ các trường hợp biên.
- **Chưa tốt:** Quá trình kiểm thử tích hợp ban đầu giữa Frontend mới và Backend trên môi trường Render cũ bị lệch cấu trúc thuộc tính payload, cần cấu hình cơ chế dự phòng tương thích ngược.
- **Sẽ đổi:** Chủ động thiết kế API theo nguyên tắc tương thích ngược (Backward Compatibility) ngay từ tầng DTO của Backend và duy trì kiểm thử tích hợp đầu cuối (End-to-End) trên môi trường Staging/Production trước khi đóng gói báo cáo (Phụ trách: N14-A).

---

## 5. Xử lý phiếu thay đổi đợt 1

- **Mã phiếu và đường dẫn:** Phiếu thay đổi `TD-04` lưu tại `phieu-thay-doi/dot1_N14_TD-04.md`; biên bản log phiên tác tử tại `log-tac-tu/phieu-dot1.md`.
- **Tài liệu ADR xử lý phiếu:** Kiến trúc quyết định `adr/0001-xu-ly-TD-04.md`.  
  *Tóm tắt phương án đã chọn:* Chọn Phương án A — Tách lớp thực thể trung gian `PhanCongHuongDan` (quan hệ 1--1..5) lưu giữ quyết định thẩm định, nhận xét và thời gian của từng giảng viên; quyết định bởi **N14-A** (Nhóm trưởng).
- **Hạng mục trên Issues và PR hiện thực:** Hạng mục #17 gắn nhãn `phieu-thay-doi` trên tab Issues; Pull Request hiện thực mã nguồn và kiểm thử là PR #21 (đã merge vào nhánh chính `main`).
