const bcrypt = new require("bcrypt");
const path = new require("path");
const fs = new require("fs");
const Validator = require("fastest-validator");
const MongoDB = require("../providers/database");
const customMessage = require("../providers/customMessage");
const message = require("../constants/message");
const scheme = require("../constants/validation");
const constants = require("../constants/constants");
const extractUserData = require("../models/user.model");
const writeFile = require("../providers/file");

const { JWTCustom } = require("../providers/jwt-custom");
let jwt = new JWTCustom();
const { CookieProvider } = require("../providers/cookies");
let cookies = new CookieProvider();
const {
    TeachingFormService,
    SubjectService,
    ClassService,
    ClassroomService,
    DayPerWeekService,
    GenderService,
    DaySessionService,
    DayWeekService,
    ScheduleService,
    TutorQualificationService,
    TutorService,
    UserService,
} = require("../services/index.service");

class UserController {
    async userCourse(req,res){
        let userId = req.user._id;
        let classroomService = new ClassroomService();  
        let userService = new UserService();
        let user = await userService.selectById(userId);
        let myClassroom = await classroomService.selectIncludeDeleted({user:user});
        res.render('home',{
            page: "my-class",
            myClass: myClassroom
        });
    }

    async courseOfTutor(req,res){
        let userId = req.user._id;
        let classroomService = new ClassroomService();  
        let userService = new UserService();
        let tutorService = new TutorService();
        let user = await userService.selectById(userId);
        let tutor = await tutorService.selectOne({tutor:user});
        let myClassroom = await classroomService.selectIncludeDeleted({$or: [{currentTutor:tutor},{tutorRegisted:tutor}]});
        res.render('home',{
            page: "my-class",
            myClass: myClassroom, 
            header: "Các lớp đã nhận",
            userId: userId
        });
    }

    async changePassword(req,res){
        let userId = req.user._id;
        let userService = new UserService();
        let user = await userService.selectById(userId);
        let cookie = new CookieProvider(req, res);
        console.log(req.body);
        if(user.password == req.body.currentPws){
            if(req.body.newPws == req.body.currentPws){
                cookie.setCookie(
                    constants.has_message,
                    JSON.stringify(customMessage("Mật khẩu trùng mật khẩu cũ", message.errorCustom)),
                    1
                );
            } else {
                if(req.body.newPws == req.body.reNewPws){
                    await userService.updateOne(user._id,{ password : req.body.newPws});
                    cookie.setCookie(
                        constants.has_message,
                        JSON.stringify(customMessage("Cập nhật mật khẩu thành công", message.successCustom)),
                        1
                    );
                } else {
                    cookie.setCookie(
                        constants.has_message,
                        JSON.stringify(customMessage("Mật khẩu xác nhận không khớp", message.errorCustom)),
                        1
                    );
                }
            }
            
        } else {
            cookie.setCookie(
                constants.has_message,
                JSON.stringify(customMessage("Mật khẩu hiện tại không đúng", message.errorCustom)),
                1
            );
        }
        res.redirect(req.body.returnUrl);
    }
    
    async updateCourse(req, res) { 
        let teachingFormService = new TeachingFormService();
        let teachingForms = await teachingFormService.selectAll();
        let subjectService = new SubjectService();
        let subjects = await subjectService.selectAll();
        let genderService = new GenderService();
        let genders = await genderService.selectAll();
        let classService = new ClassService();
        let classes = await classService.selectAll();
        let dayPerWeekService = new DayPerWeekService();
        let dayPerWeeks = await dayPerWeekService.selectAll();
        let daySessionService = new DaySessionService();
        let daySessions = await daySessionService.selectAll();
        let dayWeekService = new DayWeekService();
        let dayWeeks = await dayWeekService.selectAll();
        let classroomService = new ClassroomService();
        let course = await classroomService.selectById(req.params.courseId);
        res.render("home", {
            page: "course-register",
            header: "Cập nhật khóa học",
            teachingForms: teachingForms,
            subjects: subjects,
            classes: classes,
            genders: genders,
            dayPerWeeks: dayPerWeeks,
            daySessions: daySessions,
            dayWeeks: dayWeeks,
            course: course
        });
    }
    
