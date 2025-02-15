# 22KTPM3-CSC13010-Exercise

# Chương Trình Quản Lý Sinh Viên

Chương trình này là một ứng dụng console đơn giản để quản lý danh sách sinh viên. Nó cho phép bạn thêm, xóa, cập nhật, và tìm kiếm thông tin sinh viên. Dữ liệu sinh viên được lưu trữ trong một file JSON (`students.json`) để đảm bảo tính bền vững.

## Cấu Trúc Mã Nguồn

File `22127444.js` chứa toàn bộ mã nguồn của chương trình. Nó được chia thành các phần chính sau:

*   **Các hàm hỗ trợ (Helper functions):**
    *   `isValidEmail(email)`: Kiểm tra định dạng email.
    *   `isValidPhoneNumber(phoneNumber)`: Kiểm tra định dạng số điện thoại.
    *   `isValidFaculty(faculty)`: Kiểm tra tên khoa có hợp lệ không.
    *   `isValidStudentStatus(status)`: Kiểm tra tình trạng sinh viên có hợp lệ không.
*   **Các hàm quản lý dữ liệu:**
    *   `loadStudents()`: Đọc dữ liệu sinh viên từ file `students.json`.
    *   `saveStudents(students)`: Lưu dữ liệu sinh viên vào file `students.json`.
    *   `addStudent(student)`: Thêm một sinh viên mới vào danh sách.
    *   `deleteStudent(mssv)`: Xóa sinh viên khỏi danh sách dựa trên MSSV.
    *   `updateStudent(mssv, updatedStudent)`: Cập nhật thông tin sinh viên dựa trên MSSV.
    *   `searchStudents(searchTerm)`: Tìm kiếm sinh viên theo tên hoặc MSSV.
*   **Hàm `main()`:** Hàm chính để chạy ứng dụng console, cung cấp giao diện người dùng tương tác.

## Hướng Dẫn Cài Đặt và Chạy Chương Trình

**Các bước thực hiện:**

1.  **Mở terminal/command prompt:** Mở cửa sổ terminal hoặc command prompt và di chuyển đến thư mục chứa mã nguồn.
2.  **Chạy chương trình:** Gõ lệnh `node 22127444.js` và nhấn Enter.
3.  **Tương tác:** Chương trình sẽ hiển thị menu các tùy chọn. Làm theo hướng dẫn trên màn hình để thêm, xóa, cập nhật hoặc tìm kiếm sinh viên.
