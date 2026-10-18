# Biên bản Phỏng vấn Thu thập Yêu cầu & Thẩm định Miền — Hệ thống ThesisHub

- **Phụ trách:** N14-C

**Phương pháp thực hiện:** Phỏng vấn bán cấu trúc (Semi-structured Qualitative Interview)  
**Tổ chức thực hiện:** Nhóm phát triển N14 (`N14-A`, `N14-B`)  
**Thời gian tiến hành:** Học kỳ 1, Năm học 2026–2027 (Tháng 10/2026)  
**Phạm vi nghiên cứu:** Quy trình đăng ký, thẩm định học thuật, xét duyệt và nghiệm thu Khóa luận / Đồ án tốt nghiệp đại học theo phương pháp Phân tích & Thiết kế Hướng đối tượng (OOAD).

---

## 1. Mục tiêu và Phương pháp luận Thu thập Yêu cầu (Elicitation Methodology)

Nhằm đảm bảo hệ thống phần mềm phản ánh chính xác mô hình thế giới thực và bảo toàn các bất biến nghiệp vụ (Business Invariants) ngay từ tầng mô hình miền (Domain Layer), nhóm N14 tiến hành điều tra thực nghiệm thông qua kỹ thuật phỏng vấn sâu hai nhóm tác nhân đại diện:
1. **Nhóm tác nhân Tác nghiệp (Operational Actor):** Sinh viên năm cuối chuẩn bị thực hiện học phần Khóa luận tốt nghiệp (`SV-01`).
2. **Nhóm tác nhân Chuyên môn & Quản trị học thuật (Domain Expert & Academic Authority):** Giảng viên bộ môn Công nghệ Phần mềm trực tiếp tham gia hướng dẫn và thẩm định đề tài (`GV-01`).

Mục tiêu cốt lõi là làm rõ:
- Các điểm nghẽn thông tin (Information Bottlenecks) trong giao thức tương tác hiện tại giữa Sinh viên, Giảng viên hướng dẫn (GVHD) và Trưởng bộ môn.
- Cấu trúc dữ liệu và chu kỳ vòng đời (Lifecycle State Machine) của một hồ sơ đề tài.
- Các quy tắc nghiệp vụ bất biến cần được bao đóng (Encapsulate) chặt chẽ trong các thực thể miền (Domain Entities).

---

## 2. Nhật ký Phỏng vấn Chuyên sâu

### 2.1. Phỏng vấn Khách thể Sinh viên (Mã đối tượng: `SV-01`)
* **Vai trò:** Sinh viên năm cuối chuyên ngành Kỹ thuật Phần mềm.
* **Người thực hiện phỏng vấn:** `N14-A`.
* **Mục tiêu phiên:** Khảo sát hành vi khởi tạo đề xuất, quy trình kết nối cộng tác nhóm (Collaboration Dynamics) và nhu cầu phản hồi trạng thái học vụ.

#### Nội dung phiên chất vấn:

**N14-A:** *Dưới góc độ người dùng trực tiếp tham gia quy trình, bạn hãy mô tả quy trình thực tế từ khi nảy sinh ý tưởng nghiên cứu đến khi được chấp thuận chính thức làm Khóa luận tốt nghiệp? Có những rào cản thông tin nào cản trở bạn?*  
**SV-01:** Quy trình hiện nay phân mảnh nghiêm trọng. Tụi mình thường tiếp cận giảng viên qua email hoặc tin nhắn cá nhân. Rào cản lớn nhất là sự bất đối xứng thông tin (Information Asymmetry): sinh viên không thể biết được hiện tại thầy cô đã tiếp nhận bao nhiêu sinh viên và còn hạn ngạch (quota) hay không. Nhiều trường hợp tụi mình soạn đề cương công phu gửi giảng viên nhưng phải đợi 1–2 tuần mới nhận phản hồi là thầy cô đã đủ chỉ tiêu. Khi đó thời hạn đóng đăng ký của bộ môn đã cận kề, buộc sinh viên phải chọn vội một giảng viên khác còn suất với đề tài không đúng sở trường nghiên cứu.