    async updateCourseHandler(req, res) {
        let courseId = req.params.courseId;
        let cookies = new CookieProvider();
        cookies.setParamater(req, res);
        let classroomService = new ClassroomService();
        let scheduleService = new ScheduleService();
        let teachingFormService = new TeachingFormService();
        let subjectService = new SubjectService();
        let genderService = new GenderService();
        let classService = new ClassService();
        let dayPerWeekService = new DayPerWeekService();
        let daySessionService = new DaySessionService();
        let dayWeekService = new DayWeekService();
        let tutorService = new TutorService();
        let userService = new UserService();
        let data = req.body;
        let suggestedTutorListId =
            cookies.getCookie(constants.suggestedTutors) != null
                ? JSON.parse(cookies.getCookie(constants.suggestedTutors))
                : [];
        let suggestedTutors = [];
        for( let suggestedTutorId of suggestedTutorListId){
            suggestedTutors.push(await tutorService.selectById(suggestedTutorId))
        }
        let scheduleDetail = [];
        for (let schedule of data["schedules[]"]) {
            scheduleDetail.push(await scheduleService.selectById(schedule));
        }
        let classroom = {
            name: data.name,
            gender: await genderService.selectById(data.gender),
            phone: data.phone,
            teachingForm: await teachingFormService.selectById(data.teachingForm),
            subject: await subjectService.selectById(data.subject),
            address: {
                city: JSON.parse(data.city),
                district: JSON.parse(data.district),
                ward: JSON.parse(data.ward),
                address: data.address,
            },
            class: await classService.selectById(data.class),
            dayPerWeek: await dayPerWeekService.selectById(data.dayPerWeek),
            maxFee: parseInt(data.maxFee.replace(/[^\d]/g, "")),
            currentFee: null,
            isCancelled: false,
            reasonCancel: null,
            isApproved: false,
            schedules: scheduleDetail,
            requirement: data.requirement,
            suggestedTutors: suggestedTutors,
            expireMonth: data.expireMonth,
        };
        let course = await classroomService.selectById(courseId);
        await classroomService.updateOne(course._id, classroom);

        cookies.clearCookie(constants.suggestedTutors);
        
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(customMessage("Cập nhật khóa học thành công", message.successCustom)),
            1
        );
        res.redirect("/user/my-class");
    }

    async updateInfo(req,res){
        let userId = req.user._id;
        let userService = new UserService();
        let user = await userService.selectById(userId);
        let cookie = new CookieProvider(req, res);
        console.log(req.body);
        if(user.name != req.body.name || user.email != req.body.email){
                await userService.updateOne(user._id,{ email : req.body.email, name: req.body.name});
                user = await userService.selectById(userId);
                let userInfo = {
                    _id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    isAdmin: user.isAdmin,
                };
                cookie.setSignedCookie(constants.access_token, jwt.generate(userInfo), 60);
                cookie.setCookie(
                    constants.has_message,
                    JSON.stringify(customMessage("Cập nhật thông tin thành công", message.successCustom)),
                    1
                );
        } else {
            cookie.setCookie(
                constants.has_message,
                JSON.stringify(customMessage("Không có gì thay đổi", message.errorCustom)),
                1
            );
        }
        res.redirect(req.body.returnUrl);
    }
    
    async updateTutor(req, res) {
        let classroomService = new ClassroomService();
        let scheduleService = new ScheduleService();
        let teachingFormService = new TeachingFormService();
        let subjectService = new SubjectService();
        let genderService = new GenderService();
        let classService = new ClassService();
        let dayPerWeekService = new DayPerWeekService();
        let daySessionService = new DaySessionService();
        let tutorQualificationService = new TutorQualificationService();
        let dayWeekService = new DayWeekService();
        let tutorService = new TutorService();
        let userService = new UserService();
        let user = await userService.selectById(req.user._id);
        //return res.json(await tutorService.selectOne({tutor: user,isApproved:true}));
        res.render("home", {
            page: "register-tutor",
            header: "Cập nhật gia sư",
            genders: await genderService.selectAll(),
            teachingForms: await teachingFormService.selectAll(),
            tutorQualifications: await tutorQualificationService.selectAll(),
            subjects: await subjectService.selectAll(),
            classes: await classService.selectAll(),
            schedules: await scheduleService.select(
                {},
                {
                    sizeOfPage: 100,
                    page: 1,
                    sortBy: "schedule",
                    isReverse: false,
                }
            ),
            tutor: await tutorService.selectOne({tutor: user,isApproved:true})
        });
    }
    
    async updateTutorHandler(req, res) {
        let cookies = new CookieProvider(req, res);
        let classroomService = new ClassroomService();
        let scheduleService = new ScheduleService();
        let teachingFormService = new TeachingFormService();
        let subjectService = new SubjectService();
        let genderService = new GenderService();
        let classService = new ClassService();
        let dayPerWeekService = new DayPerWeekService();
        let daySessionService = new DaySessionService();
        let dayWeekService = new DayWeekService();
        let tutorService = new TutorService();
        let userService = new UserService();
        let CVFile = req.files.CV;
        let avartarFile = req.files.image;
        let identityImageFile = req.files.identityImages;
        let degreeFile = req.files.degrees;
        let user = req.user;
        let avartar = "/files/" + user.username + "_" + user.name + "/";
        for (let tmp of CVFile) {
            writeFile(
                path.join(__dirname, "..", "public", "files", user.username + "_" + user.name),
                "CV",
                tmp.buffer,
                tmp.mimetype
            );
        }
        for (let tmp of avartarFile) {
            avartar += writeFile(
                path.join(__dirname, "..", "public", "files", user.username + "_" + user.name),
                "Ảnh thẻ",
                tmp.buffer,
                tmp.mimetype
            );
        }
        for (let tmp of identityImageFile) {
            writeFile(
                path.join(__dirname, "..", "public", "files", user.username + "_" + user.name),
                "CCCD_CMND",
                tmp.buffer,
                tmp.mimetype
            );
        }
        for (let tmp of degreeFile) {
            writeFile(
                path.join(__dirname, "..", "public", "files", user.username + "_" + user.name),
                "Bằng cấp",
                tmp.buffer,
                tmp.mimetype
            );
        }
        let data = req.body;
        let teachingForms = [];
        for (let teachingForm of data.teachingForms) {
            teachingForms.push(await teachingFormService.selectById(teachingForm));
        }
        let subjects = [];
        for (let subject of data.subjects) {
            subjects.push(await subjectService.selectById(subject));
        }
        let classes = [];
        for (let classA of data.classes) {
            classes.push(await classService.selectById(classA));
        }
        let schedules = [];
        for (let schedule of data.schedules) {
            schedules.push(await scheduleService.selectById(schedule));
        }
        let tutor = {
            tutor: user,
            name: data.name,
            phone: data.phone,
            birthday: data.birthday,
            gender: await genderService.selectById(data.gender),
            teachingForms: teachingForms,
            anotherCertification: data.anotherCertification,
            address: {
                city: JSON.parse(data.city),
                district: JSON.parse(data.district),
                ward: JSON.parse(data.ward),
            },
            subjects: subjects,
            classes: classes,
            schedules: schedules,
            avartar: avartar,
            description: data.description,
            updateAt: new Date()
        };
        
        let userTmp = await userService.selectById(user._id);
        let tutorTmp = await tutorService.selectOne({tutor : userTmp,isApproved:true});
        await tutorService.updateOne(tutorTmp._id,tutor);
        cookies.setCookie(constants.has_message, JSON.stringify(customMessage("Cập nhật gia sư", message.successComplete)),1);
        res.redirect("/");
    }
    
    async updateDocument(req, res) {
        let cookies = new CookieProvider(req, res);

            let document = req.file;
            writeFile(
                path.join(__dirname, "..", "public", "course-documents", req.body.code),
                "Document_"+new Date().toLocaleDateString().replaceAll("/","_"),
                document.buffer,
                document.mimetype
            );
            cookies.setCookie(constants.has_message, JSON.stringify(customMessage("Đã thêm tài liệu mới", message.successComplete)),1);
        
        res.redirect("/user/my-class-received");
    }

}
module.exports = { UserController };
