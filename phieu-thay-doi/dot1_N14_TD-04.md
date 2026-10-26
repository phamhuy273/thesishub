# Phiếu thay đổi đã sinh — TD-04 · Một thành nhiều

| Ô | Nội dung |
|---|---|
| Nhóm | N14 (cụm 3, vị trí 4) |
| Hệ thống | ThesisHub |
| Đợt | 1 |
| Mã đợt | 6ALT |
| Ngày chạy | 2026-10-26 · người chạy N14-A · công cụ Antigravity |
| Commit kho | 5293f695c4782cc54c985a96fe2072399cec4181 |
| Mã phiếu | TD-04 · theo ma trận: đợt 1, vị trí 4 |

## Hồ sơ kho dùng cho phiếu
- Đối tượng trung tâm: DeTaiTotNghiep · nguồn: `src/backend/src/main/java/vn/edu/uit/se100/thesishub/domain/DeTaiTotNghiep.java:20` · theo quy tắc H6.3 (lớp duy nhất có thuộc tính trạng thái `trangThai` tại dòng 37)
- H1. Tên hệ thống: ThesisHub · nguồn: `README.md:1`
- H2. Tác nhân: Sinh viên, Giảng viên hướng dẫn, Trưởng bộ môn · Tác nhân chính: Sinh viên (4 dòng FR, đứng đầu bảng) · nguồn: `docs/yeu-cau.md:11`
- H7. Trạng thái của ĐTTT: CHO_GV_DONG_Y, GV_TU_CHOI, CHO_BO_MON_DUYET, BO_MON_TU_CHOI, DUOC_BAO_VE, DA_HOAN_THANH · nguồn: `src/backend/src/main/java/vn/edu/uit/se100/thesishub/domain/TrangThaiDeTai.java:2-8` (suy từ thứ tự khai báo); Luồng chính: CHO_GV_DONG_Y → CHO_BO_MON_DUYET → DUOC_BAO_VE → DA_HOAN_THANH; Kết thúc không thành công: GV_TU_CHOI, BO_MON_TU_CHOI; Kết thúc thành công: DA_HOAN_THANH.
- H12. Người phụ trách: `docs/dac-ta-UC-01.md`: `Phụ trách: N14-B` (dòng 3); `diagrams/use-case.mmd`: `%% Phụ trách: N14-B` (dòng 2); `docs/yeu-cau.md`: `Phụ trách: N14-B` (dòng 3); `docs/dac-ta-UC-03.md`: `Phụ trách: N14-C` (dòng 1).

## Tình huống khung (nguyên văn)
Hiện mỗi <ĐTTT> gắn với đúng một <lớp liên quan>. Khách hàng muốn từ nay một <ĐTTT> gồm nhiều <lớp liên quan>. Từng phần có thể bị từ chối riêng, các phần khác vẫn đi tiếp.

## Tình huống may đo
Chào nhóm N14 (phụ trách N14-A, N14-B). Hiện tại trong hệ thống ThesisHub, mỗi đề tài tốt nghiệp (DeTaiTotNghiep) chỉ gắn với đúng một cán bộ hướng dẫn (GiangVienHuongDan). Nay Phòng Đào tạo yêu cầu hỗ trợ cơ chế đồng hướng dẫn: mỗi đề tài gồm từ 1 đến 5 giảng viên hướng dẫn, thêm người thứ 6 sẽ bị từ chối. Mỗi giảng viên có trạng thái thẩm định riêng, việc một giảng viên từ chối không làm hủy bỏ giảng viên khác. Đề tài hoàn tất thẩm định khi mọi giảng viên đã cho ý kiến và có ít nhất một giảng viên đồng ý; nếu mọi giảng viên đều từ chối thì đề tài bị hủy. Hạn ngạch tối đa 10 sinh viên theo BR-01 vẫn áp dụng riêng cho từng giảng viên. Dữ liệu đề tài cũ vẫn giữ nguyên hợp lệ.