**N14-A:** *Khi đã nộp đề cương lên cấp Bộ môn xét duyệt, cơ chế phản hồi hiện tại đáp ứng tính minh bạch như thế nào?*  
**SV-01:** Sau khi giảng viên hướng dẫn đồng ý, hồ sơ gần như rơi vào "hộp đen". Sinh viên nộp biểu mẫu qua văn phòng khoa hoặc Google Form nhưng không hề có cơ chế theo dõi trạng thái đề tài theo thời gian thực. Đề tài đang được xem xét, bị nghi ngờ trùng lặp, hay đã được thông qua sơ duyệt đều không rõ. Nếu bị từ chối vào sát ngày chốt danh sách, sinh viên hoàn toàn bị động và đối diện nguy cơ phải hủy học phần tốt nghiệp.

**N14-A:** *Quy chế đào tạo quy định mỗi đề tài chỉ được thực hiện tối đa 2 sinh viên. Việc hình thành nhóm nghiên cứu (Team Formation) đang gặp những vướng mắc gì về mặt phối hợp năng lực?*  
**SV-01:** Quy mô 1–2 sinh viên là chuẩn mực để đánh giá đúng khối lượng và năng lực cá nhân. Tuy nhiên, thách thức lớn là bài toán ghép cặp năng lực bù trừ (Complementary Skillsets). Ví dụ: một bạn sinh viên có thế mạnh sâu về Thuật toán, Xử lý ngôn ngữ tự nhiên và Kiến trúc Backend thường thiếu hụt kỹ năng xây dựng Giao diện (Frontend/UI-UX) hoặc Kiểm thử. Rất nhiều bạn có ý tưởng xuất sắc nhưng không tìm được người đồng hành phù hợp trong mạng lưới quan hệ hẹp của mình. Nếu hệ thống có cơ chế "tìm kiếm đồng đội" thông qua hồ sơ năng lực và gắn nhãn tuyển thành viên cho đề tài thì sẽ giải quyết triệt để nút thắt này.

---

### 2.2. Phỏng vấn Chuyên gia Miền & Giảng viên Hướng dẫn (Mã đối tượng: `GV-01`)
* **Vai trò:** Giảng viên bộ môn Công nghệ Phần mềm, thành viên Hội đồng bảo vệ đồ án tốt nghiệp.
* **Người thực hiện phỏng vấn:** `N14-B`.
* **Mục tiêu phiên:** Xác định quy tắc toàn vẹn dữ liệu, cơ chế phân quyền phê duyệt nhiều cấp (Multi-level Approval Workflow) và bao đóng các bất biến học thuật.

#### Nội dung phiên chất vấn:

**N14-B:** *Thưa thầy, dưới góc nhìn quản trị học thuật, thầy nhận định thế nào về việc kiểm soát chỉ tiêu hướng dẫn sinh viên (Quota Allocation) của từng giảng viên trong mỗi học kỳ?*  
**GV-01:** Vấn đề cốt lõi là kiểm soát tải làm việc (Workload Balancing). Theo quy định đào tạo, mỗi giảng viên chỉ được hướng dẫn tối đa $N$ sinh viên (thường là $N = 10$) trong một học kỳ để đảm bảo thời lượng cố vấn chất lượng. Nhưng vì sinh viên liên hệ qua nhiều kênh phi chính thức, giảng viên rất dễ rơi vào tình trạng "nhận quá tay". Khi phát hiện vượt hạn mức, tôi buộc phải rà soát và từ chối các nhóm nộp sau. Nếu hệ thống phần mềm không tự động chặn việc nhận sinh viên khi hạn mức đã chạm ngưỡng, thì tình trạng quá tải cục bộ tại các giảng viên có uy tín sẽ liên tục tái diễn.

**N14-B:** *Trong mô hình hướng đối tượng, vòng đời của đề tài chuyển giao qua nhiều tác nhân: Sinh viên $\rightarrow$ GVHD $\rightarrow$ Trưởng bộ môn $\rightarrow$ Hội đồng bảo vệ. Thầy đánh giá ranh giới trách nhiệm giữa các tác nhân này nên được phân định ra sao?*  
**GV-01:** Cần phân định rành mạch hai cấp độ thẩm định:
1. **Cấp độ Giảng viên hướng dẫn:** Thẩm định tính khả thi ban đầu, đạo đức nghiên cứu và sự sẵn sàng của nhóm sinh viên. Nếu GVHD không phê duyệt, đề tài không bao giờ được phép tiến lên cấp bộ môn.
2. **Cấp độ Trưởng bộ môn:** Thẩm định tính liêm chính học thuật (không trùng lặp đề tài các khóa trước), tính chuẩn mực về quy mô và quyết định tính đủ điều kiện ra Hội đồng.
Ngoài ra, một bất biến cực kỳ quan trọng: khi Trưởng bộ môn đã ra quyết định phê duyệt (`DUOC_BAO_VE`), sinh viên tuyệt đối không được phép tùy tiện hiệu chỉnh tên đề tài hoặc nội dung cốt lõi nếu không có biên bản đồng thuận của bộ môn.

