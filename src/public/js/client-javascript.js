String.prototype.splice = function (idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};
Array.prototype.remove = function (index) {
    this.splice(index, 1);
};
function jsonEncode(object) {
    return JSON.stringify(object);
}
function jsonDecode(jsonString) {
    return JSON.parse(jsonString);
}
function setCookie(name, value, days = 30) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
function formatPhone(phone) {
    phone = phone.replace(/[^\d]/g, "");

    if (phone.length <= 10 && phone.length > 6) {
        phone = phone.splice(6, 0, " ");
        phone = phone.splice(3, 0, " ");
    } else if (phone.length <= 6 && phone.length > 3) {
        phone = phone.splice(3, 0, " ");
    }
    return phone;
}
function formatPrice(price) {
    price = price.replace(/[^\d]/g, "");
    return price.length > 0
        ? new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)
        : "";
}

function keyUpAndFormatPrice($event,element) {
    let value = parseInt(element.value.replace(/[^\d]/g, ""));
    let step = parseInt(element.getAttribute('data-step'));
    if ($event.isComposing || $event.keyCode === 38) {
        value += step;
    } else if ($event.isComposing || $event.keyCode === 40){
        value -= step;
    }
    let valueString = value.toString();
    element.value = formatPrice(valueString);
    return true;
}

function checkAndFormatPrice($event,element) {
    let value = parseInt(element.value.replace(/[^\d]/g, ""));
    let min = parseInt(element.getAttribute('data-min-value'));
    let max = parseInt(element.getAttribute('data-max-value'));
    value = value < min ? min : value > max ? max : value;
    let valueString = value.toString();
    element.value = formatPrice(valueString);
    return true;
}

