# Schoolity
https://github.com/futureskyprojects/Schoolity
<br/>
Check git work!
<br/>
* Ngày 30/11/2018:
1. Sửa nút cancel của search box không có tác dụng
2. Lấy thông tin, chuyển json khi nhấn nút "Tìm kiếm"
<img src="log/SearchX.PNG"/><br/>
---------------------------------------------


<br/>
* Sáng ngày 28/11/2018:
1. Tìm cách giảm file json phuongxa thông qua nhiều cách, thu được:
<img src="log/phuongXaMoi.PNG"/>
<i> Các file giảm hơn 1 nửa - 3 file tương ứng với 3 cách sử dụng... (Không phải chia làm 3) </i>

- Để sử dụng và kiểm thử, lần lượt chú thích và bỏ các hàm có chú thích bắt đầu bằng "REDUCE:"
- Hàm <i>analytics</i> dùng để phân tích và tạo json mới. Tiến hành bỏ chú thích ở hàm và phần gọi <i>analytics(data,"xaphuong",100);</i> để chạy thử.
<img src="log/analytics.PNG"/>
<img src="log/reduce.PNG"/><br/>
--------------------------------------------
<br/>
* Ngày 27/11/2018:
<br/>
1. Thêm modul chọn địa điểm, bao gồm các file mới như:
<br/>
.../json/xaphuong.json<br/>
.../json/tinhthanh.json<br/>
.../json/quanhuyen.json<br/>
.../user/diadiem.html (Demo tại đây!)<br/>
2. Thêm mới một số dòng js trong file .../user/js/user.js
<br/>
---------------------------------------------
<br/>
* Ngày 24/11/2018
<br/>
A. Fix các vấn đề như sau:<br/>
1. Không disable nút "Xóa" khi chọn bỏ chọn một checkbox bất kỳ (tức khi số lượng checked = 0), chỉ được khi đã nhấn chọn tất cả.<br/>
2. Thêm phần alert(id) danh sách các item được checked, các item nhấn view||edit<br/>
3. Thêm auto check vào checkedAll khi tất cả các checkbox được chọn hết.<br/>
4. Auto bỏ checkedAll khi không phải tất cả các check box được nhấn.<br/>
5. Và một số tùy chỉnh khác<br/>
<br/>
B. File user.js trong folder user<br/>
$scope.catchID = function($mHS) {<br/>
      alert($mHS);<br/>
    } // Sự kiện bắt ID lúc sửa & xem tại đây<br/>
C. File schoolity_truong.js trong folder js lớn<br/>
Sự kiện bắt id tại các dòng có "alert(idCheckList);"<br/>
<br/>
<br/>
<br/>
