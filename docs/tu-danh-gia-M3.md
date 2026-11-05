# Tự đánh giá Cohesion và Coupling — Gói 4

Phụ trách: N14-B  
Đồ án: ThesisHub — Hệ thống Quản lý và Xét duyệt Đề tài Tốt nghiệp

---

## 1. Bảng đánh giá Trách nhiệm và Mức độ Phụ thuộc từng lớp trong `diagrams/class.mmd`

| Lớp | Trách nhiệm (một câu) | Phụ thuộc vào lớp nào | Lớp nào phụ thuộc vào nó | Tự chấm |
|---|---|---|---|---|
| `NguoiDung` | Đóng gói thuộc tính định danh người dùng và phương thức xác thực cơ bản | Không phụ thuộc lớp miền nào | `SinhVien`, `GiangVienHuongDan` | ✅ một trách nhiệm |
| `SinhVien` | Quản lý hồ sơ học vụ (MSSV, lớp, kỹ năng) của sinh viên thực hiện đồ án | `NguoiDung` (kế thừa) | `DeTaiTotNghiep`, `DeTaiService` | ✅ một trách nhiệm |
| `GiangVienHuongDan` | Quản lý thông tin giảng viên và bao đóng bất biến hạn ngạch tiếp nhận sinh viên (BR-01) | `NguoiDung` (kế thừa) | `DeTaiTotNghiep`, `DeTaiService` | ✅ một trách nhiệm |
| `DeTaiTotNghiep` | Đại diện thực thể đồ án, bảo vệ số lượng thành viên 1..2 (BR-02), số giảng viên 1..5 (TD-04) và quản lý cỗ máy trạng thái | `PhanCongHuongDan`, `GiangVienHuongDan`, `SinhVien` | `DeTaiService` | ⚠️ hai trách nhiệm |
| `PhanCongHuongDan` | Giữ trạng thái thẩm định riêng của một giảng viên trên một đề tài (TD-04) | `GiangVienHuongDan` | `DeTaiTotNghiep` | ✅ một trách nhiệm |
| `DeTaiService` | Điều phối luồng nghiệp vụ use case đăng ký, tìm kiếm ghép đội và thẩm định xét duyệt hai cấp | `DeTaiTotNghiep`, `GiangVienHuongDan`, `SinhVien` | `DeTaiController` | ⚠️ hai trách nhiệm |
| `DeTaiController` | Tiếp nhận yêu cầu HTTP REST API, kiểm tra dữ liệu đầu vào và chuyển tiếp điều phối tới Service | `DeTaiService` | Tầng Giao diện (Frontend React) | ✅ một trách nhiệm |

---

## 2. Trả lời ba câu hỏi thiết kế

### 1. Lớp nào đang gánh nhiều trách nhiệm nhất?
- **Lớp gánh nhiều trách nhiệm nhất:** `DeTaiTotNghiep` (và ở tầng nghiệp vụ ứng dụng là `DeTaiService`).
- **Hai trách nhiệm cụ thể của `DeTaiTotNghiep`:**
  1. Quản lý dữ liệu thông tin cốt lõi của đề tài đồ án (mã đề tài, tiêu đề, mô tả, danh sách thành viên hợp lệ từ 1 đến 2 sinh viên).
  2. Quản lý việc chuyển tiếp trạng thái trong vòng đời xét duyệt (`chuyenLenBoMon()`, `boMonPheDuyet()`, `tuChoi()`, `yeuCauHieuChinh()`).
- **Định tách hay giữ, vì sao?**
  - **Quyết định:** Nhóm quyết định **giữ** trong Gói 4 vì theo nguyên lý *Information Expert* (GRASP), thực thể `DeTaiTotNghiep` nắm giữ trạng thái hiện tại nên có thẩm quyền cao nhất để kiểm soát tính hợp lệ của việc chuyển trạng thái mà không làm rò rỉ dữ liệu ra ngoài. Sang Gói 5, nếu các trạng thái có logic xử lý riêng biệt phức tạp hơn (ví dụ tính điểm hội đồng, lịch sử phản biện), nhóm sẽ tách cỗ máy trạng thái ra một lớp riêng áp dụng mẫu thiết kế *State Pattern*.

### 2. Nếu đổi cơ sở dữ liệu, phải sửa những lớp nào?
- **Các lớp phải sửa:** Chỉ sửa các interface Repository (`DeTaiTotNghiepRepository`, `GiangVienHuongDanRepository`, `SinhVienRepository`) và cấu hình chuỗi kết nối / dialect trong `src/backend/src/main/resources/application.properties`.
- **Đánh giá rò rỉ lưu trữ:** Toàn bộ các lớp miền (`DeTaiTotNghiep`, `GiangVienHuongDan`, `SinhVien`, `NguoiDung`), lớp nghiệp vụ (`DeTaiService`) và lớp giao tiếp (`DeTaiController`) **hoàn toàn không phải sửa**. Kiến trúc phân tầng đã bảo đảm tính ghép nối lỏng (Low Coupling), không có sự rò rỉ chi tiết truy vấn SQL hay cơ chế lưu trữ vào tầng logic miền.

### 3. Nếu khách hàng đổi một luật nghiệp vụ, phải sửa những lớp nào?
- **Luật nghiệp vụ lựa chọn:** **BR-01** (Giảng viên hướng dẫn không được nhận quá $N$ sinh viên trong một đợt tốt nghiệp; ví dụ khách hàng nâng hạn mức từ 10 lên 15 sinh viên, hoặc cấu hình hạn mức riêng cho từng giảng viên).
- **Lớp phải sửa:** Duy nhất lớp miền `GiangVienHuongDan` (hiệu chỉnh giá trị trường `soLuongSinhVienToiDa` hoặc mở rộng phương thức `coTheNhanThem()` để kiểm tra theo chính sách mới).
- **Lớp không phải sửa:**
  - `DeTaiController`: Không biết gì về chi tiết hạn mức của giảng viên.
  - `DeTaiTotNghiep`, `SinhVien`, `NguoiDung`: Không liên quan tới việc tính toán hạn ngạch giảng viên.
  - `DeTaiService`: Không phải sửa vì lớp này chỉ gọi thông điệp `gv.coTheNhanThem()`. Khi hành vi bên trong `GiangVienHuongDan` thay đổi, giao diện phương thức vẫn giữ nguyên tính bao đóng (High Cohesion).