**N14-B:** *Về khâu thành lập Hội đồng nghiệm thu (Defense Council), quy chế nhà trường đặt ra các ràng buộc cấu trúc nào đối với việc chỉ định giảng viên?*  
**GV-01:** Một Hội đồng bảo vệ hợp lệ bắt buộc phải có từ 3 đến 5 thành viên (Chủ tịch, Thư ký, Ủy viên/Phản biện). Để đảm bảo tính khách quan và tránh xung đột lợi ích (Conflict of Interest), giảng viên hướng dẫn không được tham gia chấm điểm với tư cách thành viên độc lập trong hội đồng chấm chính đề tài của mình; điểm số của GVHD được ghi nhận độc lập ở cột điểm quá trình.

**N14-B:** *Một kịch bản ngoại lệ (Exception Flow) rất nhạy cảm là khi đề tài bị từ chối vào thời điểm sát hạn chót (Deadline) của đợt đăng ký. Dưới góc độ quy chế học vụ, nhà trường giải quyết tình huống này thế nào: hệ thống sẽ chuyển thẳng sang trạng thái kết thúc hay kích hoạt luồng ân hạn cho sinh viên?*  
**GV-01:** Đây là câu hỏi nghiệp vụ mang tính sống còn để thiết kế luồng chuyển trạng thái không gây bế tắc. Quy chế đào tạo của khoa phân loại rõ hai hình thức từ chối:
1. **Từ chối có điều kiện (Soft Rejection — lỗi kỹ thuật, phạm vi quá rộng hoặc thiếu sót đề cương):** Hệ thống tuyệt đối KHÔNG chuyển ngay sang trạng thái kết thúc, mà kích hoạt luồng **Ân hạn hiệu chỉnh (Grace Period Transition)** kéo dài 72 giờ, chuyển hồ sơ sang trạng thái `YEU_CAU_CHINH_SUA`. Trong khoảng thời gian này, sinh viên được quyền hiệu chỉnh và tái nộp hồ sơ duy nhất 01 lần (`soLanChinhSua <= 1`).
2. **Từ chối dứt điểm (Hard Rejection — vi phạm liêm chính học thuật, đạo văn hoặc không đủ điều kiện tín chỉ tích lũy) HOẶC hết hạn ân hạn 72 giờ mà không nộp lại:** Cỗ máy trạng thái sẽ kích hoạt chuyển tiếp thẳng sang **Trạng thái kết thúc (Terminal State: `BO_MON_TU_CHOI`)**. Tại trạng thái này, hồ sơ bị khóa đóng băng (Frozen), sinh viên bị hủy tư cách tham gia đợt đồ án học kỳ đó để bảo đảm tính kỷ luật và toàn vẹn tiến độ của toàn khoa.

---

## 3. Phân tích Tác động đến Mô hình Hướng Đối Tượng (OOAD Impact Analysis)

Dựa trên dữ liệu định tính thu thập được, nhóm N14 đã tiến hành chuẩn hóa và ánh xạ các phát hiện thực nghiệm thành các cấu trúc giải pháp cụ thể trong thiết kế phần mềm hướng đối tượng:

### 3.1. Ma trận Truy vết Yêu cầu & Thiết kế (Traceability Matrix)

