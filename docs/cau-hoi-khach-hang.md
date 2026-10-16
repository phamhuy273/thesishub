# Ba câu hỏi bối cảnh nghiệp vụ dành cho Khách hàng (Đơn vị Quản lý Đào tạo)

*Gói 2. Kiểm gói đếm dấu `?`, cần ≥ 3. Câu hỏi tập trung vào **bối cảnh học thuật, quyền sở hữu quy chế, cơ chế xử lý ngoại lệ và bất biến miền** trong phương pháp phân tích và thiết kế hướng đối tượng (OOAD).*

---

### 1. Về thẩm quyền quản lý hạn mức và cơ chế ngoại lệ của bất biến nghiệp vụ (Business Invariant Governance)
> **Câu hỏi:** Trong mô hình quản trị đào tạo đại học, hạn mức tối đa $N$ sinh viên hướng dẫn (mặc định $N = 10$) cho mỗi giảng viên trong một học kỳ là một **bất biến nghiệp vụ cứng (Hard Invariant)** do cấp Khoa thiết lập cố định toàn hệ thống, hay là một **tham số cấu hình linh hoạt (Configurable Parameter)** theo từng Bộ môn chuyên ngành; và trong kịch bản đặc thù khi giảng viên chủ trì đề tài nghiên cứu trọng điểm có nhu cầu tiếp nhận vượt trần $N$, tác nhân nào (`TruongBoMon` hay cấp Quản lý cao hơn) có thẩm quyền phê duyệt và kích hoạt cơ chế cấp quyền ngoại lệ (Exception Override) trong hệ thống?
* **Mục đích khảo sát OOAD:** Xác định phạm vi đóng gói (Encapsulation) của thuộc tính `soLuongSinhVienToiDa` trong thực thể `GiangVienHuongDan` — nên là hằng số cấu hình toàn cục hay thuộc tính có thể điều chỉnh qua hành vi có kiểm soát thẩm quyền của `TruongBoMon`.

---

### 2. Về cỗ máy trạng thái vòng đời đề tài và cơ chế xử lý lỗi biên thời gian (State Machine & Deadline Edge Cases)
> **Câu hỏi:** Trong cỗ máy trạng thái (Finite State Machine) quản lý vòng đời hồ sơ đề tài, khi đề xuất bị từ chối ở cấp Giảng viên (`GV_TU_CHOI`) hoặc cấp Bộ môn (`BO_MON_TU_CHOI`) vào thời điểm tiệm cận hạn chót (Deadline) của đợt đăng ký, quy chế học vụ cho phép sinh viên kích hoạt luồng chuyển tiếp trạng thái nào: hệ thống sẽ mở luồng ân hạn (Grace Period Transition) cho phép chỉnh sửa và tái nộp hồ sơ trong cùng học kỳ, hay hồ sơ sẽ bị chuyển thẳng sang trạng thái kết thúc (Terminal State) và sinh viên buộc phải hủy học phần tốt nghiệp sang chu kỳ đào tạo tiếp theo?
* **Mục đích khảo sát OOAD:** Thiết kế đầy đủ các chuyển trạng thái (State Transitions), sự kiện kích hoạt (Events) và điều kiện canh gác (Guards) trong sơ đồ trạng thái (`diagrams/state.mmd`), tránh tình trạng đề tài rơi vào trạng thái bế tắc (Deadlock State) hoặc dữ liệu mâu thuẫn khi hết thời hạn xét duyệt.

---

### 3. Về tính độc lập trong thẩm định nghiệm thu và ranh giới trách nhiệm (Separation of Concerns & Conflict of Interest)
> **Câu hỏi:** Khi Trưởng bộ môn tiến hành phân công thành viên cho Hội đồng bảo vệ (quy mô từ 3 đến 5 giảng viên theo quy chế), Giảng viên hướng dẫn có được phép kiêm nhiệm vai trò Ủy viên chấm điểm trực tiếp trong chính Hội đồng đánh giá đề tài của sinh viên do mình hướng dẫn hay không, hay hệ thống bắt buộc phải áp dụng quy tắc đóng gói kiểm tra xung đột lợi ích (Conflict of Interest Constraint) để ngăn chặn tuyệt đối việc gán giảng viên hướng dẫn vào cùng Hội đồng nghiệm thu của nhóm đề tài đó?
* **Mục đích khảo sát OOAD:** Xác định ràng buộc kiểm tra tính hợp lệ trong phương thức `phanCongHoiDong()` của lớp quản lý/nghiệp vụ `TruongBoMon` và quan hệ liên kết giữa hai thực thể `GiangVienHuongDan` và `HoiDongBaoVe`, đảm bảo tính phân tách trách nhiệm (Separation of Concerns) trong mô hình miền.
