# Yêu cầu — ThesisHub

*Gói 2. Kiểm gói đếm: ≥ 3 tác nhân, ≥ 6 FR, ≥ 3 NFR, ≥ 1 BR, và **mỗi dòng NFR phải có ít nhất một con số kèm đơn vị**. Nhớ giữ đúng tiền tố `FR-`, `NFR-`, `BR-` ở cột đầu, kiểm gói đếm theo đó.*

## Tác nhân

| Tác nhân | Là ai | Muốn gì từ hệ thống |
|---|---|---|
| Sinh viên | Người học đại học muốn đăng ký và thực hiện đồ án tốt nghiệp | Nộp đề xuất đề tài, tìm đồng đội, theo dõi trạng thái xét duyệt |
| Giảng viên hướng dẫn | Giảng viên nhận hướng dẫn sinh viên làm đồ án | Thẩm định đề xuất, quản lý danh sách sinh viên đang hướng dẫn, cập nhật tiến độ |
| Trưởng bộ môn | Người quản lý học thuật có thẩm quyền phê duyệt đề tài | Phê duyệt hoặc từ chối đề tài, xếp hội đồng bảo vệ, kiểm soát hạn mức giảng viên |

## Yêu cầu chức năng

Viết dạng: *Là [tác nhân], tôi muốn [làm gì] để [đạt gì]*. Đánh số để sau này còn truy vết. Cột **Ai làm** ghi gọn phần việc của người và phần việc của phần mềm, ví dụ *Người: chọn khung giờ · Phần mềm: chặn trùng giờ*.

| # | Tác nhân | Muốn | Để | Ai làm |
|---|---|---|---|---|
| FR-01 | Sinh viên | Nộp đề xuất đề tài kèm mô tả và danh sách thành viên nhóm | Khởi động quy trình xét duyệt chính thức | Người: điền tiêu đề, mô tả, chọn tối đa 1 thành viên bổ sung (tổng nhóm không quá 2 sinh viên, tính cả người nộp) · Phần mềm: kiểm tra số thành viên, lưu đề xuất hợp lệ, gửi thông báo cho giảng viên |
| FR-02 | Sinh viên | Tìm kiếm đồng đội theo kỹ năng và lĩnh vực quan tâm | Ghép nhóm phù hợp trước khi nộp đề tài | Người: nhập kỹ năng/lĩnh vực tìm kiếm · Phần mềm: lọc danh sách sinh viên chưa có nhóm, hiển thị kết quả phù hợp |
| FR-03 | Sinh viên | Theo dõi trạng thái đề tài theo thời gian thực | Biết đề tài đang ở bước nào trong quy trình xét duyệt | Người: xem trang trạng thái · Phần mềm: hiển thị luồng trạng thái (Chờ duyệt → Giảng viên thẩm định → Bộ môn phê duyệt → Ra hội đồng) |
| FR-04 | Giảng viên hướng dẫn | Thẩm định đề xuất đề tài và ghi nhận ý kiến | Xác nhận đề tài phù hợp trước khi chuyển lên bộ môn | Người: đọc đề xuất, chọn Đồng ý / Từ chối / Yêu cầu chỉnh sửa, ghi chú · Phần mềm: cập nhật trạng thái, thông báo cho sinh viên |
| FR-05 | Giảng viên hướng dẫn | Xem danh sách sinh viên đang hướng dẫn cùng tiến độ | Quản lý không vượt hạn mức và nắm tiến độ từng nhóm | Người: xem bảng tổng quan · Phần mềm: hiển thị số sinh viên hiện tại so với hạn mức N, cảnh báo khi gần đầy |
| FR-06 | Trưởng bộ môn | Phê duyệt hoặc từ chối đề tài sau khi giảng viên đã thẩm định | Ra quyết định chính thức về việc triển khai đề tài | Người: đọc hồ sơ đề tài và ý kiến giảng viên, chọn Phê duyệt / Từ chối · Phần mềm: cập nhật trạng thái, thông báo cho giảng viên và sinh viên |
| FR-07 | Trưởng bộ môn | Xếp hội đồng bảo vệ cho các đề tài đã được phê duyệt | Lên lịch bảo vệ đồ án đúng quy trình | Người: chọn đề tài, chọn thành viên hội đồng, chọn thời gian · Phần mềm: kiểm tra xung đột lịch, lưu lịch và thông báo cho các bên |
| FR-08 | Trưởng bộ môn | Xem thống kê hạn mức và kiểm tra việc phân công sinh viên cho từng giảng viên | Đảm bảo phân bổ công bằng và không phân công vượt hạn mức | Người: xem trang thống kê và thực hiện phân công · Phần mềm: tổng hợp số sinh viên hiện được hướng dẫn so với hạn mức, cảnh báo khi gần đầy và từ chối phân công nếu số lượng sau phân công vượt hạn mức |