| # | Phát hiện thực nghiệm | Yêu cầu chức năng / Bất biến | Cấu trúc OOAD chịu trách nhiệm |
|---|---|---|---|
| **TR-01** | Sinh viên gặp khó khăn trong việc tìm bạn đồng hành có năng lực bổ trợ để tạo nhóm 2 người | **FR-02:** Ghép đội thông minh (`Teammate Matchmaking`) | Lớp `DeTaiTotNghiep` với thuộc tính trạng thái tuyển thành viên; lớp `YeuCauGiaNhapNhom` quản lý tương tác kết nạp giữa hai thực thể `SinhVien`. |
| **TR-02** | Giảng viên bị quá tải số lượng sinh viên đăng ký do thiếu cơ chế kiểm soát ngưỡng tự động | **BR-01, FR-05, FR-08:** Hạn mức tối đa $N$ sinh viên/GVHD | Bao đóng tại phương thức `coTheNhanThem()`, `tangSoLuong()` trong thực thể `GiangVienHuongDan`. Bất biến: `soLuongHienTai + delta <= soLuongSinhVienToiDa`. |
| **TR-03** | Quy định nghiêm ngặt về quy mô nhóm đồ án tốt nghiệp đại học | **BR-02, FR-01:** Nhóm chỉ gồm 1 đến 2 sinh viên | Ràng buộc đa tạp (Multiplicity Constraint) $1..2$ giữa `SinhVien` và `DeTaiTotNghiep`. Kiểm tra tại hàm khởi tạo `DeTaiTotNghiep` và phương thức kết nạp thành viên. |
| **TR-04** | Hồ sơ đề tài bị tồn đọng, thiếu minh bạch trong luân chuyển qua các cấp thẩm định | **FR-03, FR-04, FR-06:** Cỗ máy trạng thái thời gian thực | Thiết kế mẫu cỗ máy trạng thái (State Pattern) với tập trạng thái khép kín: `CHO_GV_DONG_Y` $\rightarrow$ `CHO_BO_MON_DUYET` $\rightarrow$ `DUOC_BAO_VE` $\rightarrow$ `DA_HOAN_THANH`. |
| **TR-05** | Ngăn ngừa việc sinh viên tự ý thay đổi phạm vi sau khi bộ môn đã xét duyệt chính thức | **BR-05:** Khóa chỉnh sửa thông tin đề tài đã duyệt | Kiểm tra điều kiện bảo vệ (Precondition Guard) tại phương thức `capNhatThongTin()` của lớp `DeTaiTotNghiep`: chặn sửa khi `trangThai == DUOC_BAO_VE`. |
| **TR-06** | Đảm bảo tính hợp lệ của đơn vị nghiệm thu học thuật cuối kỳ | **BR-04, FR-07:** Quy mô Hội đồng bảo vệ từ 3 đến 5 giảng viên | Thuộc tính tập hợp `danhSachThanhVien` trong thực thể `HoiDongBaoVe` đóng gói ràng buộc kích thước: $3 \le \text{size} \le 5$. |
| **TR-07** | Xử lý kịch bản ngoại lệ khi đề tài bị từ chối sát hạn chót nộp hồ sơ | **FR-03, FR-06:** Cơ chế ân hạn có điều kiện (Grace Period) & Trạng thái kết thúc | Thiết kế trong cỗ máy trạng thái (`state.mmd`) với trạng thái trung gian `YEU_CAU_CHINH_SUA`, kèm các Guard Condition: `[soLanChinhSua < 1]` và bộ đếm thời gian (Timer Event: 72 giờ). Nếu quá hạn ân hạn hoặc vi phạm nghiêm trọng thì chuyển sang trạng thái kết thúc `BO_MON_TU_CHOI`. |

### 3.2. Đánh giá tính Kết dính (Cohesion) và Ghép nối (Coupling)
* **High Cohesion (Kết dính cao):** Mọi quy tắc nghiệp vụ liên quan đến hạn mức đều được quy tụ hoàn toàn vào thực thể `GiangVienHuongDan`; mọi ràng buộc về trạng thái duyệt và số lần hiệu chỉnh thuộc trọn vẹn trách nhiệm của `DeTaiTotNghiep`.
* **Low Coupling (Ghép nối lỏng):** Các tác nhân tương tác thông qua các thông điệp có kiểm soát thẩm quyền; tầng Giao diện (Frontend) tuyệt đối không tự ý quyết định việc chuyển trạng thái mà phải gửi thông điệp yêu cầu thực thi thông qua tầng Dịch vụ miền (Domain Service). Cỗ máy trạng thái chuyển tiếp dựa trên sự kiện và điều kiện bảo vệ (Guards) độc lập với giao diện người dùng.
