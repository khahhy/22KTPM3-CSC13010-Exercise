# 22KTPM3-CSC13010-Exercise

## **Chương Trình Quản Lý Sinh Viên**

Ứng dụng **Quản Lý Sinh Viên** là một hệ thống web-based giúp quản lý danh sách sinh viên trong trường.
Chương trình cho phép người dùng thêm, xóa, cập nhật, tìm kiếm sinh viên, quản lý khoa, chương trình đào tạo, tình trạng sinh viên và **xuất giấy xác nhận sinh viên.

---

## **Công Nghệ Sử Dụng**
### **Backend:**
- **Node.js** với **Express.js** để tạo RESTful API.

### **Frontend:**
- **React.js** để xây dựng giao diện người dùng.

---

## **Cấu Trúc Dự Án**

### **Frontend (`/frontend/src/`)**
- **components/**: Chứa các thành phần giao diện
- **pages/**: Các trang chính của ứng dụng
- **services/**: Quản lý API kết nối với backend
- **styles/**: Chứa các file CSS tùy chỉnh
- **utils.js**: File chứa các hàm tiện ích dùng chung
- **App.js**: File chính điều hướng ứng dụng React
- **Index.js**: Điểm khởi đầu ứng dụng React

### **Backend (`/backend/`)**
- **controller/**: Xử lý logic nghiệp vụ
- **route/**: Định tuyến API
- **model/**: Xử lý dữ liệu JSON
- **data/**: Chứa các tệp JSON dữ liệu
- **server.js**: File chính để chạy server
- **logger.js**: Ghi log hệ thống

---

## **Hướng Dẫn Cài Đặt**

### **Yêu cầu:**
- **Node.js** v14+ (Nên dùng **LTS version**)
- **npm** hoặc **yarn**

### **Cài đặt Backend**
```sh
cd backend
npm i
```

### **Chạy Backend**
```sh
nodemon server
```

### **Cài đặt Frontend**
```sh
cd frontend
npm i
```

### **Chạy Frontend**
```sh
npm start
```

---

## **📌 Một Số Hình Ảnh Minh Họa**
### **Giao diện Dashboard**
![Dashboard](/img/v2_dashboard.png)

### **Thêm Sinh Viên**
![Thêm Sinh Viên](/img/v2_add.png)

### **Tìm Kiếm Sinh Viên**
![Tìm Kiếm](/img/v2_search.png)

### **Cập nhật Sinh Viên**
![Cập nhật Sinh Viên](/img/v2_update.png)

### **Xóa Sinh Viên**
![Xóa Sinh Viên](/img/v2_delete.png)

![Điều kiện xóa](/img/v2_delete_rule.png)

### **Import/Export**
![Import](/img/v2_import.png)

![Export](/img/v2_export.png)

### **Xuất Giấy Xác Nhận**
![Xuất Giấy Xác Nhận](/img/v2_export_doc.png)

![Chọn lí do xuất Giấy Xác Nhận](/img/v2_export_doc_reason.png)

![Xuất Giấy Xác Nhận dạng HTML](/img/v2_doc_html.png)

![Xuất Giấy Xác Nhận dạng MD](/img/v2_doc_md.png)


### **Quản Lý Khoa/Chương trình/Tình trạng**
![Quản Lý Khoa/Chương trình/Tình trạng](/img/v2_delete_field.png)

### **Quản Lý Cài đặt**
![Quản Lý cài đặt](/img/v2_settings.png)

