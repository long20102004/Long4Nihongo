# Long4Nihongo
## 1. Thông tin chung
**Tên Dự Án:** Long4Nihongo

**Link truy cập:** [long4nihongo.com]

**Link Dự Án:** [https://github.com/long20102004/ProGameJam-Obsidian_Chronicles/tree/main](https://github.com/long20102004/Long4Nihongo)

**Author:**
- Hoàng Hải Long

**Mô hình làm việc**
Hoạt động theo mô hình Scrum, sử dụng Linear để quản lý công việc. Các công việc được keep track đầy đủ trên Linear.

- Link linear: [https://linear.app/bdtproptit/team/NHOM2/all](https://linear.app/nhom2-oop/team/FEAT/all)

**Version Control Strategy**

Dự án hoạt động theo Gitflow để quản lý code.Mỗi tính năng sẽ tạo branch từ develop để làm việc, các branch đặt theo format feature/ten-chuc-nang, sau khi hoàn thành sẽ tạo Pull Request để review code và merge vào develop

- Các nhánh chính:
  + `main`: Chứa code ổn định, đã qua kiểm tra và test kỹ lưỡng
  + `develop`: Chứa code mới nhất, đã qua review và test
  + `feature/`: Các nhánh chứa code đang phát triển, short-live, sau khi hoàn thành sẽ merge vào `develop`.
  
![image](https://github.com/user-attachments/assets/2d4f103e-394c-476e-8ef9-3564cc79dd90)


## 2. Giới Thiệu Dự Án
**Mô tả :** 
 - **Tên sản phẩm:** Long4Nihongo
- **Thể loại:** Website dạy học tiếng Nhật
- **Cách sử dụng :** Học thông qua flashcard, các phần lý thuyết, video, slide, ... cùng với test để luyện tập.
- **Giao diện** Đơn giản, dễ sử dụng.

## 3. Các Chức Năng Chính

- **Chức năng 1:** "Đăng ký, đăng nhập. Có thể sử dụng tài khoản Google hoặc Facebook để đăng nhập."
- **Chức năng 2:** "Xem và cập nhật thông tin chi tiết tài khoản cá nhân"
- **Chức năng 3:** "Tham khảo danh sách các khóa học"
- **Chức năng 4:** "Xem giới thiệu chi tiết khóa học"
- **Chức năng 5:** "Thanh toán khóa học (tự động xác nhận)"
- **Chức năng 6:** "Xem danh sách các khóa học đã mua"
- **Chức năng 7:** "Xem nội dung khóa học"
- **Chức năng 8:** "Xem lịch sử thanh toán"
- **Chức năng 9:** "Luyện speaking với AI voice chat"
## 4. Công Nghệ
#### 4.1. Công Nghệ Sử Dụng
- Backend: Spring Boot, Oauth2
- Front end: ReactJs
- Database: MySQL
- Xác thực người dùng bằng token - stateless

## 6. Các Vấn Đề Gặp Phải

#### Vấn Đề 1: Xử lý token cho người dùng đăng nhập bằng bên thứ 3
- Sau khi user đăng nhập bằng facebook hay google, token không gửi thẳng qua frontend như đăng nhập bình thường.

#### Hành Động Giải Quyết 
**Giải pháp:** Gán token lên URL trong sau khi đã login thành công với OAuth2, sau đó frontend đọc token từ url.

#### Kết Quả
- Giải quyết được vấn đề.

#### Vấn Đề 2: Lỗi CORS khi gọi API từ frontend
- Chính sách CORS chỉ cho phép gọi api từ nguồn có cùng tên miền. Trong khi dev sử dụng 2 port 8080 và 3000 nên không gọi được API. Đã sử dụng CrossOrigin và addCorsMapping nhưng không hiệu quả

#### Hành Động Giải Quyết 
**Giải pháp:** Cài extension để tắt tạm CORS của trình duyệt - Khi deploy sẽ không còn CORS do hạn chế này chỉ gặp trong khi dev.

#### Kết Quả
- Giải quyết được vấn đề.

## 7. Kết Luận

**Kết quả đạt được:** Website có đủ các tính năng chính để học tập. 

**Hướng phát triển tiếp theo:** Update thêm các bài học mới, có thể ra thêm các tính năng như học qua video hoặc nhắn tin thời gian thực với người dạy.

