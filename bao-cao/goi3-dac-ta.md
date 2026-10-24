# Báo cáo Gói 3: Use case và đặc tả

- **Mã nhóm:** N14
- **Đề tài:** ThesisHub — Hệ thống Quản lý và Xét duyệt Đăng ký Đồ án Tốt nghiệp
- **Thành viên:** N14-A (Nhóm trưởng), N14-B, N14-C

---

## 1. Đã làm gì

- **Sơ đồ use case toàn hệ thống:** Xây dựng tệp `diagrams/use-case.mmd` phân ranh giới rõ ràng trong `subgraph HT[Hệ thống ThesisHub]`, gồm 8 use case (UC-01 đến UC-08) đáp ứng 9 yêu cầu chức năng (FR-01 đến FR-09) và 3 tác nhân bên ngoài hệ thống (Sinh viên, Giảng viên hướng dẫn, Trưởng bộ môn), có 6 quan hệ `«include»` chuẩn hóa tới use case xác thực `UC-08`.
- **Ba bản đặc tả use case chi tiết:** Soạn thảo đầy đủ 3 tài liệu theo khuôn chuẩn gồm Luồng chính dạng bảng, Luồng thay thế và Luồng lỗi: `docs/dac-ta-UC-01.md` (Nộp đề xuất đề tài, bảo vệ BR-01, BR-02, BR-04), `docs/dac-ta-UC-02.md` (Tìm kiếm và ghép đội, bảo vệ BR-01, BR-02), và `docs/dac-ta-UC-03.md` (Thẩm định và xét duyệt đề tài hai cấp, bảo vệ BR-01, BR-03, BR-05 kèm cơ chế ân hạn 72 giờ).
- **Hai sơ đồ tuần tự (Sequence Diagram):** Xây dựng `diagrams/seq-dang-ky.mmd` (luồng tương tác nộp đề tài và ghép đội) và `diagrams/seq-xet-duyet.mmd` (luồng thẩm định xét duyệt hai cấp). Mọi participant đều ánh xạ trực tiếp và trùng khớp 100% với các lớp Java Spring Boot (`DeTaiController`, `DeTaiService`, `DeTaiTotNghiep`, `SinhVien`, `GiangVienHuongDan`), các phương thức gọi có thật và khối `alt`/`opt` thể hiện chính xác các rẽ nhánh lỗi (HTTP 400 Bad Request) và thành công (HTTP 200/201).
- **Hạng mục trên tab Issues:** Quản lý tập trung trên tab Issues với milestone `Gói 3`, gồm các User Story viết đúng định dạng *Là... tôi muốn... để...*, tiêu chí nghiệm thu Given–When–Then cụ thể và ô Truy vết chuẩn xác: hạng mục #7 (`HM: Vẽ sơ đồ use case toàn hệ thống`), #8 (`HM: Đặc tả UC-01 Nộp đề xuất đề tài`), #9 (`HM: Đặc tả UC-02 Tìm kiếm và ghép đội`), và #6 (`HM: Thẩm định và phê duyệt đề tài 2 cấp`).
- **Các Pull Request chính:** Đã mở, kiểm định và merge thành công 4 PR vào nhánh chính: PR #10 (Sơ đồ Use Case & bổ sung FR-09, đóng #7), PR #11 (Đặc tả UC-01, đóng #8), PR #12 (Đặc tả UC-02, đóng #9), và PR #13 (Đặc tả UC-03 & 2 Sơ đồ Tuần tự, giải quyết #6). Toàn bộ PR đều vượt qua 100% kiểm tra tự động `kiem-pr` và kiểm thử CI.
- **Việc chưa xong và lý do:** Nhóm đã hoàn thành 100% các mục tiêu bắt buộc của Gói 3. Một số khác biệt nhỏ giữa đặc tả mở rộng và mã nguồn ban đầu (như bộ lọc theo kỹ năng/lĩnh vực ở UC-02, kiểm tra trùng lặp sinh viên có đề tài ở UC-01) đã được nhóm ghi nhận rõ ràng trong phần mô tả của PR #11 và PR #12 để chuẩn bị giải quyết tại Gói 4 (Mô hình miền) và Gói 5 (Kiến trúc).

---

## 2. Ba quyết định thiết kế lớn nhất

