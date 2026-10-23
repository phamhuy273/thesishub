**phụ trách** N14-C

# Đặc tả use case — UC-03 Thẩm định và xét duyệt đề tài hai cấp

| | |
|---|---|
| **Tác nhân chính** | Giảng viên hướng dẫn (GVHD), Trưởng bộ môn |
| **Tác nhân phụ** | Sinh viên |
| **Điều kiện trước** | 1. Đề tài đã được nhóm Sinh viên nộp thành công lên hệ thống ThesisHub và đang ở trạng thái Chờ GVHD thẩm định (`CHO_GV_DONG_Y`).<br>2. Giảng viên hướng dẫn và Trưởng bộ môn đã đăng nhập tài khoản vào hệ thống với đúng vai trò và quyền hạn tương ứng. |
| **Điều kiện sau (thành công)** | 1. Đề tài được thẩm định và phê duyệt chính thức qua 2 cấp (GVHD và Trưởng bộ môn), chuyển sang trạng thái Đã phê duyệt / Được bảo vệ (`DUOC_BAO_VE`).<br>2. Hệ thống cập nhật tăng số lượng sinh viên đang hướng dẫn của GVHD tương ứng với số thành viên nhóm đề tài: $S_{\text{current}} \leftarrow S_{\text{current}} + |G|$, đảm bảo không vượt quá hạn mức $N$ ($S_{\text{current}} \le N$) theo **BR-01**.<br>3. Sinh viên và GVHD nhận được thông báo phê duyệt thành công đề tài qua hệ thống; hồ sơ đề tài được khóa chỉnh sửa theo **BR-05**. |
| **Truy vết** | FR-04, FR-06 |

## Luồng chính

| Bước | Tác nhân làm | Hệ thống đáp |
|---|---|---|
| 1 | Giảng viên hướng dẫn (GVHD) chọn mục "Đề tài chờ thẩm định" và bấm chọn đề xuất đề tài cần xử lý (trạng thái `CHO_GV_DONG_Y`). | Hệ thống hiển thị chi tiết hồ sơ đề xuất đề tài (tiêu đề, mục tiêu, mô tả chi tiết, công nghệ dự kiến, danh sách thành viên nhóm sinh viên $G$ với $1 \le \|G\| \le 2$) kèm thông tin hạn mức hướng dẫn hiện tại của GVHD ($S_{\text{current}} / N$). |
| 2 | GVHD xem xét hồ sơ, đánh giá nội dung chuyên môn, tính khả thi của đề tài và nhập ý kiến nhận xét/góp ý chuyên môn. | Hệ thống ghi nhận nội dung nhận xét của GVHD vào biểu mẫu thẩm định cấp 1. |
| 3 | GVHD chọn hành động "Đồng ý thẩm định" (chấp thuận hướng dẫn đề tài). | Hệ thống tiến hành kiểm tra ràng buộc hạn mức **BR-01**: kiểm tra điều kiện $S_{\text{current}} + \|G\| \le N$ hay không. |
| 4 | | Hệ thống xác nhận không vượt hạn mức $N$ sinh viên (BR-01 hợp lệ):<br>- Tạm giữ chỉ tiêu $\|G\|$ sinh viên tương ứng cho GVHD.<br>- Cập nhật trạng thái đề tài thành Chờ bộ môn duyệt (`CHO_BO_MON_DUYET`), tuân thủ **BR-03** (chỉ chuyển lên bộ môn sau khi GVHD đã thẩm định đồng ý).<br>- Lưu vết lịch sử thẩm định cấp 1 kèm ý kiến nhận xét của GVHD.<br>- Gửi thông báo kết quả thẩm định đạt đến nhóm Sinh viên và tạo thông báo hồ sơ chờ duyệt gửi đến Trưởng bộ môn. |
| 5 | Trưởng bộ môn đăng nhập, truy cập danh sách "Đề tài chờ bộ môn phê duyệt" và chọn đề tài cần xem xét. | Hệ thống kiểm tra điều kiện bảo vệ **BR-03**: xác nhận đề tài đã có kết quả thẩm định đạt từ GVHD và đang ở trạng thái `CHO_BO_MON_DUYET`. Hệ thống hiển thị đầy đủ hồ sơ đề tài, ý kiến thẩm định của GVHD và tải hướng dẫn hiện tại của giảng viên. |
| 6 | Trưởng bộ môn xem xét hồ sơ, đối chiếu định hướng nghiên cứu và chuẩn đầu ra của chương trình đào tạo khoa/bộ môn, nhập ý kiến kết luận. | Hệ thống ghi nhận ý kiến kết luận của Trưởng bộ môn vào biểu mẫu xét duyệt cấp 2. |
| 7 | Trưởng bộ môn chọn hành động "Phê duyệt đề tài". | Hệ thống kiểm tra lại tính hợp lệ toàn vẹn của hồ sơ và xác nhận phê duyệt cấp bộ môn. |
| 8 | | Hệ thống hoàn tất quy trình xét duyệt 2 cấp:<br>- Chuyển trạng thái đề tài sang Được bảo vệ (`DUOC_BAO_VE`).<br>- Chính thức cập nhật tăng số lượng sinh viên đang hướng dẫn ($S_{\text{current}} \leftarrow S_{\text{current}} + \|G\|$) của GVHD trong cơ sở dữ liệu theo đúng hạn mức **BR-01**.<br>- Khóa chỉnh sửa hồ sơ đề tài (tuân thủ **BR-05**: Chặn mọi thao tác chỉnh sửa thông tin khi ở trạng thái `DUOC_BAO_VE`) và tạo biên bản xét duyệt 2 cấp điện tử.<br>- Gửi thông báo phê duyệt thành công qua hệ thống đến cả Giảng viên hướng dẫn và nhóm Sinh viên. Kết thúc use case thành công. |

