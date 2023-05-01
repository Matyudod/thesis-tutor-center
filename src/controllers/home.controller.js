const bcrypt = new require("bcrypt");
const Validator = require("fastest-validator");
const MongoDB = require("../providers/database");
const customMessage = require("../providers/customMessage");
const generatePaginationObject = require("../providers/generatePaginationObject");
const constants = require("../constants/constants"); 
const message = require("../constants/message");
const scheme = require("../constants/validation");
const { CookieProvider } = require("../providers/cookies");
const { FakeDataVietnamese } = require("../providers/fake-data");
const fakedata = new FakeDataVietnamese();
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
    ReportService,
} = require("../services/index.service");
const extractUserData = require("../models/user.model");
const formatTuition = require("../middlewares/formatTuition.middleware.js");
const formatPrice = require("../middlewares/formatPrice.middleware.js");
const { ObjectId } = require("mongodb");
class HomeController {
    constructor() {}
    async index(req, res) {
        var tuitionService = new TuitionService();
        var gradeService = new GradeService();
        let teachingFormService = new TeachingFormService();
        let dayPerWeekService = new DayPerWeekService();
        var classroomService = new ClassroomService();
        let tuitions = await tuitionService.selectAll();
        let grades = await gradeService.selectAll();
        let teachingForms = await teachingFormService.selectAll();
        let dayPerWeeks = await dayPerWeekService.selectAll();
        var classes = await classroomService.select({
            isApproved: true,
            isCancelled: false,
            currentTutor: null,
        },generatePaginationObject(3,1));
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
        res.render("home", {
            page: "home",
            dataMap: dataMap,
            keyMap: keyMap,
            formatTuition: formatTuition,
            classes:classes,
            formatPrice:formatPrice,
            dialogMessage: req.messageResponse,
        });
    }

    async chooseTutor(req, res) {
        let tutorService = new TutorService();
        let tutorQualificationService = new TutorQualificationService();
        let genderService = new GenderService();
        let classService = new ClassService();
        let subjectService = new SubjectService();
        let teachingFormService = new TeachingFormService();

        let pagination = null;
        let filters = {};

        if(Object.keys(req.body).length > 0){
            if(req.body.city){
                filters["address.city"] = JSON.parse(req.body.city)
            }
            if(req.body.district){
                filters["address.district"] = JSON.parse(req.body.district)
            }
            if(req.body.level){
                let tutorQualification = await tutorQualificationService.selectById(req.body.level);
                if(tutorQualification){
                    filters.tutorQualification = tutorQualification;
                }
            }
            if(req.body.gender){
                let gender = await genderService.selectById(req.body.gender);
                if(gender){
                    filters.gender = gender;
                }
            }
            if(req.body.class){
                let classA = await classService.selectById(req.body.class);
                if(classA){
                    filters.classes = classA;
                }
            }
            if(req.body.subject){
                let subject = await subjectService.selectById(req.body.subject);
                if(subject){
                    filters.subjects = subject;
                }
            }
            if(req.body.teachingForm){
                let teachingForm = await teachingFormService.selectById(req.body.teachingForm);
                if(teachingForm){
                    filters.teachingForms = teachingForm;
                }
            }
        }
        if(Object.keys(req.query).length > 0){
            pagination = generatePaginationObject(req.query.sizeOfPage ?? 9,req.query.page ?? 1, req.query.sortBy ?? "_id", req.query.isReverse ?? false);
        } else {
            pagination = generatePaginationObject(9,1);
        }
        let tutors = await tutorService.select(filters,pagination);
        let tutorAll = await tutorService.select(filters);
        let total = tutorAll.length;
        let tutorQualifications = await tutorQualificationService.selectAll();
        let genders = await genderService.selectAll();
        let classes = await classService.selectAll();
        let subjects = await subjectService.selectAll();
        let teachingForms = await teachingFormService.selectAll();
        res.render("home", {
            page: "choose-tutor",
            tutors: tutors,
            tutorQualifications: tutorQualifications,
            genders: genders,
            classes: classes,
            subjects: subjects,
            teachingForms: teachingForms,
            pagination: pagination,
            total: total,
            dialogMessage: req.messageResponse,
        });
    }
    async classDetail(req, res) {
        var classroomService = new ClassroomService();
        var tutorService = new TutorService();
        let id = req.params.id;
        var classA = await classroomService.selectById(id);
        let cookies = new CookieProvider(req, res);
        if(req.headers.referer?.indexOf("class-detail/") == -1){
            cookies.setCookie(constants.backToPrevious,req.headers.referer);
        }
        let isTutor = undefined;
        let isNotTutorOfThisCourse = undefined;
        let userId = undefined;
        if(req.user != undefined){
            userId = req.user._id;
            let tutor = await tutorService.selectOne({tutor: req.user,isApproved:true});
            if(tutor != null){
                isTutor = true;
                let tutorOfCourse = classA.tutorRegisted.map(x => x.tutor._id);
                if(tutorOfCourse.indexOf(tutor._id) == -1){
                    isNotTutorOfThisCourse = true;
                }
            }
            
        }
        console.log(isTutor);
        console.log(isNotTutorOfThisCourse);
        console.log(userId.toString());
        let backToPrevious =  cookies.getCookie(constants.backToPrevious) ?? '/';
        res.render("index", {
            page: "class-details",
            classA: classA,
            backToPrevious: backToPrevious,
            dialogMessage: req.messageResponse,
            confirmMessage: req.confirmMesssageResponse,
            isTutor: isTutor,
            isNotTutorOfThisCourse: isNotTutorOfThisCourse,
            userId: userId.toString()
        });
    }
    async tuitionFeeReference(req, res) {
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
        res.render("home", {
            page: "tuition-fee-reference",
            dataMap: dataMap,
            keyMap: keyMap,
            grades: grades,
            formatTuition: formatTuition,
            dialogMessage: req.messageResponse,
        });
    }
    serviceReference(req, res) {
        res.render("home", {
            page: "service-reference",
            dialogMessage: req.messageResponse,
        });
    }
    async getThisCourse(req,res){
        let tutorId =  req.user._id;
        let classroomId =  req.body.classroomId;
        let cookies =  new CookieProvider(req,res);
        let tutorService = new TutorService();
        var tuitionService = new TuitionService();
        var gradeService = new GradeService();
        let userService = new UserService();
        let user = await userService.selectById(tutorId);
        let tutor = await tutorService.selectOne({tutor:user});
        let classroomService = new ClassroomService();
        let classroom = await classroomService.selectById(classroomId);
        let msg = null;
        if(classroom.currentTutor == null){
            if(classroom.user._id.toString() != user._id.toString()){
                let tutorsGetThisCourse = classroom.tutorRegisted.map(x => x);
                if(tutorsGetThisCourse.map(x=> x.tutor._id.toString()).indexOf(tutor._id.toString()) == -1){
                    let grade =  await gradeService.selectOne({
                        classes: classroom.class
                    });
                    let tuition = await tuitionService.selectOne({
                        tutorQualifications : tutor.tutorQualification,
                        grade: grade,
                        teachingForm: classroom.teachingForm,
                        dayPerWeek: classroom.dayPerWeek
                    });
                    let newRegister = {
                        tutor:tutor,
                        status : 0,
                        registrationDate: new Date(),
                        tuition: tuition
                    };
                    tutorsGetThisCourse.push(newRegister);
                    await classroomService.updateOne(classroom._id,{tutorRegisted:tutorsGetThisCourse});
                    msg = customMessage("Đăng ký nhận lớp", message.successComplete);
                } else {
                    msg = customMessage("Bạn đã nhận lớp này rồi.", message.errorCustom);
                }
            } else {
                msg = customMessage("Bạn là người đăng ký khóa học này nên không thể nhận nó.", message.errorCustom);
            }
        } else {
            msg = customMessage("Lớp học này đã bị gia sư khác nhận.", message.errorCustom);
        }
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(msg),
            1
        );

