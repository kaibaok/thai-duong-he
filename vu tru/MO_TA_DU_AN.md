# Du hành Hệ Mặt Trời – Trang web trực quan cho bé

## 1. Mục tiêu
Tạo một trang web trực quan, sinh động để các bé có thể **nhìn thấy và khám phá** các hành tinh trong Thái Dương Hệ. Trải nghiệm bắt đầu từ **Trái Đất**, sau đó bé "bay ra" ngắm vũ trụ, các vì sao và từng hành tinh.

## 2. Đối tượng
- Trẻ em khoảng 4–12 tuổi, có thể dùng cùng cha mẹ/giáo viên.
- Dùng được trên máy tính, máy tính bảng và điện thoại (cảm ứng).

## 3. Trải nghiệm chính
1. **Màn hình mở đầu – Từ Trái Đất nhìn lên trời**
   - Cảnh bầu trời đêm đầy sao, Mặt Trăng, vài chòm sao nổi tiếng (Gấu Lớn, Orion…).
   - Nút lớn "Bay vào vũ trụ 🚀" để bắt đầu hành trình.
2. **Hiệu ứng rời Trái Đất**
   - Camera zoom từ Trái Đất ra xa, thấy Trái Đất nhỏ dần giữa nền sao.
3. **Mô hình Hệ Mặt Trời**
   - Mặt Trời ở giữa, 8 hành tinh quay quanh quỹ đạo: Sao Thủy, Sao Kim, Trái Đất, Sao Hỏa, Sao Mộc, Sao Thổ, Sao Thiên Vương, Sao Hải Vương.
   - Có Mặt Trăng quay quanh Trái Đất; vành đai của Sao Thổ; (tuỳ chọn) Sao Diêm Vương như hành tinh lùn.
   - Nền vũ trụ nhiều sao lấp lánh.
4. **Khám phá từng hành tinh**
   - Bé chạm/bấm vào hành tinh → camera bay đến gần, hiện thẻ thông tin.
   - Có thể xoay, phóng to/thu nhỏ hành tinh bằng chuột hoặc ngón tay.
5. **Quay về Trái Đất** bất cứ lúc nào bằng nút "🏠 Về nhà".

## 4. Thông tin trên thẻ hành tinh
Ngắn gọn, dễ hiểu, chữ lớn, kèm biểu tượng:
- Tên hành tinh (tiếng Việt + tiếng Anh) và hình minh hoạ.
- Kích thước so với Trái Đất (hình so sánh).
- Khoảng cách tới Mặt Trời, một năm dài bao lâu, một ngày dài bao lâu.
- Nhiệt độ (nóng/lạnh), có vệ tinh hay không.
- 1–2 **điều thú vị** (vd: "Sao Mộc to đến mức chứa được hơn 1.000 Trái Đất!").
- (Tuỳ chọn) Nút 🔊 đọc to nội dung bằng giọng tiếng Việt.

## 5. Tính năng tương tác
- Điều khiển: kéo để xoay góc nhìn, cuộn/chụm hai ngón để zoom, bấm hành tinh để xem.
- Thanh menu đơn giản liệt kê các hành tinh theo thứ tự từ Mặt Trời.
- Công tắc **Tốc độ quay** (chậm / thường / nhanh) và **Hiện/ẩn quỹ đạo**.
- Chế độ **So sánh kích thước** các hành tinh.
- Âm nhạc nền nhẹ nhàng, có nút tắt/bật.
- (Tuỳ chọn) Đố vui nhỏ cuối mỗi hành tinh, thưởng sao ⭐ khi trả lời đúng.

## 6. Giao diện & phong cách
- Nền vũ trụ tối, màu hành tinh rực rỡ, thân thiện, hơi hoạt hình.
- Nút bấm to, bo tròn, dễ chạm; chữ lớn, phông chữ dễ đọc, hỗ trợ tiếng Việt có dấu.
- Ngôn ngữ vui tươi, câu ngắn; không nội dung đáng sợ.
- Responsive: hoạt động tốt từ điện thoại đến màn hình lớn.

## 7. Gợi ý kỹ thuật
- Một trang web tĩnh: HTML + CSS + JavaScript, **không cần backend**.
- Dựng 3D bằng **Three.js** (WebGL); texture hành tinh miễn phí (NASA / Solar System Scope) hoặc tạo bằng màu/shader nếu không có ảnh.
- Cảnh sao: hệ thống hạt (particles) hoặc skybox.
- Chạy offline được, tải nhanh; có phương án dự phòng 2D nếu thiết bị không hỗ trợ WebGL.

## 8. Cấu trúc thư mục đề xuất
```
THAI DUONG HE/
├── index.html
├── css/style.css
├── js/
│   ├── main.js        # dựng cảnh, camera, vòng lặp
│   ├── planets.js     # dữ liệu 8 hành tinh
│   └── ui.js          # thẻ thông tin, menu, nút
├── assets/
│   ├── textures/      # ảnh bề mặt hành tinh
│   └── audio/         # nhạc nền, giọng đọc
└── MO_TA_DU_AN.md
```

## 9. Tiêu chí hoàn thành
- [ ] Mở trang thấy bầu trời đêm nhìn từ Trái Đất.
- [ ] Bấm nút để "bay" ra ngoài vũ trụ.
- [ ] Thấy đủ 8 hành tinh quay quanh Mặt Trời cùng nền sao.
- [ ] Bấm vào từng hành tinh xem được thông tin dễ hiểu.
- [ ] Dùng tốt trên điện thoại, máy tính bảng và máy tính.
- [ ] Giao diện thân thiện, bé tự thao tác được.

## 10. Hướng mở rộng
Thêm Mặt Trăng và các vệ tinh lớn, sao chổi, vành đai tiểu hành tinh, các chòm sao, chế độ ngày/đêm trên Trái Đất, đa ngôn ngữ (Việt/Anh).
