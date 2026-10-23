# Đặc tả use case — UC-01 Nộp đề xuất đề tài

- **Phụ trách:** N14-B

| | |
|---|---|
| **Tác nhân chính** | Sinh viên |
| **Tác nhân phụ** | Giảng viên hướng dẫn (nhận thông báo có đề xuất mới) |
| **Điều kiện trước** | Sinh viên đã đăng nhập (UC-08 Xác thực). Sinh viên chưa có đề tài đang xét duyệt hoặc đã được phê duyệt trong học kỳ hiện tại. Đợt đăng ký đề tài đang mở. |
| **Điều kiện sau (thành công)** | Đề tài mới được lưu với trạng thái `CHO_GV_DONG_Y`, gắn với giảng viên hướng dẫn đã chọn và có 1–2 sinh viên. Số sinh viên đang hướng dẫn của giảng viên tăng đúng bằng số sinh viên của nhóm. Giảng viên nhận thông báo có đề xuất mới. |
| **Truy vết** | FR-01, BR-01, BR-02, BR-04 |

## Luồng chính

| Bước | Tác nhân làm | Hệ thống đáp |
|---|---|---|
| 1 | Sinh viên chọn chức năng "Nộp đề xuất đề tài" | Kiểm điều kiện trước (đã đăng nhập, chưa có đề tài đang xét duyệt hoặc đã duyệt), hiển thị biểu mẫu đề xuất kèm danh sách giảng viên hướng dẫn và số chỗ còn lại của từng người |
| 2 | Sinh viên nhập mã đề tài, tên đề tài, mô tả và chọn một giảng viên hướng dẫn | Kiểm các trường bắt buộc đã điền đủ |
| 3 | Sinh viên chọn tối đa 1 thành viên bổ sung (hoặc để trống nếu làm một mình) | Kiểm thành viên bổ sung tồn tại và chưa thuộc nhóm đề tài nào khác |
| 4 | Sinh viên bấm "Nộp đề xuất" | Kiểm mã đề tài chưa tồn tại; kiểm nhóm không quá 2 sinh viên (BR-02); kiểm giảng viên còn đủ hạn mức cho cả nhóm (BR-01) |
| 5 | | Lưu đề tài với trạng thái `CHO_GV_DONG_Y`, tăng số sinh viên đang hướng dẫn của giảng viên theo số thành viên nhóm |
| 6 | | Gửi thông báo cho giảng viên hướng dẫn và hiển thị cho sinh viên: "Nộp đề xuất thành công. Đề tài đang chờ giảng viên đồng ý." |

## Luồng thay thế

**3a.** Sinh viên làm một mình nhưng muốn tìm thêm đồng đội sau khi nộp
- 3a.1. Sinh viên để trống thành viên bổ sung và đánh dấu "Đang tìm đồng đội".
- 3a.2. Hệ thống ghi nhận đề tài ở chế độ tìm đồng đội để hiển thị trong UC-02 Tìm kiếm và ghép đội.
- 3a.3. Quay về bước 4.

**4a.** Sinh viên muốn sửa lại thông tin trước khi nộp
- 4a.1. Sinh viên bấm "Quay lại".
- 4a.2. Hệ thống giữ nguyên dữ liệu đã nhập.
- 4a.3. Quay về bước 2.

## Luồng lỗi

**1e.** Sinh viên đã có đề tài đang xét duyệt hoặc đã được phê duyệt trong học kỳ (BR-04)
- 1e.1. Hệ thống báo: "Bạn đã có đề tài đang xét duyệt hoặc đã được phê duyệt trong học kỳ này, không thể nộp thêm đề tài mới."
- 1e.2. Kết thúc use case, điều kiện sau **không** đạt.

**2e.** Thiếu trường bắt buộc (mã đề tài, tên đề tài, mô tả hoặc giảng viên)
- 2e.1. Hệ thống đánh dấu các trường còn thiếu và báo: "Vui lòng điền đầy đủ thông tin bắt buộc."
- 2e.2. Quay về bước 2.

**3e.** Nhóm vượt quá 2 sinh viên (BR-02), hoặc thành viên bổ sung đã thuộc nhóm đề tài khác
- 3e.1. Hệ thống báo: "Mỗi đề tài chỉ được tối đa 2 sinh viên thực hiện." hoặc "Sinh viên này đã thuộc một nhóm đề tài khác."
- 3e.2. Quay về bước 3.

**4e.** Mã đề tài đã tồn tại
- 4e.1. Hệ thống báo: "Mã đề tài đã tồn tại: <mã đề tài>."
- 4e.2. Quay về bước 2.

**4f.** Giảng viên đã chọn không còn đủ hạn mức cho cả nhóm (BR-01)
- 4f.1. Hệ thống báo: "Giảng viên đã đủ số sinh viên hướng dẫn, vui lòng chọn giảng viên khác."
- 4f.2. Không lưu đề tài, không thay đổi số sinh viên của giảng viên.
- 4f.3. Quay về bước 2.

## Ràng buộc liên quan

- BR-01: Một giảng viên không được nhận vượt quá hạn mức N sinh viên đang hướng dẫn cùng lúc. Bảo vệ tại bước 4 (luồng lỗi 4f).
- BR-02: Mỗi đề tài chỉ được có tối đa 2 thành viên sinh viên. Bảo vệ tại bước 3 và bước 4 (luồng lỗi 3e).
- BR-04: Sinh viên đã có đề tài đang xét duyệt hoặc đã được phê duyệt không được nộp thêm đề tài mới trong cùng học kỳ. Bảo vệ tại bước 1 (luồng lỗi 1e).