## Yêu cầu phi chức năng

**Mỗi dòng phải có con số.** Viết "nhanh", "ổn định", "an toàn" thì kiểm gói báo chưa đạt.

Mỗi dòng đủ bốn phần: *[Chỉ số] phải [ngưỡng] khi [điều kiện đo], đo bằng [cách nào]*. Ít nhất một dòng không nói về tốc độ. Ví dụ:
- Thời gian phản hồi trang đặt chỗ ≤ 500 ms tại phân vị 95, khi 50 người dùng đồng thời, đo bằng k6 trên bản deploy.
- Hệ thống chịu được 200 yêu cầu/giây trong 10 phút giờ cao điểm, đo bằng k6.
- Dữ liệu đặt chỗ không mất khi máy chủ khởi động lại (bền vững 100%), kiểm bằng cách khởi động lại máy chủ giữa lúc đặt rồi đếm lại bản ghi.

| # | Chỉ số | Ngưỡng | Điều kiện đo | Cách đo | Ảnh hưởng tới thiết kế nào |
|---|---|---|---|---|---|
| NFR-01 | Thời gian phản hồi API nộp đề xuất và thẩm định | ≤ 800 ms tại phân vị 95 | 100 người dùng gửi yêu cầu đồng thời | Chạy k6 trên bản deploy với 100 virtual users trong 5 phút | Thiết kế API bất đồng bộ, kết nối cơ sở dữ liệu pooling |
| NFR-02 | Thông lượng hệ thống vào thời điểm mùa nộp đề tài | ≥ 300 yêu cầu/giây duy trì trong 10 phút | Mô phỏng đợt cao điểm đầu học kỳ trên môi trường kiểm thử có cấu hình gần với môi trường triển khai; duy trì mức tải mục tiêu 300 yêu cầu/giây trong 10 phút sau giai đoạn ramp-up | Chạy k6 với giai đoạn ramp-up từ 0 lên 300 yêu cầu/giây, sau đó giữ tải mục tiêu trong 10 phút; ghi nhận thông lượng thực tế và tỷ lệ lỗi | Horizontal scaling, load balancer, caching danh sách giảng viên |
| NFR-03 | Tính bền vững dữ liệu đề tài đã phê duyệt | 0 bản ghi mất sau khi máy chủ khởi động lại đột ngột | Khởi động lại container giữa lúc ghi dữ liệu | Đếm lại bản ghi trong cơ sở dữ liệu sau khi khởi động lại, so với trước | Dùng CSDL quan hệ có transaction, không lưu trạng thái tạm trong RAM |
| NFR-04 | Tỉ lệ sẵn sàng của hệ thống trong học kỳ | ≥ 99,0% uptime trong khoảng thời gian 14 tuần | Môi trường production khi có người dùng thực | Theo dõi bằng UptimeRobot, ping mỗi 5 phút, tổng hợp cuối học kỳ | Triển khai bằng Docker Compose với tự động khởi động lại (restart: always) |

## Ràng buộc nghiệp vụ — điều KHÔNG được phép xảy ra

| # | Ràng buộc | Ai chịu trách nhiệm bảo vệ (lớp nào, điền ở Gói 4) |
|---|---|---|
| BR-01 | Một giảng viên không được nhận vượt quá hạn mức N sinh viên đang hướng dẫn cùng lúc | (điền ở Gói 4) |
| BR-02 | Mỗi đề tài chỉ được có tối đa 2 thành viên sinh viên | (điền ở Gói 4) |
| BR-03 | Đề tài chưa được giảng viên thẩm định không được chuyển lên bộ môn phê duyệt | (điền ở Gói 4) |
| BR-04 | Sinh viên đã có đề tài đang xét duyệt hoặc đã được phê duyệt không được nộp thêm đề tài mới trong cùng học kỳ | (điền ở Gói 4) |

## Câu hỏi còn mở cho khách hàng

- Hạn mức N sinh viên mà mỗi giảng viên được hướng dẫn cùng lúc là bao nhiêu, và ai có quyền thay đổi con số này?
- Khi trưởng bộ môn từ chối một đề tài, sinh viên có được nộp lại với đề tài đã chỉnh sửa trong cùng học kỳ không, hay phải chờ đến học kỳ sau?
- Hội đồng bảo vệ có bắt buộc gồm bao nhiêu thành viên, và giảng viên hướng dẫn có được ngồi trong hội đồng bảo vệ của sinh viên mình không?
- Trong đợt cao điểm đầu học kỳ, dự kiến có bao nhiêu người dùng đồng thời hoặc bao nhiêu yêu cầu mỗi giây, để xác nhận mục tiêu 300 yêu cầu/giây trong 10 phút ở NFR-02?