function checkMinMax(price, min, max) {
    min = min.toString().replace(/[^\d]/g, "");
    min = parseInt(min);
    max = max.toString().replace(/[^\d]/g, "");
    max = parseInt(max);
    price = price.replace(/[^\d]/g, "");
    price = parseInt(price);
    price = price < min ? min : price > max ? max : price;
    return price.toString();
}
function setValue(inputElement, newValue) {
    inputElement.value = newValue;
}
function getCities() {
    var xhttp = new XMLHttpRequest();
    xhttp.responseType = "json";
    xhttp.onload = function (e) {
        const selectCityElement = document.getElementById("city");
        var newContent = '<option value="">Tỉnh/Thành phố</option>';
        if (this.readyState == 4 && this.status == 200) {
            for (var i in this.response) {
                newContent += "<option value='";
                newContent += JSON.stringify(this.response[i]);
                newContent += "' data-value='";
                newContent += JSON.stringify(this.response[i]);
                newContent += "'>";
                newContent += this.response[i].name_with_type;
                newContent += "</option>";
            }
        }
        selectCityElement.innerHTML = newContent;
    };
    xhttp.open("GET", "/addresses/cities.json");
    xhttp.send();
}
function getDictrict() {
    let selectCityElement = document.getElementById("city");
    if (selectCityElement.value != "") {
        let valueOfCityElement =
            selectCityElement[selectCityElement.selectedIndex].getAttribute("data-value");
        let citySelected = JSON.parse(valueOfCityElement);
        var xhttp = new XMLHttpRequest();
        xhttp.responseType = "json";
        xhttp.onload = function (e) {
            let selectDistrictElement = document.getElementById("district");
            var newContent = '<option value="">Quận/Huyện</option>';
            if (this.readyState == 4 && this.status == 200) {
                for (var i in this.response) {
                    newContent += "<option value='";
                    newContent += JSON.stringify(this.response[i]);
                    newContent += "' data-value='";
                    newContent += JSON.stringify(this.response[i]);
                    newContent += "'>";
                    newContent += this.response[i].name_with_type;
                    newContent += "</option>";
                }
            }
            selectDistrictElement.innerHTML = newContent;
        };
        xhttp.open("GET", "/addresses/districts/" + citySelected.code + ".json");
        xhttp.send();
    } else {
        let selectDistrictElement = document.getElementById("district");
        var newContent = '<option value="">Quận/Huyện</option>';
        selectDistrictElement.innerHTML = newContent;
    }
}
function getWard() {
    let selectDistrictElement = document.getElementById("district");
    if (selectDistrictElement.value != "") {
        let valueOfDistrictElement =
            selectDistrictElement[selectDistrictElement.selectedIndex].getAttribute("data-value");
        let districtSelected = JSON.parse(valueOfDistrictElement);
        var xhttp = new XMLHttpRequest();
        xhttp.responseType = "json";
        xhttp.onload = function (e) {
            let selectWardElement = document.getElementById("ward");
            var newContent = '<option value="">Xã/Phường/Thị trấn</option>';
            if (this.readyState == 4 && this.status == 200) {
                for (var i in this.response) {
                    newContent += "<option value='";
                    newContent += JSON.stringify(this.response[i]);
                    newContent += "' data-value='";
                    newContent += JSON.stringify(this.response[i]);
                    newContent += "'>";
                    newContent += this.response[i].name_with_type;
                    newContent += "</option>";
                }
            }
            selectWardElement.innerHTML = newContent;
        };
        xhttp.open("GET", "/addresses/wards/" + districtSelected.code + ".json");
        xhttp.send();
    } else {
        let selectWardElement = document.getElementById("ward");
        var newContent = '<option value="">Xã/Phường/Thị trấn</option>';
        selectWardElement.innerHTML = newContent;
    }
}
function checkNumberOfChip($event, element, dayPerWeeks) {
    let dpw = JSON.parse(dayPerWeeks);
    let listChip = document.querySelectorAll(".chip-box");
    if (
        listChip.length >
        parseInt(
            element.value != ""
                ? element.selectedOptions[0].text.replaceAll(" buổi /tuần", "")
                : "0"
        )
    ) {
        alert("Số buổi học không thể ít hơn lịch học!");
        element.value =
            listChip.length == 1
                ? JSON.stringify(dpw[0])
                : JSON.stringify(dpw[listChip.length - 2]);
    }
}
function generateChip() {
    let session = document.getElementById("schedule-detail-session");
    let day = document.getElementById("schedule-detail-day");
    let dayPerWeek = document.getElementById("dayPerWeek");
    if (session.value != "" && day.value != "" && dayPerWeek.value != "") {
        var xhttp = new XMLHttpRequest();
        xhttp.responseType = "json";
        xhttp.onload = function (e) {
            if (this.readyState == 4 && this.status == 200) {
                let dataResponse = this.response;
                let textChip = dataResponse.schedule;
                let listChip = document.querySelectorAll(".chip-box");
                let chip =
                    '<div class="col-2 chip-box"><div class="rounded-pill bg-primary shadow text-white px-2" title="Nhấn để xoá" role="button" onclick="removeChip(this)">' +
                    textChip +
                    '</div><input type="checkbox" value=\'' +
                    dataResponse._id +
                    '\' name="schedules[]" hidden checked="checked"></div>';

                if (
                    listChip.length <
                        parseInt(
                            dayPerWeek.selectedOptions[0].text.replaceAll(" buổi /tuần", "")
                        ) &&
                    inChip(listChip, textChip)
                ) {
                    document.querySelector(".chip-container").innerHTML += chip;
                } else {
                    if (!inChip(listChip, textChip)) alert("Buổi học đã được chọn!");
                    if (
                        listChip.length >=
                        parseInt(dayPerWeek.selectedOptions[0].text.replaceAll(" buổi /tuần", ""))
                    )
                        alert("Đã đủ số buổi học!");
                }
            }
        };
        xhttp.open(
            "GET",
            "/api/schedule?daySessionId=" + session.value + "&dayWeekId=" + day.value
        );
        xhttp.send();
    }
}
function inChip(listChip, textChip) {
    let count = 0;
    listChip.forEach(element => {
        if (element.firstChild.innerText == textChip) {
            count++;
        }
    });
    return count == 0;
}
function removeChip(elementChip) {
    elementChip.parentNode.remove();
}
async function setDataFileData(elementId, element, sessionName) {
    if (element.files.length > 0) {
        let file = element.files[0];
        document.querySelector("#" + elementId + "-message-success").innerText = file.name;
        document.querySelector("#" + elementId + "-message-error").innerText = "";
    } else {
        document.querySelector("#" + elementId + "-message-error").innerText =
            sessionName + " không thể để trống";
        document.querySelector("#" + elementId + "-message-success").innerText = "";
    }
}
async function setDataFilesData(elementId, element, sessionName, limit) {
    if (element.files.length > 0) {
        var length = element.files.length >= limit ? limit : element.files.length;
        var fileName = "";
        for (let index = 0; index < length; index++) {
            let file = element.files[index];
            fileName += file.name + "\n";
        }
        document.querySelector("#" + elementId + "-message-success").innerText = fileName;
        document.querySelector("#" + elementId + "-message-error").innerText = "";
    } else {
        document.querySelector("#" + elementId + "-message-error").innerText =
            sessionName + " không thể để trống";
        document.querySelector("#" + elementId + "-message-success").innerText = "";
    }
}

