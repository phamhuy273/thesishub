# Báo cáo Gói 2: Vòng 1 và yêu cầu

- **Mã nhóm:** N14
- **Đề tài:** ThesisHub — Hệ thống Quản lý và Xét duyệt Đăng ký Đồ án Tốt nghiệp
- **Thành viên:**
  - N14-A (Nhóm trưởng / Kiến trúc & Backend)
  - N14-B (Phân tích nghiệp vụ & Frontend)
  - N14-C (Thiết kế & Đảm bảo chất lượng)

---

## 1. Đã làm gì

- **Khung hệ thống và triển khai:** Thiết lập cấu hình cơ bản cho toàn bộ ngăn xếp công nghệ: Backend Java 21 + Spring Boot 4 kết nối cơ sở dữ liệu PostgreSQL 16 qua Docker Compose; Frontend khởi tạo bằng React 18 + Vite sẵn sàng triển khai trên Vercel.
- **Bản chạy thử nghiệm (Deploy URL):** https://thesishub-n14.vercel.app (hiển thị trang tổng quan giới thiệu kiến trúc hệ thống và khung điều phối đề tài).
- **Tài liệu yêu cầu (`docs/yeu-cau.md`):** Hoàn thiện phân tích 3 tác nhân chính, 8 yêu cầu chức năng (FR-01 đến FR-08), 4 yêu cầu phi chức năng (NFR-01 đến NFR-04) kèm số liệu và phương thức đo lường chính xác bằng k6 và UptimeRobot, 4 ràng buộc nghiệp vụ (BR-01 đến BR-04) và các câu hỏi mở qua PR #1.
- **Biên bản phỏng vấn chuyên sâu (`docs/phong-van.md`):** Thực hiện phỏng vấn bán cấu trúc với sinh viên năm cuối (SV-01) và giảng viên bộ môn (GV-01), xây dựng ma trận truy vết TR-01 đến TR-07 sang các lớp và bất biến miền OOAD qua PR #3.
- **Câu hỏi bối cảnh học thuật (`docs/cau-hoi-khach-hang.md`):** Soạn thảo 3 câu hỏi chuyên sâu về quản lý hạn mức, cỗ máy trạng thái vòng đời đề tài và cơ chế chống xung đột lợi ích hội đồng qua PR #2.
- **Công việc chưa xong và lý do:** Luồng tương tác end-to-end hoàn chỉnh giữa giao diện web và API lưu trữ đang trong giai đoạn hoàn thiện tầng Service và Controller (các Ticket BE-04 và BE-05); dự kiến hoàn tất tích hợp và kiểm thử tự động ngay trong đầu Gói 3.

---

## 2. Ba quyết định thiết kế lớn nhất

1. **Bao đóng bất biến hạn mức sinh viên trong thực thể miền:** Đưa toàn bộ quy tắc kiểm tra trần hướng dẫn tối đa N sinh viên (`soLuongHienTai < soLuongSinhVienToiDa`) vào trực tiếp phương thức `tangSoLuong()` của thực thể `GiangVienHuongDan` thay vì kiểm tra ở tầng Controller, bảo đảm bất biến nghiệp vụ BR-01 luôn toàn vẹn ở mọi luồng gọi (trỏ tới `src/backend/src/main/java/vn/edu/uit/se100/thesishub/domain/GiangVienHuongDan.java:31-38`).
2. **Quản lý quy mô nhóm tối đa 2 sinh viên bằng phương thức nghiệp vụ thực thể:** Ràng buộc đa tạp 1..2 giữa sinh viên và đề tài (BR-02) được bao đóng trong phương thức `themSinhVien()` của lớp `DeTaiTotNghiep`, đồng thời tự động tắt cờ `dangTimDongDoi` khi nhóm đạt đủ 2 thành viên (trỏ tới `src/backend/src/main/java/vn/edu/uit/se100/thesishub/domain/DeTaiTotNghiep.java:55-66`).
3. **Thiết kế cỗ máy trạng thái đề tài khép kín có luồng ân hạn hiệu chỉnh:** Xác định tập trạng thái vòng đời chuẩn hóa (`TrangThaiDeTai`) và bổ sung luồng ân hạn 72 giờ (`YEU_CAU_CHINH_SUA`) khi bị từ chối lần đầu thay vì chuyển thẳng sang trạng thái hủy đề tài, ngăn ngừa tình trạng bế tắc tiến độ của sinh viên (trỏ tới `docs/phong-van.md:62-66` và `src/backend/src/main/java/vn/edu/uit/se100/thesishub/domain/TrangThaiDeTai.java`).

---