## Tham số cố định
- Một DeTaiTotNghiep gồm từ **1 đến 5** GiangVienHuongDan; phần thứ 6 bị từ chối.
- Mỗi phần có trạng thái riêng; từ chối một phần không huỷ phần khác.
- DeTaiTotNghiep hoàn tất khi mọi phần đã ở trạng thái kết thúc và có ít nhất **một** phần thành công. Mọi phần bị từ chối thì DeTaiTotNghiep bị huỷ.
- Luật đang áp cho GiangVienHuongDan (hạn mức tối đa 10 sinh viên theo BR-01) áp cho từng phần.
- Dữ liệu cũ (mỗi DeTaiTotNghiep một phần) vẫn đúng, không phải nhập lại.

## Chi tiết may đo
- Ô 1 · lớp liên quan: GiangVienHuongDan
- Lớp liên quan gắn với bản số một từ DeTaiTotNghiep: `src/backend/src/main/java/vn/edu/uit/se100/thesishub/domain/DeTaiTotNghiep.java:42-44` (`private GiangVienHuongDan giangVienHuongDan;`)

## Giá trị trung gian để kiểm lại
- K = N14-6ALT · S = 503
- Ô 1: S_1 = 504 · danh sách (n = 1): 1. GiangVienHuongDan · danh sách chỉ có một phần tử nên n = 1, không băm, chọn vị trí 1 → GiangVienHuongDan

## Việc nhóm phải làm
1. Một hạng mục trên tab Issues, nhãn `phieu-thay-doi`, ô Truy vết ghi TD-04. Given–When–Then dùng đúng các con số ở mục Tham số cố định.
2. Một ADR `adr/0001-xu-ly-TD-04.md` theo khuôn `adr/0000-mau-xu-ly-phieu.md`, năm phần:
   1. bảng tác động lập trước khi sửa: lớp hay module phải sửa; lớp không phải sửa và vì sao; chỗ thiết kế làm việc khó hơn mức cần;
   2. ít nhất hai phương án thiết kế, mỗi phương án được gì, mất gì;
   3. phương án chọn và người quyết;
   4. cái phải đánh đổi, sơ đồ nào phải cập nhật;
   5. kết quả thực tế: số lớp đã sửa thật so với bảng tác động, PR hiện thực; điền ở Gói 5.
3. Một PR hiện thực có `Đóng #<số hạng mục>`, xong trước hạn Gói 6.

## Điều nhóm phải chứng minh
Đổi bản số là đổi mô hình chứ không chỉ thêm bảng: trạng thái nằm ở DeTaiTotNghiep hay ở từng phần; composition giữa DeTaiTotNghiep và phần; luật hoàn tất tính ở lớp nào; sơ đồ lớp, sơ đồ trạng thái và sequence cập nhật khớp nhau.

## Kiến thức cần
buổi 7 (`loop` trong sequence), 8 (quan hệ, bản số, composition, trạng thái), 9 (bảng tác động).

## Gợi ý bảng tác động
mọi chỗ đọc thẳng một GiangVienHuongDan từ DeTaiTotNghiep; chỗ tính tổng, hiển thị, kiểm luật của GiangVienHuongDan; sơ đồ trạng thái thành hai mức.

## Gói nộp
Gói 4, hạn cuối tuần 9 (năm nay CN 08/11) · nộp kèm: tệp phiếu này, log phiên, ADR phần 1–4.

## Chỗ không đủ dữ liệu, kho thiếu hoặc kho đã có
- kho thiếu: `diagrams/class.mmd` và `diagrams/state.mmd` (xác định ĐTTT và lớp liên quan qua mã nguồn Java trong `src/backend/` theo quy tắc H5 và H6.3).
- kho chưa có: cơ chế đồng hướng dẫn nhiều giảng viên (hiện `DeTaiTotNghiep` đang gắn `@ManyToOne` đơn với 1 `GiangVienHuongDan`).