function importCSS() {
    var xhttp = new XMLHttpRequest();
    xhttp.responseType = "json";
    xhttp.onload = function (e) {
        if (this.readyState == 4 && this.status == 200) {
            for (var i in this.response) {
                let file = this.response[i];
                let tmp = '<link rel="stylesheet" href="/css/' + file + '">';
                document.getElementsByTagName("head")[0].innerHTML += tmp;
            }
        }
    };
    xhttp.open("GET", "/api/inmport-css");
    xhttp.send();
}

function checkStart(star,id){
    let color = "";
        if(star >= 4){
            color= "color-yellow";
        } else if(star == 3){
            color= "color-orange";
        } else {
            color= "color-red";
        }
    for(let i = 1 ; i <= star; i++){
        let icon  = document.querySelector("#star"+i.toString()+id);
        let input  = document.querySelector("#star"+i.toString()+"Check"+id);
        icon.className = "fas fa-star "+ color;
        input.checked = true;
    }
    
    for(let i = star+1 ; i <= 5; i++){
        let icon  = document.querySelector("#star"+i.toString()+id);
        let input  = document.querySelector("#star"+i.toString()+"Check"+id);
        icon.className = "far fa-star";
        input.checked = false;
    }
    document.querySelector("#btnSubmit"+id).disabled=false;
}

function getUserInfo() {
    let controlArray = [];
    controlArray.push([
        {
            name: "Đăng nhập",
            link: "/auth/login",
        },
        {
            name: "Đăng ký",
            link: "/auth/sign-up",
        },
    ]);
    controlArray.push([
        {
            name: "Cập nhật thông tin",
            link: "#updateInfoDialog",
        },
        {
            name: "Các lớp đã đăng ký",
            link: "/user/my-class",
        },
        {
            name: "Thay đổi mật khẩu",
            link: "#changePasswordDialog",
        },
        {
            name: "Đăng xuất",
            link: "/auth/logout",
        },
    ]);
    controlArray.push([
        {
            name: "Cập nhật thông tin",
            link: "#updateInfoDialog",
        },
        {
            name: "Các lớp đã nhận",
            link: "/user/my-class-received",
        },
        {
            name: "Các lớp đã đăng ký",
            link: "/user/my-class",
        },
        {
            name: "Cập nhật thông tin gia sư",
            link: "/user/update-tutor-infomation",
        },
        {
            name: "Thay đổi mật khẩu",
            link: "#changePasswordDialog",
        },
        {
            name: "Đăng xuất",
            link: "/auth/logout",
        },
    ]);
    controlArray.push([
        {
            name: "Cập nhật thông tin",
            link: "#updateInfoDialog",
        },
        {
            name: "Thay đổi mật khẩu",
            link: "#changePasswordDialog",
        },
        {
            name: "Đăng xuất",
            link: "/auth/logout",
        },
    ]);
    let content =
        '<li class="d-flex justify-content-center "><img id="avartar" class="rounded-circle m-5 shadow-lg" width="150" height="150" src="/images/logo.png" alt="Avatar"></li>';
    content +=
        '<li class="text-center"><b>{{user_name}}</b></li><li><hr class="dropdown-divider"></li>';

    var xhttp = new XMLHttpRequest();
    xhttp.responseType = "json";
    let menu = null;
    let user_name = "";
    xhttp.onload = function (e) {
        if (this.readyState == 4 && this.status == 200) {
            if (this.response != null) {
                let user = this.response;
                if (user.isAdmin) {
                    menu = controlArray[3];
                } else if (user.isTutor) {
                    menu = controlArray[2];
                } else {
                    menu = controlArray[1];
                }
                if(document.querySelector('#usernameUptInfo')){
                    document.querySelector('#usernameUptInfo').innerText = user.username;
                }
                if(document.querySelector('#nameUptInfo')){
                    document.querySelector('#nameUptInfo').value = user.name;
                }
                if(document.querySelector('#emailUptInfo')){
                    document.querySelector('#emailUptInfo').value = user.email;
                }
                user_name = user.name.toLocaleUpperCase();
            } else {
                menu = controlArray[0];
            }
        } else {
            menu = controlArray[0];
        }
        for (let menuControl of menu) {
            let liTag =
                '<li><a class="dropdown-item" '+
                (menuControl.link.indexOf("#") != -1 ? 'data-bs-toggle="modal"' : '') +
                ' href="' +
                menuControl.link +
                '">' +
                menuControl.name +
                "</a></li>";
            content += liTag;
        }
        let userControl = document.querySelector("#user-control");
        if (userControl) {
            content = content.replace("{{user_name}}", user_name);
            userControl.innerHTML = content;
        }
        
    };
    xhttp.open("GET", "/api/user/user-info");
    xhttp.send();
}

