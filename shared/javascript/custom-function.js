// Phone Number Custom Format
SchoolityApp.filter('phonenumber', function () {
    return function (number) {
        var numberString = String(number).replace(/\D/g, '');
        var length = numberString.length;
        // mobile: xxxx xxx xxx
        if (length == 10) {
            return numberString = (numberString.substring(0, 4) + " " + numberString.substring(4, 7) + " " + numberString.substring(7, 10));
        }
        // landline: xxxxx xxx xxx
        if (length == 11 && numberString.substring(0, 1) == 0) {
            return numberString = (numberString.substring(0, 4) + "(" + numberString.substring(4, 5) + ") " + numberString.substring(5, 8) + " " + numberString.substring(8, 11));
        }
        // mobile + country code: +xx xxx xxx xxx
        if (length == 11 && numberString.substring(0, 1) !== 0) {
            return numberString = ('(+' + numberString.substring(0, 2) + ')' + " " + numberString.substring(2, 5) + " " + numberString.substring(5, 8) + " " + numberString.substring(8, 11));
        }
        // landlind + country code: +xx xxxx xxx xxx
        if (length == 12 && numberString.substring(0, 1) !== 0) {
            return numberString = ('(+' + numberString.substring(0, 2) + ')' + " " + numberString.substring(2, 6) + " " + numberString.substring(6, 9) + " " + numberString.substring(9, 12));
        }
        else {
            return numberString = "Số ĐT không đúng"
        }
    }
});
// Sinh mã cán bộ
function maCanBo(viTriLamViec, id) {
    var maCanBo = "";
    switch (viTriLamViec.tenViTri) {
        case "Cán bộ quản lý":
            viTri = "QL"; break;
        case "Giáo viên":
            viTri = "GV"; break;
        case "Nhân viên":
            viTri = "NV"; break;
        default: viTri = "00";
    }
    //Xu ly id
    STT = id.toString();
    lenNum = 4;
    lenZero = lenNum - STT.length;
    for (i = 0; i < lenZero; i++) {
        STT = "0" + STT;
    }
    maCanBo = viTri + STT;
    return maCanBo;
}
// Create array
function newArray(number, value) {
    var a = new Array(number);
    for (var i = 0; i < a.length; i++) { a[i] = value; } return a;
}
// Print
function myPrint() {
    window.print();
}