## Luồng thay thế

**3a. GVHD yêu cầu nhóm sinh viên hiệu chỉnh đề tài với thời hạn ân hạn 72 giờ**
- 3a.1. Tại Bước 3 của Luồng chính, GVHD nhận thấy đề tài có tiềm năng nhưng đề cương/mục tiêu/phạm vi cần chỉnh sửa, bổ sung. GVHD chọn hành động "Yêu cầu hiệu chỉnh", nhập chi tiết các nội dung cần sửa đổi và xác nhận cấp thời gian ân hạn 72 giờ ($\Delta t = 72\,\text{h}$).
- 3a.2. Hệ thống ghi nhận trạng thái đề tài là Yêu cầu hiệu chỉnh (`YEU_CAU_HIEU_CHINH`), kích hoạt bộ đếm thời gian ân hạn 72 giờ (thời hạn chót $T_{\text{deadline}} = T_{\text{current}} + 72\,\text{h}$). Đề tài chưa được chuyển lên Bộ môn (bảo vệ ràng buộc **BR-03**).
- 3a.3. Hệ thống gửi thông báo khẩn qua hệ thống kèm toàn bộ ý kiến góp ý của GVHD và thông tin thời hạn ân hạn 72 giờ đến các thành viên nhóm sinh viên.
- 3a.4. Nhóm sinh viên tiếp nhận yêu cầu, tiến hành chỉnh sửa tài liệu thuyết minh/đề xuất đề tài và nộp lại bản hiệu chỉnh trên hệ thống ThesisHub trước khi hết thời hạn 72 giờ.
- 3a.5. Hệ thống kiểm tra thời gian nộp ($T_{\text{submit}} \le T_{\text{deadline}}$), lưu phiên bản hồ sơ mới, đóng bộ đếm ân hạn, chuyển trạng thái đề tài trở lại `CHO_GV_DONG_Y` và gửi thông báo cho GVHD biết nhóm sinh viên đã hoàn thành hiệu chỉnh.
- 3a.6. Quay về Bước 1 của Luồng chính (GVHD mở hồ sơ bản hiệu chỉnh để thẩm định lại).

## Luồng lỗi

**3e. GVHD từ chối dứt điểm đề tài tại Cấp 1**
- 3e.1. Tại Bước 3 của Luồng chính, GVHD đánh giá đề tài không khả thi, không đúng định hướng chuyên môn hoặc sinh viên không đáp ứng yêu cầu cơ bản, chọn hành động "Từ chối đề tài" và bắt buộc nhập lý do từ chối dứt điểm.
- 3e.2. Hệ thống cập nhật trạng thái đề tài thành Giảng viên từ chối (`GV_TU_CHOI`), ghi nhận lý do từ chối vào nhật ký hệ thống.
- 3e.3. Hệ thống chặn tuyệt đối việc chuyển tiếp hồ sơ lên Bộ môn (bảo vệ nghiêm ngặt ràng buộc **BR-03**).
- 3e.4. Hệ thống gửi thông báo từ chối dứt điểm kèm lý do của GVHD đến nhóm sinh viên. Đề tài bị đóng trong học kỳ hiện tại.
- 3e.5. Kết thúc use case, điều kiện sau **không** đạt.

**3a.e. Nhóm sinh viên không nộp lại bản hiệu chỉnh trong thời hạn ân hạn 72 giờ**
- 3a.e.1. Tại Luồng thay thế 3a, khi thời gian ân hạn 72 giờ kết thúc ($T_{\text{current}} > T_{\text{deadline}}$) mà nhóm sinh viên chưa nộp bản hồ sơ hiệu chỉnh, hệ thống tự động kích hoạt tiến trình kiểm tra quá hạn định kỳ.
- 3a.e.2. Hệ thống tự động chuyển trạng thái đề tài thành Giảng viên từ chối (`GV_TU_CHOI`), ghi nhận lý do: "*Đề tài tự động bị từ chối do quá thời hạn ân hạn 72 giờ mà không nộp bản hiệu chỉnh theo yêu cầu của GVHD*".
- 3a.e.3. Hệ thống chặn không chuyển đề tài lên Bộ môn (bảo vệ **BR-03**), gửi thông báo hủy đề tài đến nhóm sinh viên và GVHD.
- 3a.e.4. Kết thúc use case, điều kiện sau **không** đạt.