function choiseTutor(tutorId) {
    let data = [];
    if (getCookie("listChosenTutors") != null) {
        data = JSON.parse(getCookie("listChosenTutors"));
    }
    if (data.length < 3) {
        if (data.indexOf(tutorId) > -1) {
            alert("Gia sư này đã được chọn trước đó!");
        } else {
            data.push(tutorId);
            setCookie("listChosenTutors", JSON.stringify(data));
            alert("Gia sư này đã được chọn!");
        }
    } else {
        alert("Chỉ được chọn tối đa 3 gia sư!");
    }
}

function removeChosenTutor(tutorId) {
    let data = [];
    if (getCookie("listChosenTutors") != null) {
        data = JSON.parse(getCookie("listChosenTutors"));
    } else {
        alert("Gia sư này không có trong danh sách để xoá!");
        return;
    }
    if (data.indexOf(tutorId) > -1) {
        data.remove(data.indexOf(tutorId));
        setCookie("listChosenTutors", JSON.stringify(data));
        getListChosen();
        alert("Gia sư này đã được xoá!");
        return;
    } else {
        alert("Gia sư này không có trong danh sách để xoá!");
    }
}

function getListChosen() {
    let data = [];
    if (getCookie("listChosenTutors") != null) {
        data = JSON.parse(getCookie("listChosenTutors"));
        if (data.length > 0) {
            var xhttp = new XMLHttpRequest();
            xhttp.responseType = "json";
            xhttp.onload = function (e) {
                if (this.readyState == 4 && this.status == 200) {
                    let content = "";
                    for (var item of this.response) {
                        content +=
                            '<div class="col-4 p-0 mt-4 d-flex justify-content-center" style="cursor: pointer;" onclick="removeChosenTutor(\'' +
                            item._id +
                            "')\">";
                        content +=
                            '<div class="d-flex flex-column text-start border border-1 rounded px-1" style="width:95%">';
                        content += '<div class="d-flex align-items-center">';
                        content += '<img src="' + item.avartar + '"';
                        content += 'alt="' + item.name + '" width="120" height="160">';
                        content += '<div class="d-flex flex-column flex-grow-1 ms-1">';
                        content +=
                            "<span>Tài khoản: <strong>" + item.tutor.username + "</strong></span>";
                        content += "<span>Gia sư: <strong>" + item.name + "</strong></span>";
                        content +=
                            "<span>Năm sinh: <span>" +
                            new Date(item.birthday).toLocaleDateString() +
                            "</span></span>";
                        content +=
                            "<span>Hiện là: <span>" +
                            item.tutorQualification.level +
                            "</span></span>";
                        content += "</span>";
                        content +=
                            "<span>Các chứng chỉ liên quan: <span>" +
                            item.anotherCertification +
                            "</span></span>";
                        content += "</div>";
                        content += "</div>";
                        content += "<span>";
                        content += "<strong>Hình thức nhận dạy: </strong>";
                        item.teachingForms.forEach((teachingForm, index) => {
                            if (index != 0) {
                                content += ", ";
                            }
                            content += teachingForm.teachingForm;
                        });
                        content += "</span>";
                        content += "<span>";
                        content += "<strong>Nhận dạy: </strong>";
                        item.classes.forEach((classA, index) => {
                            if (index != 0) {
                                content += ", ";
                            }
                            content += classA.className;
                        });
                        content += "</span>";
                        content += "<span>";
                        content += "<strong>Các môn: </strong>";
                        item.subjects.forEach((subject, index) => {
                            if (index != 0) {
                                content += ", ";
                            }
                            content += subject.subject;
                        });
                        content += "</span>";
                        content += "<span>";
                        content += "<strong>Khu vực:</strong>";

                        content += item.address.ward.path;
                        content += "</span>";
                        content += "<span>";
                        content += "<strong>Thông tin khác:</strong>&nbsp;";
                        content += item.description;
                        content += "</span>";
                        content += "</div>";
                        content += "</div>";
                    }
                    document.getElementById("listChosenTutor").innerHTML = content;
                }
            };
            xhttp.open("POST", "/api/tutor/get-chosen-list");
            xhttp.send();
        } else {
            let content =
                '<div class="col text-start">' +
                '<div class="text-danger">Danh sách đang trống</div>' +
                "</div>";
            document.getElementById("listChosenTutor").innerHTML = content;
            return;
        }
    } else {
        let content =
            '<div class="col text-start">' +
            '<div class="text-danger">Danh sách đang trống</div>' +
            "</div>";
        document.getElementById("listChosenTutor").innerHTML = content;
        return;
    }
}
function getPostList() {
    var xhttp = new XMLHttpRequest();
    xhttp.responseType = "json";
    xhttp.onload = function (e) {
        if (this.readyState == 4 && this.status == 200) {
            let content = "";
            for (var item of this.response) {
                content += '<a href="/post/';
                content += item._id;
                content += '"  title="';
                content += item.title;
                content += '"><li class="list-group-item text-truncate">';
                content += item.title;
                content += "</li></a>";
            }
            document.getElementById("postList").innerHTML = content;
        } else {
            let content = '<li class="list-group-item"><i>Không có bản tin nào ở đây</i></li>';
            document.getElementById("postList").innerHTML = content;
            return;
        }
    };
    xhttp.open("GET", "/api/post");
    xhttp.send();
}
function getSubjectList() {
    var xhttp = new XMLHttpRequest();
    xhttp.responseType = "json";
    xhttp.onload = function (e) {
        if (this.readyState == 4 && this.status == 200) {
            let content = "";
            for (var item of this.response) {
                content += '<a href="/subject/';
                content += item._id;
                content += '"  title="';
                content += item.subject;
                content += '"><li class="list-group-item text-truncate">Môn ';
                content += item.subject;
                content += "</li></a>";
            }
            content +=
                '<li class="list-group-item text-truncate text-center" role="button" onclick="getAllSubject()">Xem thêm</li>';
            document.getElementById("subjectList").innerHTML = content;
        } else {
            let content = '<li class="list-group-item"><i>Không có lớp nào ở đây</i></li>';
            document.getElementById("subjectList").innerHTML = content;
            return;
        }
    };
    xhttp.open("GET", "/api/subject");
    xhttp.send();
}
function getAllSubject() {
    var xhttp = new XMLHttpRequest();
    xhttp.responseType = "json";
    xhttp.onload = function (e) {
        if (this.readyState == 4 && this.status == 200) {
            let content = "";
            for (var item of this.response) {
                content += '<a href="/subject/';
                content += item._id;
                content += '"  title="';
                content += item.subject;
                content += '"><li class="list-group-item text-truncate">Môn ';
                content += item.subject;
                content += "</li></a>";
            }
            content +=
                '<li class="list-group-item text-truncate text-center" role="button" onclick="getSubjectList()">Ẩn bớt</li>';
            document.getElementById("subjectList").innerHTML = content;
        } else {
            let content = '<li class="list-group-item"><i>Không có lớp nào ở đây</i></li>';
            document.getElementById("subjectList").innerHTML = content;
            return;
        }
    };
    xhttp.open("GET", "/api/subject/all");
    xhttp.send();
}
function getListAvartarTutor() {
    var xhttp = new XMLHttpRequest();
    xhttp.responseType = "json";
    xhttp.onload = function (e) {
        if (this.readyState == 4 && this.status == 200) {
            let content = "";
            let index = 0;
            for (var item of this.response) {
                content += '<div class="carousel-item ' + (index == 0 ? "active" : "") + '">';
                content += '<img src="' + item + '"';
                content += 'class="d-block w-100" alt="...">';
                content += "</div>";
                index++;
            }
            document.getElementById("listAvartarTutor").innerHTML = content;
        }
    };
    xhttp.open("POST", "/api/tutor/get-avartar-list");
    xhttp.send();
}

