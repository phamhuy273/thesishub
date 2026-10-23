# Đặc tả use case — UC-02 Tìm kiếm và ghép đội

- **Phụ trách:** N14-B

| | |
|---|---|
| **Tác nhân chính** | Sinh viên (chưa có nhóm, muốn tham gia một đề tài) |
| **Tác nhân phụ** | Sinh viên đã nộp đề tài và đang tìm đồng đội (chủ đề tài); Giảng viên hướng dẫn của đề tài (số sinh viên đang hướng dẫn thay đổi) |
| **Điều kiện trước** | Sinh viên đã đăng nhập (UC-08 Xác thực). Sinh viên chưa thuộc nhóm đề tài nào trong học kỳ hiện tại. Có ít nhất một đề tài đang ở chế độ tìm đồng đội (bật ở UC-01, luồng thay thế 3a). |
| **Điều kiện sau (thành công)** | Sinh viên trở thành thành viên thứ hai của đề tài. Đề tài có đúng 2 sinh viên và tự tắt chế độ tìm đồng đội. Số sinh viên đang hướng dẫn của giảng viên tăng thêm 1. |
| **Truy vết** | FR-02, BR-01, BR-02 |

## Luồng chính

| Bước | Tác nhân làm | Hệ thống đáp |
|---|---|---|
| 1 | Sinh viên chọn chức năng "Tìm đồng đội" | Hiển thị danh sách các đề tài đang tìm đồng đội: mã đề tài, tên đề tài, mô tả, giảng viên hướng dẫn, số thành viên hiện có |
| 2 | Sinh viên nhập từ khoá tìm kiếm (mã đề tài, tên đề tài hoặc tên giảng viên) | Lọc và hiển thị các đề tài khớp từ khoá, vẫn chỉ trong nhóm đề tài đang tìm đồng đội |
| 3 | Sinh viên chọn một đề tài để xem chi tiết | Hiển thị chi tiết đề tài và nút "Ứng tuyển" |
| 4 | Sinh viên bấm "Ứng tuyển" và xác nhận mã số sinh viên của mình | Kiểm đề tài vẫn đang tìm đồng đội và chưa đủ 2 sinh viên (BR-02); kiểm sinh viên tồn tại và chưa thuộc nhóm khác; kiểm giảng viên còn đủ hạn mức cho thêm 1 sinh viên (BR-01) |
| 5 | | Thêm sinh viên vào nhóm đề tài, tăng số sinh viên đang hướng dẫn của giảng viên thêm 1 |
| 6 | | Nhóm đủ 2 sinh viên nên tự tắt chế độ tìm đồng đội; đề tài không còn hiện trong danh sách ở bước 1. Hiển thị: "Ứng tuyển thành công. Bạn đã tham gia nhóm đề tài <mã đề tài>." |

## Luồng thay thế

**2a.** Sinh viên lọc theo kỹ năng
- 2a.1. Sinh viên chọn một hoặc nhiều kỹ năng (ví dụ: Java, React, phân tích dữ liệu).
- 2a.2. Hệ thống chỉ hiển thị các đề tài đang tìm đồng đội có yêu cầu kỹ năng khớp với lựa chọn.
- 2a.3. Quay về bước 3.

**2b.** Sinh viên lọc theo lĩnh vực quan tâm
- 2b.1. Sinh viên chọn lĩnh vực (ví dụ: Web, Trí tuệ nhân tạo, Dữ liệu).
- 2b.2. Hệ thống chỉ hiển thị các đề tài đang tìm đồng đội thuộc lĩnh vực đã chọn.
- 2b.3. Quay về bước 3.

**2c.** Không có đề tài nào khớp từ khoá hoặc bộ lọc
- 2c.1. Hệ thống báo: "Không tìm thấy đề tài phù hợp. Hãy thử từ khoá hoặc bộ lọc khác."
- 2c.2. Quay về bước 2.

**3a.** Sinh viên không muốn ứng tuyển đề tài vừa xem
- 3a.1. Sinh viên bấm "Quay lại".
- 3a.2. Hệ thống giữ nguyên từ khoá và bộ lọc đã chọn.
- 3a.3. Quay về bước 2.

## Luồng lỗi

**4e.** Nhóm đề tài đã đủ 2 sinh viên hoặc đã tắt chế độ tìm đồng đội (BR-02)
- 4e.1. Hệ thống báo: "Đề tài không tìm đồng đội hoặc đã đủ thành viên."
- 4e.2. Sinh viên không được thêm vào nhóm; số sinh viên của giảng viên không đổi.
- 4e.3. Quay về bước 1 với danh sách đã cập nhật.

**4f.** Sinh viên đã thuộc một nhóm đề tài khác
- 4f.1. Hệ thống báo: "Bạn đã thuộc một nhóm đề tài khác, không thể ứng tuyển thêm."
- 4f.2. Kết thúc use case, điều kiện sau **không** đạt.

**4g.** Mã số sinh viên không tồn tại
- 4g.1. Hệ thống báo: "Không tìm thấy sinh viên: <mã số sinh viên>."
- 4g.2. Quay về bước 4.

**4h.** Giảng viên hướng dẫn của đề tài đã hết hạn mức (BR-01)
- 4h.1. Hệ thống báo: "Giảng viên của đề tài đã đủ số sinh viên hướng dẫn, không thể nhận thêm thành viên."
- 4h.2. Sinh viên không được thêm vào nhóm; số sinh viên của giảng viên không đổi.
- 4h.3. Quay về bước 1.

## Ràng buộc liên quan

- BR-01: Một giảng viên không được nhận vượt quá hạn mức N sinh viên đang hướng dẫn cùng lúc. Bảo vệ tại bước 4 (luồng lỗi 4h).
- BR-02: Mỗi đề tài chỉ được có tối đa 2 thành viên sinh viên. Bảo vệ tại bước 4 (luồng lỗi 4e) và bước 6 (tự tắt chế độ tìm đồng đội khi đủ 2 người).