## 3. Thẩm định

- **Lần 1:** Thẩm định kết quả sinh đặc tả yêu cầu tại PR #1 (ghi nhận tại `log-tac-tu/PR-1.md`). Nhóm sử dụng công cụ kiểm tra tự động `python scripts/kiem_moc.py M1 .` và đối chiếu trực tiếp qua `git diff`. Kết quả: Phát hiện chỉ số NFR-02 ban đầu chưa định nghĩa rõ thời gian duy trì tải và giai đoạn tăng tải (ramp-up); nhóm (N14-B) đã yêu cầu hiệu chỉnh bổ sung chi tiết điều kiện đo tải 300 req/s duy trì trong 10 phút bằng k6 để đảm bảo tính khả thi thực nghiệm và đạt 5/5 tiêu chí kiểm mốc.
- **Lần 2:** Thẩm định biên bản phỏng vấn và ma trận truy vết tại PR #3 (`docs/phong-van.md`). Nhóm đối chiếu chéo các phát hiện thực nghiệm với tài liệu phân tích nghiệp vụ và sơ đồ lớp UML. Kết quả: Xác nhận mô hình phân rã thực thể kế thừa từ `NguoiDung` sang `SinhVien` và `GiangVienHuongDan` là hoàn toàn chính xác, đáp ứng nguyên tắc kết dính cao (High Cohesion) và ghép nối lỏng (Low Coupling); nhóm đồng thuận duyệt và merge vào nhánh `main`.

---

## 4. Retro ba dòng

- **Làm tốt:** Phân công trách nhiệm rõ ràng theo đúng bút danh (N14-A, N14-B, N14-C), thu thập dữ liệu phỏng vấn thực tế công phu, ánh xạ chặt chẽ sang mô hình đối tượng và vượt qua toàn bộ các bài kiểm tra tự động của M0 và M1.
- **Chưa tốt:** Tốc độ khởi tạo dự án ban đầu còn phân tán do nhóm cần thời gian thống nhất cấu hình Docker Compose cho PostgreSQL và chuẩn hóa cấu trúc gói mã nguồn Spring Boot.
- **Sẽ đổi:** Sử dụng triệt để bảng quản lý công việc (Issues và Milestones) cho từng nhánh tính năng, đồng thời chuẩn hóa bộ test nghiệp vụ trước khi giao việc cho agent trong Gói 3 (Phụ trách: N14-A).

---

## 5. Hồi cứu vòng 1

- **Chỗ nhóm đã hiểu sai ở vòng 1:** Trong commit ban đầu `b5d4eee` và các thảo luận sơ khởi, nhóm quan niệm đơn giản rằng trạng thái từ chối (`GV_TU_CHOI` hoặc `BO_MON_TU_CHOI`) là trạng thái kết thúc (Terminal State) đóng băng ngay hồ sơ; đồng thời xem hạn mức hướng dẫn N của giảng viên là một điều kiện kiểm tra hợp lệ ở giao diện phía người dùng (Form Validation).
- **Phát hiện ra lúc nào, nhờ đâu:** Nhóm nhận diện ra điểm sai sót này trong phiên phỏng vấn chuyên sâu với giảng viên chuyên môn GV-01 tại `docs/phong-van.md:50-66` và quá trình phản biện 3 câu hỏi khách hàng tại `docs/cau-hoi-khach-hang.md:7-16` (thực hiện qua PR #2 và PR #3). Giảng viên giải thích rằng việc từ chối sát hạn chót sẽ đẩy sinh viên vào thế bế tắc nếu không có cơ chế ân hạn có điều kiện (Grace Period), và việc kiểm tra hạn mức ở giao diện sẽ dẫn đến tranh chấp tài nguyên (Race Condition) khi có nhiều sinh viên cùng nộp hồ sơ đồng thời.
- **Vòng 2 sẽ làm khác thế nào:** Chuyển toàn bộ việc kiểm tra hạn mức vào thành bất biến nghiệp vụ cứng được bảo vệ bởi phương thức `tangSoLuong()` trong thực thể miền `GiangVienHuongDan` (`src/backend/src/main/java/vn/edu/uit/se100/thesishub/domain/GiangVienHuongDan.java:31-38`) với kiểm tra ngoại lệ `IllegalStateException`; đồng thời ở Gói 3 và Gói 4 sẽ đưa trạng thái trung gian `YEU_CAU_CHINH_SUA` kèm điều kiện canh gác `[soLanChinhSua < 1]` vào sơ đồ trạng thái `diagrams/state.mmd` và mã nguồn để xử lý chuẩn xác luồng ân hạn.