function searchTutor(value) {
    var xhttp = new XMLHttpRequest();
    value = value.trim();
    if (value == "") {
        document.getElementById("resultOfSearch").innerHTML = "";
    } else {
        xhttp.responseType = "json";
        xhttp.onload = function (e) {
            if (this.readyState == 4 && this.status == 200) {
                let content = "";
                let index = 0;
                for (var item of this.response) {
                    if (index++ > 4) {
                        break;
                    }
                    content +=
                        '<a href="/tutor-detail/' +
                        item._id +
                        '"><div class="d-flex p-1 border bg-light">';
                    content += '<img src="' + item.avartar + '" height="100" />';
                    content += '<div class="d-flex flex-column">';
                    content += '<div class="text-bold">' + item.name + "</div>";
                    content += "<div>" + item.level + "</div>";
                    content += "</div></div></a>";
                }
                document.getElementById("resultOfSearch").innerHTML = content;
            }
        };
        xhttp.open("POST", "/api/tutor/search?searchString=" + value);
        xhttp.send();
    }
}

function activeChatbot() {
    let chatbotDialog = document.getElementById("chatbot");
    if (chatbotDialog.style.display == "none") {
        chatbotDialog.style.display = "block";
    } else {
        chatbotDialog.style.display = "none";
    }
}