        res.redirect("/class-detail/"+classroomId)
    }
    async tutorDetail(req,res){
        let id = req.params.id;
        let tutorService = new TutorService();
        let tutor = await tutorService.selectById(id);
        let cookies = new CookieProvider(req, res);
        if(req.headers.referer?.indexOf("class-detail/") == -1){
            cookies.setCookie(constants.backToPrevious,req.headers.referer);
        }
        let backToPrevious =  cookies.getCookie(constants.backToPrevious) ?? '/';
        res.render("index",{ 
            page:"tutor-detail",
            tutor: tutor,
            backToPrevious: backToPrevious,
            dialogMessage: req.messageResponse,
        });
    }
    async postDetail(req,res){
        let id = req.params.id;
        let postService = new PostService();
        let post = await postService.selectById(id);
        res.render("home",{ 
            page:"post-detail",
            post: post,
            dialogMessage: req.messageResponse,
        });
    }
    async tutorWithSubjectIdDetail(req,res){
        let id = req.params.id;
        let subjectService = new SubjectService();
        let tutorService = new TutorService();
        let subject = await subjectService.selectById(id);
        let tutorQualificationService = new TutorQualificationService();
        let genderService = new GenderService();
        let classService = new ClassService();
        let teachingFormService = new TeachingFormService();

        let pagination = null;
        let filters = {subjects : subject};

        if(Object.keys(req.body).length > 0){
            if(req.body.city){
                filters["address.city"] = JSON.parse(req.body.city)
            }
            if(req.body.district){
                filters["address.district"] = JSON.parse(req.body.district)
            }
            if(req.body.level){
                let tutorQualification = await tutorQualificationService.selectById(req.body.level);
                if(tutorQualification){
                    filters.tutorQualification = tutorQualification;
                }
            }
            if(req.body.gender){
                let gender = await genderService.selectById(req.body.gender);
                if(gender){
                    filters.gender = gender;
                }
            }
            if(req.body.class){
                let classA = await classService.selectById(req.body.class);
                if(classA){
                    filters.classes = classA;
                }
            }
            if(req.body.subject){
                let subject = await subjectService.selectById(req.body.subject);
                if(subject){
                    filters.subjects = subject;
                }
            }
            if(req.body.teachingForm){
                let teachingForm = await teachingFormService.selectById(req.body.teachingForm);
                if(teachingForm){
                    filters.teachingForms = teachingForm;
                }
            }
        }
        if(Object.keys(req.query).length > 0){
            pagination = generatePaginationObject(req.query.sizeOfPage ?? 9,req.query.page ?? 1, req.query.sortBy ?? "_id", req.query.isReverse ?? false);
        } else {
            pagination = generatePaginationObject(9,1);
        }
        let tutors = await tutorService.select(filters,pagination);
        let tutorAll = await tutorService.select(filters);
        let total = tutorAll.length;
        let tutorQualifications = await tutorQualificationService.selectAll();
        let genders = await genderService.selectAll();
        let classes = await classService.selectAll();
        let subjects = await subjectService.selectAll();
        let teachingForms = await teachingFormService.selectAll();
        res.render("home", {
            page: "choose-tutor",
            tutors: tutors,
            tutorQualifications: tutorQualifications,
            genders: genders,
            classes: classes,
            subjects: subjects,
            teachingForms: teachingForms,
            pagination: pagination,
            total: total,
            dialogMessage: req.messageResponse,
        });
    }
    async myReport(req,res){
        let userId = req.user._id;
        let userService = new UserService()
        let reportService = new ReportService();
        let classroomService = new ClassroomService();
        let user = await userService.selectById(userId);
        let classrooms =  await classroomService.select({user:user,isApproved:true});
        let reports = await reportService.select({course: { $in :classrooms},score: null});
        res.render('home',{
           page:"my-report",
           reports :reports
        })
    }
    async submitReportHandler(req,res){
        let reportService =  new ReportService();
        let tutorService =  new TutorService();
        let cookies = new CookieProvider(req,res);
        let reason = req.body.reason;
        let id = req.body.id;
        let rate = req.body["star[]"].length;
        let data = {
            reason: reason,
            score: rate
        }
        let curReport = await reportService.selectById(id);
        if(rate != 3){
            await tutorService.updateOne(curReport.course.currentTutor._id,{ score: curReport.course.currentTutor.score + (rate < 3 ? -1 : +1) * rate + (rate < 3 ? 0 : -3)});
        }
        await reportService.updateOne(curReport._id,data);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(customMessage("Gửi đánh giá hằng ngày thành công", message.successCustom)),
            1
        );
        res.redirect("/my-report");
    }
    careful(req, res) {
        res.render("home", {
            page: "careful",
            dialogMessage: req.messageResponse,
        });
    }
    async needsTutor(req, res) {
        let pagination = generatePaginationObject(6,req.query.page ?? 1 )
        let classroomService = new ClassroomService();
        let classrooms = await classroomService.select({ currentTutor: null, isApproved: true, isCancelled: false },pagination);
        let data = await classroomService.selectAll();
        let total = Math.floor(data.length / 6);
        res.render("home", {
            page: "needs-tutor",
            classrooms: classrooms,
            formatPrice: formatPrice,
            total: total,
            dialogMessage: req.messageResponse,
        });
    }
    contractForm(req, res) {
        res.render("home", {
            page: "contract-form",
            dialogMessage: req.messageResponse,
        });
    }

    pageNotFound(req, res) {
        res.render("index", {
            page: "page-not-found",
            dialogMessage: req.messageResponse,
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
                page: "file-manager",
                listDir: fileNameList,
                url: url,
                course: course
            });
    }
    async test(req, res) {
        
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
        let reportService = new ReportService();
        let authService = new AuthService();
        let userService = new UserService();
        let tutorService = new TutorService();
        let courses = await classroomService.select({isApproved:true,currentTutor: {$ne: null}});
        function diffDays(date,lastDate) {
            var utcThis = Date.UTC(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate(), 0, 0, 0, 0);
            var utcOther = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
        
            return (utcThis - utcOther) / 86400000;
        }
        let reportList = [];
        for(let course of courses){
            let tempDate = new Date(course.registrationDate);
            let dateExpire = new Date(tempDate.setMonth(tempDate.getMonth()+course.expireMonth));
            let date = diffDays(course.registrationDate, new Date() <= dateExpire ? new Date() : dateExpire);
            for(let i = 1 ; i <= date ; i++){
                let tempDate1 = new Date(course.registrationDate.toDateString());
                let dateCur = new Date(tempDate1.setDate(tempDate1.getDate()+i));
                let data = {
                    course : course,
                    date: dateCur,
                    score: Math.floor((Math.random()*3) + 3),
                    reason: ""
                }
                reportList.push(data);
            }
        }
        //await reportService.create(reportList);
       res.json("ad")
    }

    async test1(req, res) {
        res.json("As");
    }
}
module.exports = { HomeController }; 
