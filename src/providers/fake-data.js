class FakeDataVietnamese {
    constructor() {}
    generateName() {
        let lastname = [
            "Nguyễn",
            "Trần",
            "Lê",
            "Phạm",
            "Hoàng",
            "Huỳnh",
            "Vũ",
            "Võ",
            "Phan",
            "Trương",
            "Bùi",
            "Đặng",
            "Đỗ",
            "Ngô",
            "Hồ",
            "Dương",
            "Đinh",
            "Lý",
            "Ái",
            "An",
            "Anh",
            "Ao",
            "Ánh",
            "Ân",
            "Âu",
            "Âu Dương",
            "Ấu",
            "Bá",
            "Bạc",
            "Bạch",
            "Bàn",
            "Bàng",
            "Bành",
            "Bảo",
            "Bế",
            "Bì",
            "Biện",
            "Bình",
            "Bồ",
            "Chriêng",
            "Ca",
            "Cà",
            "Cái",
            "Cai",
            "Cam",
            "Cảnh",
            "Cao",
            "Cáp",
            "Cát",
            "Cầm",
            "Cấn",
            "Chế",
            "Chiêm",
            "Chu",
            "Châu",
            "Chắng",
            "Chung",
            "Chúng",
            "Chương",
            "Chử",
            "Cồ",
            "Cổ",
            "Công",
            "Cống",
            "Cung",
            "Cù",
            "Cự",
            "Dã",
            "Danh",
            "Diêm",
            "Diệp",
            "Doãn",
            "Du",
            "Duy",
            "Dư",
            "Đái",
            "Đan",
            "Đàm",
            "Đào",
            "Đăng",
            "Đắc",
            "Đầu",
            "Đậu",
            "Đèo",
            "Điêu",
            "Điền",
            "Điều",
            "Đinh",
            "Đình",
            "Đoái",
            "Đoàn",
            "Đoạn",
            "Đôn",
            "Đống",
            "Đồ",
            "Đồng",
            "Đổng",
            "Đới",
            "Đương",
            "Đường",
            "Đức",
            "Giả",
            "Giao",
            "Giang",
            "Giàng",
            "Giản",
            "Giảng",
            "Giáp",
            "Hưng",
            "H'",
            "H'ma",
            "H'nia",
            "Hầu",
            "Hà",
            "Hạ",
            "Hàn",
            "Hàng",
            "Hán",
            "Hề",
            "Hi",
            "Hình",
            "Hoa",
            "Hoà",
            "Hoài",
            "Hoàng Phủ",
            "Hồng",
            "Hùng",
            "Hứa",
            "Hướng",
            "Kinh",
            "Kông",
            "Kiểu",
            "Kha",
            "Khà",
            "Khai",
            "Khâu",
            "Khiếu",
            "Khoa",
            "Khổng",
            "Khu",
            "Khuất",
            "Khúc",
            "Khương",
            "Khưu",
            "Kiều",
            "Kim",
            "Ly",
            "Lý",
            "La",
            "Lã",
            "Lữ",
            "Lành",
            "Lãnh",
            "Lạc",
            "Lại",
            "Lăng",
            "Lâm",
            "Lầu",
            "Lèng",
            "Lều",
            "Liên",
            "Liệp",
            "Liêu",
            "Liễu",
            "Linh",
            "Loan",
            "Lò",
            "Lô",
            "Lỗ",
            "Lộ",
            "Lộc",
            "Luyện",
            "Lục",
            "Lù",
            "Lư",
            "Lương",
            "Lường",
            "Lưu",
            "Ma",
            "Mai",
            "Mang",
            "Mã",
            "Mạc",
            "Mạch",
            "Mạnh",
            "Mâu",
            "Mầu",
            "Mẫn",
            "Minh",
            "Mộc",
            "Mông",
            "Mùa",
            "Mục",
            "Miêu",
            "Niê",
            "Ngạc",
            "Ngân",
            "Nghiêm",
            "Nghị",
            "Ngọ",
            "Ngọc",
            "Ngôn",
            "Ngũ",
            "Ngụy",
            "Nhan",
            "Nhâm",
            "Nhữ",
            "Ninh",
            "Nông",
            "Ong",
            "Ông",
            "Phi",
            "Phí",
            "Phó",
            "Phong",
            "Phù",
            "Phú",
            "Phùng",
            "Phương",
            "Quản",
            "Quán",
            "Quang",
            "Quàng",
            "Quảng",
            "Quách",
            "Quế",
            "Quốc",
            "Quyền",
            "Sái",
            "Sâm",
            "Sầm",
            "Sơn",
            "Sử",
            "Sùng",
            "Sỳ",
            "Tán",
            "Tào",
            "Tạ",
            "Tăng",
            "Tấn",
            "Tất",
            "Tề",
            "Thang",
            "Thanh",
            "Thái",
            "Thành",
            "Thào",
            "Thạch",
            "Thân",
            "Thẩm",
            "Thập",
            "Thế",
            "Thi",
            "Thiều",
            "Thiệu",
            "Thịnh",
            "Thiềm",
            "Thoa",
            "Thôi",
            "Thóng",
            "Thục",
            "Tiêu",
            "Tiết",
            "Tiếp",
            "Tinh",
            "Tòng",
            "Tô",
            "Tôn",
            "Tôn Nữ",
            "Tôn Thất",
            "Tông",
            "Tống",
            "Trang",
            "Tráng",
            "Trác",
            "Trà",
            "Trâu",
            "Tri",
            "Trì",
            "Triệu",
            "Trình",
            "Trịnh",
            "Trung",
            "Trưng",
            "Tuấn",
            "Từ",
            "Tưởng",
            "Tướng",
            "Ty",
            "Uông",
            "Ung",
            "Ưng",
            "Ứng",
            "Vàng",
            "Vâng",
            "Vạn",
            "Văn",
            "Vi",
            "Vĩnh",
            "Viêm",
            "Viên",
            "Việt",
            "Vòng",
            "Vừ",
            "Vương",
            "Vưu",
            "Vu",
            "Xa",
            "Xung",
            "Y",
            "Yên",
        ];

        let middlename = ["An", "Thị", "Văn", "Anh", "Minh", "Hoàng", "Hoàng"];

        let firstname = [
            "Huy",
            "Khang",
            "Bảo",
            "Minh",
            "Phúc",
            "Anh",
            "Khoa",
            "Phát",
            "Đạt",
            "Khôi",
            "Long",
            "Nam",
            "Duy",
            "Quân",
            "Kiệt",
            "Thịnh",
            "Tuấn",
            "Hưng",
            "Hoàng",
            "Hiếu",
            "Nhân",
            "Trí",
            "Tài",
            "Phong",
            "Nguyên",
            "An",
            "Phú",
            "Thành",
            "Đức",
            "Dũng",
            "Lộc",
            "Khánh",
            "Vinh",
            "Tiến",
            "Nghĩa",
            "Thiện",
            "Hào",
            "Hải",
            "Đăng",
            "Quang",
            "Lâm",
            "Nhật",
            "Trung",
            "Thắng",
            "Tú",
            "Hùng",
            "Tâm",
            "Sang",
            "Sơn",
            "Thái",
            "Cường",
            "Vũ",
            "Toàn",
            "Ân",
            "Thuận",
            "Bình",
            "Trường",
            "Danh",
            "Kiên",
            "Phước",
            "Thiên",
            "Tân",
            "Việt",
            "Khải",
            "Tín",
            "Dương",
            "Tùng",
            "Quý",
            "Hậu",
            "Trọng",
            "Triết",
            "Luân",
            "Phương",
            "Quốc",
            "Thông",
            "Khiêm",
            "Hòa",
            "Thanh",
            "Tường",
            "Kha",
            "Vỹ",
            "Bách",
            "Khanh",
            "Mạnh",
            "Lợi",
            "Đại",
            "Hiệp",
            "Đông",
            "Nhựt",
            "Giang",
            "Kỳ",
            "Phi",
            "Tấn",
            "Văn",
            "Vương",
            "Công",
            "Hiển",
            "Linh",
            "Ngọc",
            "Vĩ",
        ];

        let numberOfElementName = Math.floor(Math.random() * 3) + 2;
        let indexLastname = Math.floor(Math.random() * lastname.length - 1);
        let indexSecondLastname = Math.floor(Math.random() * lastname.length - 1);
        let indexMiddlename = Math.floor(Math.random() * middlename.length - 1);
        let indexFirstname = Math.floor(Math.random() * firstname.length - 1);

        let name = [];
        if (numberOfElementName == 4) {
            name = [
                lastname[indexLastname],
                lastname[indexSecondLastname],
                middlename[indexMiddlename],
                firstname[indexFirstname],
            ];
        } else if (numberOfElementName == 3) {
            name = [
                lastname[indexLastname],
                middlename[indexMiddlename],
                firstname[indexFirstname],
            ];
        } else {
            name = [lastname[indexLastname], firstname[indexFirstname]];
        }

        return name.join(" ").replace(/ + /g, " ");
    }

    removeVietnameseTones(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
        str = str.replace(/ + /g, " ");
        str = str.trim();
        str = str.replace(
            /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
            " "
        );
        return str;
    }

    generateEmail(name, birthday) {
        let nameList = name.split(" ");
        let date = new Date(birthday);
        nameList.forEach((element, index) => {
            if (index != nameList.length - 1) {
                nameList[index] = element.toLowerCase().charAt(0);
            } else {
                nameList[index] = this.removeVietnameseTones(element.toLowerCase());
            }
        });
        nameList.push(date.getDate(), date.getMonth() + 1, date.getFullYear());
        nameList.push(".", "dttutorcenter", "@", "gmail", ".", "com", ".", "vn");
        return nameList.join("");
    }

    generateBirthday() {
        let curDate = new Date();
        let curYear = curDate.getFullYear();
        let minDate = new Date(curYear - 18, 1, 1);
        let maxDate = new Date(curYear - 65, 12, 31);
        return new Date(Math.floor(Math.random() * maxDate.getTime()) + minDate.getTime());
    }

    generateUsername(name, birthday) {
        let nameList = name.split(" ");
        let date = new Date(birthday);
        nameList.forEach((element, index) => {
            if (index != nameList.length - 1) {
                nameList[index] = element.toLowerCase().charAt(0);
            } else {
                nameList[index] = this.removeVietnameseTones(element.toLowerCase());
            }
        });
        nameList.push(date.getDate(), date.getMonth() + 1, date.getFullYear());
        // return date.getFullYear();
        return nameList.join("");
    }

    generateGender(name) {
        let nameTmp = this.removeVietnameseTones(name.toLowerCase());
        if (nameTmp.lastIndexOf("thi ") != -1) {
            return "Nữ";
        } else if (nameTmp.lastIndexOf("van ") != -1) {
            return "Nam";
        } else {
            return Math.floor(Math.random() * 1) == 1 ? "Nam" : "Nữ";
        }
    }

    generatePassword() {
        const RandExp = require("randexp");
        return new RandExp(/([\w@$!%*?&]{6-16})\b/).gen();
        return "123123123";
    }

    generateAddress() {
        const fs = require("fs");
        const path = require("path");

        let rawDataCities = fs.readFileSync(
            path.join(__dirname, "..", "public", "addresses", "cities.json")
        );
        let cities = JSON.parse(rawDataCities);
        let listKeyCity = Object.keys(cities);
        let indexCity = Math.floor(Math.random() * (listKeyCity.length - 1));
        let city = cities[listKeyCity[indexCity]];

        let rawDataDistrict = fs.readFileSync(
            path.join(__dirname, "..", "public", "addresses", "districts", city.code + ".json")
        );
        let districts = JSON.parse(rawDataDistrict);
        let listKeyDistrict = Object.keys(districts);
        let indexDistrict = Math.floor(Math.random() * (listKeyDistrict.length - 1));
        let district = districts[listKeyDistrict[indexDistrict]];

        let rawDataDWard = fs.readFileSync(
            path.join(__dirname, "..", "public", "addresses", "wards", district.code + ".json")
        );
        let wards = JSON.parse(rawDataDWard);
        let listKeyWard = Object.keys(wards);
        let indexWard = Math.floor(Math.random() * (listKeyWard.length - 1));
        let ward = wards[listKeyWard[indexWard]];
        let address = {
            city: city,
            district: district,
            ward: ward,
        };
        return address;
    }

    generateGraduateYear(birthday) {
        return new Date(birthday).getFullYear() + 22;
    }

    generatePhoneNumber() {
        const RandExp = require("randexp");
        return new RandExp(/(03|05|07|08|09|01)([23689])([0-9]{7})\b/).gen();
    }
}
module.exports = { FakeDataVietnamese };