function closeChatbot() {
    let chatbotDialog = document.getElementById("chatbot");
    chatbotDialog.style.display = "none";
    clearDataChatbot();
}

function clearDataChatbot() {
    sessionStorage.clear("chatbotHistory");
    addChat('Chào mừng bạn đến với trung tâm gia sư Duy Tâm. Chúng tôi có thể giúp gì cho bạn."');
}

function showChat() {
    let userTemplate =
        '<div class="direct-chat-msg right">' +
        '<div class="direct-chat-infos clearfix">' +
        '<span class="direct-chat-name float-right">{name}</span>' +
        '<span class="direct-chat-timestamp float-left">{time}</span>' +
        "</div>" +
        '<img class="direct-chat-img" src="/images/user.png" alt="Message User Image">' +
        '<div class="direct-chat-text">' +
        "{content}" +
        "</div>" +
        "</div>";
    let botTemplate =
        '<div class="direct-chat-msg">' +
        '<div class="direct-chat-infos clearfix">' +
        '<span class="direct-chat-name float-left">{name}</span>' +
        '<span class="direct-chat-timestamp float-right">{time}</span>' +
        "</div>" +
        '<img class="direct-chat-img" src="/images/chatbot.png" alt="Message User Image">' +
        '<div class="direct-chat-text">' +
        "{content}" +
        "</div>" +
        "</div>";
        let dataString = sessionStorage.getItem("chatbotHistory");
        let data = JSON.parse(dataString);
        let content = '';
        for(let item  of data){
            if(item.isUser){
                content += userTemplate.replace("{name}",item.user).replace("{time}",item.createAt).replace('{content}',item.message);
            } else {
                content += botTemplate.replace("{name}",item.user).replace("{time}",item.createAt).replace('{content}',item.message);
            }
        }
        document.getElementById("chat-content").innerHTML  = content;
}

function addChat(text,isUser = false) {
    let dataString = sessionStorage.getItem("chatbotHistory");
    let data = [];
    if (dataString != undefined) {
        data = JSON.parse(dataString);
    }
    data.push(genMgs(text,isUser));
    dataString = JSON.stringify(data);
    sessionStorage.setItem("chatbotHistory", dataString);
    showChat()
}

