const bcrypt = new require("bcrypt");
const Validator = require("fastest-validator");
const MongoDB = require("../providers/database");
const customMessage = require("../providers/customMessage");
const message = require("../constants/message");
const scheme = require("../constants/validation");
const {
    AdminService,
    ClassService,
    ClassroomService,
    DayPerWeekService,
    DaySessionService,
    DayWeekService,
    GenderService,
    GradeService,
    PostService,
    ScheduleService,
    SubjectService,
    TeachingFormService,
    TutorService,
    TutorQualificationService,
    TuitionService,
    AuthService,
    UserService,
} = require("../services/index.service");
const extractUserData = require("../models/user.model");
const formatTuition = require("../middlewares/formatTuition.middleware.js");
const formatPrice = require("../middlewares/formatPrice.middleware.js");
const { CookieProvider } = require("../providers/cookies");
const constants = require("../constants/constants");
class AdminController {
    async index(req, res) {
        let menu = [
            { title: "Duyệt gia sư mới", notify: 0, link: "/admin/approving-tutor-management" },
            { title: "Gia sư", notify: 0, link: "/admin/tutor-management" },
            { title: "Lớp học mới", notify: 0, link: "/admin/new-class-management" },
            { title: "Lớp học đang đợi gia sư", notify: 0, link: "/admin/class-in-the-process" },
            { title: "Lớp học đang hoạt động", notify: 0, link: "/admin/class-management" },
            { title: "Học phí", notify: 0, link: "/admin/tuition-management" },
            { title: "Tin tức", notify: 0, link: "/admin/post-management" },
            { title: "Người dùng", notify: 0, link: "/admin/user-management" },
            { title: "Nhân viên", notify: 0, link: "/admin/employee-management" },
            { title: "Thống kê", notify: 0, link: "/admin/evaluate" },
        ];
        res.render("index", {
            page: "admin/index",
            menu: menu,
            dialogMessage: req.messageResponse,
        });
    }
    async newClassManagement(req, res) {
        var classroomService = new ClassroomService();
        var newClass = await classroomService.select({
            isApproved: false,
            isCancelled: false,
            currentTutor: null,
        });
        res.render("admin", {
            page: "class",
            newClassList: newClass,
            header: "Quản lý lớp học mới",
            dialogMessage: req.messageResponse,
            confirmMessage: req.confirmMesssageResponse,
        });
    }
    async classDetail(req, res) {
        var classroomService = new ClassroomService();
        var tuitionService = new TuitionService();
        var gradeService = new GradeService();
        let id = req.params.id;
        if (req.body.status) {
            let status = req.body.status;
            let itemId = req.body.itemId;
            let classA = await classroomService.selectById(id);
            let tutorRegisted = classA.tutorRegisted;
            let registList = tutorRegisted.map(x => x._id.toString());
            if (registList.indexOf(itemId) != -1) {
                classA.tutorRegisted[registList.indexOf(itemId)].status = status;
                let tutor = null;
                let currentFee = null;
                if(status == 3){
                    currentFee = parseInt(req.body.tuition.replace(/[^\d]/g, ""));
                    tutor = classA.tutorRegisted[registList.indexOf(itemId)].tutor;
                }
                await classroomService.updateOne(classA._id, {
                    tutorRegisted: classA.tutorRegisted,
                    currentTutor: tutor,
                    currentFee:currentFee,
                    updateAt: new Date()
                });
            }
        }
        
        let cookies = new CookieProvider(req, res);
        if(req.headers.referer?.indexOf("class-detail/") == -1){
            cookies.setCookie(constants.backToPrevious,req.headers.referer);
        }
        let backToPrevious =  cookies.getCookie(constants.backToPrevious) ?? '/admin';
        var newClass = await classroomService.selectById(id);
        res.render("index", {
            page: "admin/class-details",
            newClass: newClass,
            backToPrevious: backToPrevious,
            dialogMessage: req.messageResponse,
            confirmMessage: req.confirmMesssageResponse,
        });
    }

    async cancelClass(req, res) {
        let id = req.params.id;
        let cookie = new CookieProvider(req, res);
        cookie.setCookie(
            constants.has_message,
            JSON.stringify(customMessage("Bạn có muốn huỷ khoá học này không?", message.confirm,"/admin/new-class-management/cancel",id,true)),
            1
        );
        res.redirect("/admin/class-detail/"+id);
    }