**4e. Giảng viên hướng dẫn vượt trần hạn mức N sinh viên (Vi phạm BR-01)**
- 4e.1. Tại Bước 3 của Luồng chính, khi GVHD bấm "Đồng ý thẩm định", hệ thống tại Bước 4 thực hiện kiểm tra hạn mức và phát hiện tổng số sinh viên hiện tại cộng với số thành viên nhóm đề tài vượt quá hạn mức tối đa $N$ ($S_{\text{current}} + \|G\| > N$).
- 4e.2. Hệ thống chặn thao tác chấp thuận, giữ nguyên trạng thái đề tài là `CHO_GV_DONG_Y`, không chuyển hồ sơ lên cấp Bộ môn (bảo vệ **BR-01** và **BR-03**).
- 4e.3. Hệ thống hiển thị cảnh báo lỗi chi tiết: *"Không thể tiếp nhận đề tài: Giảng viên đã đạt hoặc sẽ vượt quá hạn mức tối đa N sinh viên đang hướng dẫn cùng lúc (Hạn mức: N sinh viên, Hiện tại: X sinh viên, Nhóm đề tài: Y sinh viên). Vui lòng từ chối đề tài hoặc liên hệ Trưởng bộ môn để điều chỉnh chỉ tiêu."*
- 4e.4. GVHD chỉ có thể chọn hủy bỏ thao tác hoặc chuyển sang từ chối đề tài (nhánh 3e).
- 4e.5. Kết thúc use case, điều kiện sau **không** đạt.

**7e. Trưởng bộ môn từ chối dứt điểm đề tài tại Cấp 2**
- 7e.1. Tại Bước 7 của Luồng chính, Trưởng bộ môn xem xét hồ sơ và quyết định không phê duyệt đề tài (do trùng lặp đề tài các năm trước, vượt quá phạm vi đồ án đại học hoặc không đảm bảo điều kiện cơ sở vật chất), chọn hành động "Từ chối phê duyệt" và bắt buộc nhập lý do từ chối dứt điểm.
- 7e.2. Hệ thống cập nhật trạng thái đề tài thành Bộ môn từ chối (`BO_MON_TU_CHOI`), hủy chỉ tiêu sinh viên đã tạm giữ của GVHD tại Bước 4 (giữ đúng tính toàn vẹn cho hạn mức **BR-01**).
- 7e.3. Hệ thống ghi nhật ký quyết định và gửi thông báo từ chối kèm lý do chính thức của Trưởng bộ môn đến cả Giảng viên hướng dẫn và nhóm Sinh viên. Đề tài bị hủy kết quả xét duyệt.
- 7e.4. Kết thúc use case, điều kiện sau **không** đạt.

## Ràng buộc liên quan

- **BR-01**: Một giảng viên không được nhận vượt quá hạn mức $N$ sinh viên đang hướng dẫn cùng lúc ($S_{\text{current}} + \|G\| \le N$).
  - *Bảo vệ tại:* Bước 3, 4 (khi GVHD thẩm định chấp nhận hướng dẫn) và Bước 8 (khi Trưởng bộ môn phê duyệt chính thức ghi nhận tăng `soLuongHienTai`). Nếu vi phạm, hệ thống kích hoạt luồng lỗi **4e** để chặn tiếp nhận và giữ an toàn dữ liệu.
- **BR-03**: Đề tài chưa được giảng viên thẩm định không được chuyển lên bộ môn phê duyệt.
  - *Bảo vệ tại:* Bước 4 (chỉ đổi trạng thái sang `CHO_BO_MON_DUYET` khi GVHD đồng ý thẩm định) và Bước 5, 6 (hệ thống chỉ hiển thị ở danh sách của Trưởng bộ môn các đề tài đã qua GVHD thẩm định đạt). Khi GVHD từ chối dứt điểm ở luồng lỗi **3e** hoặc quá hạn ân hạn ở luồng **3a.e**, đề tài bị chặn tuyệt đối không được chuyển lên cấp Bộ môn.
- **BR-05**: Khóa chỉnh sửa thông tin đề tài sau khi được Bộ môn phê duyệt chính thức.
  - *Bảo vệ tại:* Bước 8 (chuyển sang trạng thái `DUOC_BAO_VE` và chặn mọi quyền chỉnh sửa thuộc tính đề tài).
