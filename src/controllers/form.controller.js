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

class FormController {
    async courseRegister(req, res) {
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
        res.render("home", {
            page: "course-register",
            teachingForms: teachingForms,
            subjects: subjects,
            classes: classes,
            genders: genders,
            dayPerWeeks: dayPerWeeks,
            daySessions: daySessions,
            dayWeeks: dayWeeks,
        });
    }
    async courseRegisterHandler(req, res) {
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
        let newCode = await classroomService.getNewCode();
        let classroom = {
            code: newCode,
            user: req.user,
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
            currentTutor: null,
            tutorRegisted: [],
        };
        //return res.json(classroom)
        await classroomService.create(classroom);

        cookies.clearCookie(constants.suggestedTutors);
        let teachingForms = await teachingFormService.selectAll();
        let subjects = await subjectService.selectAll();
        let genders = await genderService.selectAll();
        let classes = await classService.selectAll();
        let dayPerWeeks = await dayPerWeekService.selectAll();
        let daySessions = await daySessionService.selectAll();
        let dayWeeks = await dayWeekService.selectAll();
        res.render("home", {
            page: "course-register",
            teachingForms: teachingForms,
            subjects: subjects,
            classes: classes,
            genders: genders,
            dayPerWeeks: dayPerWeeks,
            daySessions: daySessions,
            dayWeeks: dayWeeks,
            dialogMessage: customMessage("Khoá học", message.createSuccessful),
        });
    }
    async registerTutor(req, res) {
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

        res.render("home", {
            page: "register-tutor",
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
        });
    }
    async registerTutorHandler(req, res) {
        let cookies = new CookieProvider();
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
            phone: data.phone.replace(" ",""),
            birthday: data.birthday,
            gender: await genderService.selectById(data.gender),
            teachingForms: teachingForms,
            tutorQualification: await tutorQualificationService.selectById(data.tutorQualification),
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
        };
        await tutorService.create(tutor);
        cookies.setParamater(req, res);
        cookies.setCookie(constants.has_message, JSON.stringify(customMessage("Đăng ký làm gia sư", message.successComplete)),1);
        res.redirect("/");
    }
}
module.exports = { FormController };