    async approveNewClass(req, res) {
        var classroomService = new ClassroomService();
        let id = req.body.id;
        await classroomService.updateOne(id, { isApproved: true });
        let cookie = new CookieProvider(req, res);
        cookie.setCookie(
            constants.has_message,
            JSON.stringify(customMessage("Duyệt khoá học", message.successComplete)),
            1
        );
        res.redirect("/admin/new-class-management");
    }
    async approveNewTutor(req, res) {
        var tutorService = new TutorService();
        let id = req.params.id;
        await tutorService.updateOne(id, { isApproved: true });
        let cookie = new CookieProvider(req, res);
        cookie.setCookie(
            constants.has_message,
            JSON.stringify(customMessage("Duyệt gia sư", message.successComplete)),
            1
        );
        res.redirect("/admin/approving-tutor-management");
    }
    async cancelNewClass(req, res) {
        var classroomService = new ClassroomService();
        let id = req.body.id;
        await classroomService.updateOne(id, {
            isCancelled: true,
            reasonCancel: req.body.reason,
        });
        let cookie = new CookieProvider(req, res);
        cookie.setCookie(
            constants.has_message,
            JSON.stringify(customMessage("Huỷ khoá học", message.successComplete)),
            1
        );
        res.redirect("/admin/new-class-management");
    }
    async userManagement(req, res) {
        let userService = new UserService();
        let accounts = await userService.selectAll();
        res.render("admin", {
            page: "user",
            accounts: accounts,
            header: "Quản lí tài khoản người dùng",
        });
    }
    async employeeManagement(req, res) {
        let adminService = new AdminService();
        let accounts = await adminService.selectAll();
        res.render("admin", {
            page: "user",
            accounts: accounts,
            header: "Quản lí tài khoản nhân viên",
        });
    }
    async aprovingTutorManagement(req, res) {
        let cookie = new CookieProvider(req, res);
        let hasMessage = cookie.getCookie("success");
        let tutorService = new TutorService();
        let tutors = await tutorService.select({ isApproved: false });
        res.render("admin", {
            page: "tutor",
            tutors: tutors,
            header: "Quản lí gia sư đang duyệt",
            dialogMessage: req.messageResponse,
        });
    }
    async tutorManagement(req, res) {
        let tutorService = new TutorService();
        let tutors = await tutorService.select({ isApproved: true });
        res.render("admin", {
            page: "tutor",
            tutors: tutors,
            header: "Quản lí gia sư",
            dialogMessage: req.messageResponse,
        });
    }
    async tuitionManagement(req, res) {
        var tuitionService = new TuitionService();
        var gradeService = new GradeService();
        let teachingFormService = new TeachingFormService();
        let dayPerWeekService = new DayPerWeekService();
        let tuitions = await tuitionService.selectAll();
        let grades = await gradeService.selectAll();
        let teachingForms = await teachingFormService.selectAll();
        let dayPerWeeks = await dayPerWeekService.selectAll();
        let dataMap = [];
        let promise = new Promise(resolveOuter => {
            tuitions.forEach(element => {
                resolveOuter(
                    (dataMap[
                        element.tutorQualifications[0].level +
                            "|" +
                            element.teachingForm.teachingForm +
                            "|" +
                            element.dayPerWeek.dayPerWeek +
                            "|" +
                            element.grade.grade
                    ] = element)
                );
            });
        });
        let keyMap = [];

        keyMap.push(["Sinh Viên", "Giáo viên", "Thạc Sỹ"]);
        keyMap.push(teachingForms.map(x => x.teachingForm));
        keyMap.push(dayPerWeeks.map(x => x.dayPerWeek).slice(0, 2));
        keyMap.push(grades.map(x => x.grade));
        keyMap.push(dayPerWeeks.map(x => x.dayPerWeek).slice(2, 5));
        await promise;
        res.render("admin", {
            page: "tuition",
            dataMap: dataMap,
            keyMap: keyMap,
            formatTuition: formatTuition,
            dialogMessage: req.messageResponse,
        });
    }
    async updateTuitionHandler(req, res) {
        let tuitionService = new TuitionService();
        let data = req.body;
        let id = data._id;
        let tuition = {
            tuitionMin: parseInt(data.min.replace(/[^\d]/g, "")),
            tuitionMax: parseInt(data.max.replace(/[^\d]/g, "")),
        };
        await tuitionService.updateOne(id, tuition);
        let cookie = new CookieProvider(req, res);
        cookie.setCookie(
            constants.has_message,
            JSON.stringify(customMessage("Cập nhật thông tin học phí", message.successComplete)),
            1
        );
        res.redirect("/admin/tuition-management");
    }
    async classManagement(req, res) {
        var classroomService = new ClassroomService();
        var newClass = await classroomService.select({
            isApproved: true,
            isCancelled: false,
            currentTutor: { $ne: null },
        });
            res.render("admin", {
                page: "class",
                newClassList: newClass,
                header: "Quản lý lớp học đang hoạt động",
                dialogMessage: req.messageResponse,
            });
    }
    async classInReviewRrocessManagement(req, res) {
        var classroomService = new ClassroomService();
        var newClass = await classroomService.select({
            isApproved: true,
            isCancelled: false,
            currentTutor: null,
        });
            res.render("admin", {
                page: "class",
                newClassList: newClass,
                header: "Quản lý lớp học đang duyệt",
                dialogMessage: req.messageResponse,
            });
    }
    async postManagement(req, res) {
        let postService = new PostService();
        let data = await postService.selectAll();
        let cookie = new CookieProvider(req, res);
        if (req.body.id != undefined) {
            let selectedData = await postService.selectById(req.body.id);
            res.render("admin", {
                page: "post",
                postList: data,
                selectedData: selectedData,
            });
        } else {
            res.render("admin", {
                page: "post",
                postList: data,
                dialogMessage: req.messageResponse,
            });
        }
    }
    async newPost(req, res) {
        let data = req.body;
        let postService = new PostService();
        let adminService = new AdminService();
        let cookie = new CookieProvider(req, res);

        let admin = await adminService.selectById("638eb10a1c8ca7c8584be894");
        data.admin = admin;
        await postService.create(data);
        cookie.setCookie(
            constants.has_message,
            JSON.stringify(customMessage("Tin tức đã được tạo", message.successComplete)),
            1
        );
        return res.redirect("/admin/post-management");
    }
    async evaluate(req, res) {
        let adminService = new AdminService();
        let classService = new ClassService();
        let classroomService = new ClassroomService();
        let dayPerWeekService = new DayPerWeekService();
        let daySessionService = new DaySessionService();
        let dayWeekService = new DayWeekService();
        let genderService = new GenderService();
        let gradeService = new GradeService();
        let scheduleService = new ScheduleService();
        let subjectService = new SubjectService();
        let teachingFormService = new TeachingFormService();
        let tutorQualificationService = new TutorQualificationService();
        let tuitionService = new TuitionService();
        let authService = new AuthService();
        let userService = new UserService();
        let tutorService = new TutorService();
        let today = new Date();
        //===================== get Student regist in month ======================
        let classrooms = await classroomService.select({
            registrationDate: {
                $gte: new Date(today.getFullYear(), today.getMonth(), 1).toISOString(),
                $lte: today.toISOString(),
            },
        });
        let data = classrooms.map(x => new Date(x.registrationDate).getDate());
        let datas = data.reduce((a, c) => ((a[c] = (a[c] || 0) + 1), a), Object.create(null));
        let keys = Array.from(Array(today.getDate() + 1).keys())
            .slice(1)
            .map(x => x.toString());
        let dataForChart1 = [];
        for (let item of keys) {
            dataForChart1.push(datas[item] == undefined ? 0 : datas[item]);
        }
        //===================== get Tutor regist in month ======================
        let tutors = await tutorService.select({
            registrationDate: {
                $gte: new Date(today.getFullYear(), today.getMonth(), 1).toISOString(),
                $lte: today.toISOString(),
            },
        });
        data = tutors.map(x => new Date(x.registrationDate).getDate());
        datas = data.reduce((a, c) => ((a[c] = (a[c] || 0) + 1), a), Object.create(null));
        keys = Array.from(Array(today.getDate() + 1).keys())
            .slice(1)
            .map(x => x.toString());
        let dataForChart2 = [];
        for (let item of keys) {
            dataForChart2.push(datas[item] == undefined ? 0 : datas[item]);
        }
        //========== count for all ====
        let tmp = await adminService.selectAll();
        let admin = tmp.length;
        tmp = await userService.selectAll();
        let customer = tmp.length;
        tmp = await tutorService.selectAll();
        let tutor = tmp.length;
        tmp = await classroomService.selectAll();
        tmp = tmp.map(x => x.user._id);
        let tmpdata = tmp.reduce((a, c) => ((a[c] = (a[c] || 0) + 1), a), {});
        let student = Object.keys(tmpdata).length;
        res.render("admin", {
            page: "evaluate",
            dataForChart1: JSON.stringify(dataForChart1),
            dataForChart2: JSON.stringify(dataForChart2),
            admin: admin,
            customer: customer,
            tutor: tutor,
            student: student,
        });
    }
    