1. **Phân rã use case xác thực dùng quan hệ «include» thay vì sao chép điều kiện:** Tách riêng `UC-08(Xác thực)` trong sơ đồ use case và liên kết `«include»` từ 6 use case ghi dữ liệu thay vì lặp lại các bước đăng nhập ở từng use case; loại bỏ phương án gộp ngầm xác thực vào từng luồng nhằm đảm bảo tính tái sử dụng và chuẩn bị ranh giới bảo mật cho tầng kiến trúc Gói 5 (trỏ tới `diagrams/use-case.mmd:35-40` và PR #10).
2. **Đưa luồng ân hạn 72 giờ (`YEU_CAU_HIEU_CHINH`) vào quy trình xét duyệt Cấp 1:** Bổ sung luồng thay thế 3a cho phép giảng viên hướng dẫn gửi yêu cầu chỉnh sửa và kích hoạt thời hạn ân hạn 72 giờ trong `UC-03`; loại bỏ phương án chỉ cho phép hai trạng thái cực đoan là Duyệt hoặc Từ chối dứt điểm nhằm giải quyết mâu thuẫn phỏng vấn khách hàng tại Gói 2 và bảo vệ bất biến `BR-03` không chuyển tiếp hồ sơ lỗi lên cấp Bộ môn (trỏ tới `docs/dac-ta-UC-03.md:28-35`, `diagrams/seq-xet-duyet.mmd:30-35` và PR #13).
3. **Thiết kế Sequence Diagram ánh xạ trực tiếp tầng kiến trúc Controller – Service – Domain:** Participant trong hai sơ đồ tuần tự sử dụng chính xác tên các lớp Java Spring Boot hiện có (`DeTaiController`, `DeTaiService`, `DeTaiTotNghiep`, `SinhVien`, `GiangVienHuongDan`) và các phương thức nghiệp vụ thật; loại bỏ phương án vẽ sơ đồ tuần tự mức khái niệm hộp đen không có tên lớp kỹ thuật nhằm đảm bảo khả năng kiểm tra tự động chéo mã nguồn và kiểm soát chặt chẽ các bất biến `BR-01`, `BR-02`, `BR-04` (trỏ tới `diagrams/seq-dang-ky.mmd`, `diagrams/seq-xet-duyet.mmd` và PR #13).

---

## 3. Thẩm định

- **Lần 1:** Thẩm định sơ đồ Use Case và việc bổ sung yêu cầu FR-09 tại PR #10 (ghi nhận tại `log-tac-tu/PR-10.md`). Nhóm (N14-A) sử dụng công cụ kiểm tra tự động `python scripts/kiem_moc.py M2 .` và đối chiếu trực tiếp git diff. Kết quả: Kết luận agent làm đúng cấu trúc `subgraph HT` và đủ 8 use case; nhóm đã yêu cầu bổ sung dòng yêu cầu chức năng `FR-09` trong `docs/yeu-cau.md` để đảm bảo use case xác thực `UC-08` có yêu cầu nguồn truy vết đầy đủ, đạt 9/9 tiêu chí kiểm mốc M2.
- **Lần 2:** Thẩm định hai bản đặc tả use case UC-01 và UC-02 tại PR #11 và PR #12 (ghi nhận tại `log-tac-tu/PR-11.md` và `log-tac-tu/PR-12.md`). Nhóm (N14-A) kiểm tra bằng phương pháp đối chiếu chéo các luồng thay thế và luồng lỗi với các luật bất biến `BR-01`, `BR-02`, `BR-04` trong `docs/yeu-cau.md` và mã nguồn trong `DeTaiService.java`. Kết quả: Kết luận đúng; mô hình đặc tả đủ 3 luồng và xử lý chặt chẽ các trường hợp biên; nhóm phát hiện và ghi nhận các chênh lệch kỹ thuật (lọc kỹ năng, kiểm tra sinh viên có 2 đề tài) vào phần mô tả của PR để chuẩn bị hiện thực mã nguồn ở Gói 4 và Gói 5.

---

## 4. Retro ba dòng

- **Làm tốt:** Phân công trách nhiệm rõ ràng theo đúng bút danh (N14-A, N14-B, N14-C); 100% tài liệu use case, đặc tả 3 luồng và sơ đồ tuần tự đều vượt qua bài kiểm tra tự động của M2 (9/9 mục đạt); toàn bộ 4 PR đều tuân thủ chặt chẽ quy trình kiểm tra `kiem-pr` và có log tác tử.
- **Chưa tốt:** Ban đầu có sự tạo trùng lặp một số Issue trên GitHub giữa các thành viên do nhóm chưa thống nhất trước danh sách số hiệu hạng mục trước khi phân nhánh làm việc.
- **Sẽ đổi:** Nhóm trưởng N14-A đã hoàn thành cam kết Gói 2 về việc đưa toàn bộ hạng mục công việc lên tab Issues gắn milestone Gói 3. Ở Gói 4, nhóm sẽ thống nhất chốt mã số Issue trước khi mở nhánh làm việc, đồng thời chủ động tiếp nhận Mã đợt 1 từ giảng viên để chạy Agent 1 mô phỏng thay đổi và viết ADR xử lý phiếu đợt 1 đúng hạn (Phụ trách: N14-A).