function getCourseDetail(course) {
    var xhttp = new XMLHttpRequest();
    xhttp.responseType = "json";
    xhttp.onload = function (e) {
        if (this.readyState == 4 && this.status == 200) {
            if(this.response.id != undefined){
                let content = "";
                content = 'Truy cập vào <a class="text-primary text-underline" href="/class-detail/'+this.response.id+'">đây</a> để xem chi tiết của khoá học "'+ course +'"';
                addChat(content);
            } else {
                addChat("Khoá học này không tồn tại hoặc đã bị xoá.");
            }
            
        } else {
            addChat("Khoá học này không tồn tại hoặc đã bị xoá.");
        }
    };
    let body = JSON.stringify({
        searchText: course,
    });
    xhttp.open("POST", "/api/classroom/search");
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(body);
}

function getCoursePrice(course) {
    var xhttp = new XMLHttpRequest();
    xhttp.responseType = "json";
    xhttp.onload = function (e) {
        if (this.readyState == 4 && this.status == 200) {
            if(this.response.id != undefined){
                let content = "";
                content = 'Khoá học '+ course +' có mức học phí là: '+ this.response.price;
                addChat(content);
            } else {
                addChat("Khoá học này không tồn tại hoặc đã bị xoá.");
            }
            
        } else {
            addChat("Khoá học này không tồn tại hoặc đã bị xoá.");
        }
    };
    let body = JSON.stringify({
        searchText: course,
    });
    xhttp.open("POST", "/api/classroom/search");
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(body);
}

function getTutorDetail(tutorName) {
    var xhttp = new XMLHttpRequest();
    xhttp.responseType = "json";
    xhttp.onload = function (e) {
        if (this.readyState == 4 && this.status == 200) {
            if(this.response.length > 0){
                for (var item of this.response) {
                    let content = "";
                    content = 'Truy cập vào <a class="text-primary text-underline" href="/tutor-detail/'+item._id+'">đây</a> để xem chi tiết gia sư "'+tutorName+'"';
                    addChat(content);
                    break;
                }
            } else {
                addChat("Gia sư này không tồn tại hoặc đã bị xoá.");
            }
        } else {
            addChat("Gia sư này không tồn tại hoặc đã bị xoá.");
        }
    };
    xhttp.open("POST", "/api/tutor/search?searchString="+tutorName);
    xhttp.send();
}

function getTutorPrice(tutorName) {
    var xhttp = new XMLHttpRequest();
    xhttp.responseType = "json";
    xhttp.onload = function (e) {
        if (this.readyState == 4 && this.status == 200) {
            if(this.response != null){
                let content = 'Gia sư '+ tutorName +' có mức <a class="text-primary text-underline" href="/tuition-fee-reference">học phí</a> với mức của ' + this.response?.tutorQualifications[0].level;
                addChat(content);
            } else {
                addChat("Gia sư này không tồn tại hoặc đã bị xoá.");
            }
        } else {
            addChat("Gia sư này không tồn tại hoặc đã bị xoá.");
        }
    };
    let body = JSON.stringify({
        searchString: tutorName,
    });
    xhttp.open("POST", "/api/tutor/search-price");
    xhttp.send(body);
}

function getListMyCousse() {
    var xhttp = new XMLHttpRequest();
    xhttp.responseType = "json";
    xhttp.onload = function (e) {
        if (this.readyState == 4 && this.status == 200) {
            if(this.response != null){
                let content = "<ul>";
                for (var item of this.response) {
                    if(item._id != undefined){
                        content += ('<li>Khoá học <a  class="text-primary text-underline" href="/class-detail/'+item._id+'">'+item.code+'</a></li>');
                    } else {
                        addChat("Gia sư này không tồn tại hoặc đã bị xoá.");
                    }
                }
                content += "</ul>";
                addChat(content);
            } else {
                addChat("Bạn chưa có đăng ký khoá học nào");
            }
            
        } else {
            addChat("Bạn hãy đăng nhập trước đã.");
        }
    };
    let body = JSON.stringify({
        searchString: tutorName,
    });
    xhttp.open("POST", "/api/tutor/search");
    xhttp.send(body);
}

function getPrices() {
    let content = "";
    content = 'Truy cập vào <a  class="text-primary text-underline"  href="/tuition-fee-reference">đây</a> để xem học phí';
    addChat(content);
}