    async viewDocument(req, res) {
        let courseId = req.params.courseId;
        let classroomService = new ClassroomService();
        let course = await classroomService.selectById(courseId);

        let url = "/course-documents/"+course.code+"/";
            const path = require("path");
            const fs = require("fs");
            const pathFolder = path.join(__dirname, "../public", "course-documents",course.code);
            let fileNameList = [];
            if (!fs.existsSync(pathFolder)) {
                fs.mkdirSync(pathFolder, { recursive: true });
            }
            fs.readdirSync(pathFolder).forEach(file => {
                fileNameList.push({
                    fileName: file,
                    typeIsFile: file.lastIndexOf(".") != -1 ? true : false,
                });
            });
            res.render("index", {
                page: "admin/view-document",
                listDir: fileNameList,
                url: url,
                course: course
            });
    }
    async manageFile(req, res) {
        let url = req.url;
        let folder = req.params.folder
            .split("|")
            .filter(x => x != ".." && x != ".")
            .join("/");
        if (folder.lastIndexOf(".") != -1) {
            res.redirect("/" + folder);
        } else {
            const path = require("path");
            const fs = require("fs");
            const pathFolder = path.join(__dirname, "../public", folder);
            let fileNameList = [];
            fs.readdirSync(pathFolder).forEach(file => {
                fileNameList.push({
                    fileName: file,
                    typeIsFile: file.lastIndexOf(".") != -1 ? true : false,
                });
            });
            res.render("index", {
                page: "admin/file-manager",
                listDir: fileNameList,
                url: {
                    currentUrl: url,
                    historyUrl:
                        folder == "files"
                            ? ""
                            : folder.lastIndexOf("/") != -1
                            ? folder.slice(0, folder.lastIndexOf("/"))
                            : folder,
                },
            });
        }
    }
    async tutorDetail(req, res) {
        let id = req.params.id;
        let tutorService = new TutorService();
        let tutor = await tutorService.selectById(id);
        let cookies = new CookieProvider(req, res);
        if(req.headers.referer?.indexOf("class-detail/") == -1){
            cookies.setCookie(constants.backToPrevious,req.headers.referer);
        }
        let backToPrevious =  cookies.getCookie(constants.backToPrevious) ?? '/admin';
        res.render("index", {
            page: "admin/tutor-detail",
            backToPrevious: backToPrevious,
            tutor: tutor,
        });
    }
    async tutorConfirmDelete(req, res) {
        let id = req.body.id;
        let tutorService = new TutorService();
        let tutor = await tutorService.selectById(id);
        res.render("index", {
            page: "admin/tutor-detail",
            tutor: tutor,
            confirmMessage: customMessage(
                "Bạn chắc chắn muốn xoá gia sư này",
                message.confirm,
                "/admin/tutor-remove",
                id,
                true
            ),
        });
    }
    async deleteTutor(req, res) {
        let id = req.body.id;
        let reason = req.body.reason;
        let tutorService = new TutorService();
        let tutor = await tutorService.selectById(id);
        await tutorService.updateOne(tutor._id, {
            isRemoved: true,
            reason: reason,
        });
        let cookie = new CookieProvider(req, res);
        cookie.setCookie(
            constants.has_message,
            JSON.stringify(customMessage("Xoá gia sư", message.successComplete))
        );
        if (tutor.isApproved) {
            res.redirect("/admin/tutor-management");
        } else {
            res.redirect("/admin/approving-tutor-management");
        }
    }
}
module.exports = { AdminController };