function checkResponse(text){
    let dataString = sessionStorage.getItem("chatbotHistory");
    let data = JSON.parse(dataString);
    let lastText = data[data.length-1].message;
    let curText = text
                .replace("<course-detail>->","")
                .replace("<tutor-detail>->","")
                .replace("<free-of-course>->","")
                .replace("<free-of-tutor>->","");
    return lastText.indexOf(curText) == -1;
}

function getChat(element) {
    var xhttp = new XMLHttpRequest();
    xhttp.responseType = "json";
    xhttp.onload = function (e) {
        if (this.readyState == 4 && this.status == 200) {
            let text = this.response[0].text.replaceAll("_"," ");
            if(text.indexOf("None") != -1 || checkResponse(text)){
                addChat("Xin lỗi tôi chưa rõ " + (text.indexOf("tutor") != -1 ? "tên gia sư" : "mã khoá học") +" mà bạn cung cấp");
            } else if(text.indexOf("<price>") != -1){
                getPrices();
            } else if(text.indexOf("<course-detail>") != -1){
                let data = text.replace("<course-detail>->","");
                getCourseDetail(data);
            } else if(text.indexOf("<tutor-detail>") != -1){
                let data = text.replace("<tutor-detail>->","");
                getTutorDetail(data);
            } else if(text.indexOf("<list-my-course>") != -1){
                getListMyCousse();
            } else if(text.indexOf("<free-of-course>") != -1){
                let data = text.replace("<free-of-course>->","");
                getCoursePrice(data)
            } else if(text.indexOf("<free-of-tutor>") != -1){
                let data = text.replace("<free-of-tutor>->","");
                getTutorPrice(data);
            } else {
                addChat(text);
            }
        }
    };
    let textString = element.value.trim();
    let textStringBeSent = textString.split(/(?=[A-ZĐAÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬĐEÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊOÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢUÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴ])/)
    .map(function(word, index) {
        if(/[A-Z]/.test(word) &&  index <  textString.split(/(?=[A-ZĐAÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬĐEÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊOÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢUÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴ])/).length - 1) {
            return word.replace(" ", "_");
        } else {
            return word;
        }
    }).join("");
    
    element.value = "";
    addChat(textString,true);

    let body = JSON.stringify({
        sender: "User",
        message: textStringBeSent,
    });
    xhttp.open("POST", "http://localhost:5005/webhooks/rest/webhook");
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(body);
}

if (document.getElementById("inputChat")) {
    var input = document.getElementById("inputChat");
    input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("btnChat").click();
    }
    });
}

function genMgs(mgs, isUser = false) {
    let now = new Date();
    return (message = {
        message: mgs,
        user: isUser ? "Me" : "Trung tâm Duy Tâm",
        isUser: isUser,
        createAt:
            now.getHours() +
            ":" +
            now.getMinutes() +
            " " +
            now.getDate() +
            " Tháng " +
            (now.getMonth() + 1).toString(),
    });
}
importCSS();
getUserInfo();

if (document.getElementById("listAvartarTutor")) {
    getListAvartarTutor();
}
if (document.getElementById("chat-content")) {
    if(sessionStorage.getItem("chatbotHistory") == undefined){
        clearDataChatbot();
    } else {
        showChat()
    }
}
if (document.getElementById("listChosenTutor")) {
    getListChosen();
}

if (document.getElementById("city")) {
    getCities();
}

if (document.querySelector("textarea.active-tinymce")) {
    tinymce.init({
        selector: "textarea.active-tinymce",
        plugins:
            "lists advlist anchor autolink autoresize autosave charmap emoticons directionality" +
            " fullscreen image insertdatetime link media nonbreaking table wordcount visualblocks" +
            " visualchars searchreplace",
        toolbar:
            "anchor restoredraft charmap emoticons ltr rtl fullscreen image insertdatetime link" +
            " media nonbreaking table tabledelete | tableprops tablerowprops tablecellprops | " +
            "tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore" +
            " tableinsertcolafter tabledeletecol wordcount visualblocks visualchars searchreplace",
    });
}
if (document.getElementById("postList")) {
    getPostList();
}
if (document.getElementById("subjectList")) {
    getSubjectList();
}
