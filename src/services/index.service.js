const { ClassService } = require("./class.service");
const { ClassroomService } = require("./classroom.service");
const { DayPerWeekService } = require("./dayPerWeek.service");
const { DaySessionService } = require("./daySession.service");
const { DayWeekService } = require("./dayWeek.service");
const { GenderService } = require("./gender.service");
const { GradeService } = require("./grade.service");
const { PostService } = require("./post.service");
const { ScheduleService } = require("./schedule.service");
const { SubjectService } = require("./subject.service");
const { ReportService } = require("./report.service");
const { TeachingFormService } = require("./teachingForm.service");
const { TutorQualificationService } = require("./tutorQualification.service");
const { TutorService } = require("./tutor.service");
const { TuitionService } = require("./tuition.service");
const { AuthService } = require("./auth.service");
const { UserService } = require("./user.service");
const { AdminService } = require("./admin.service");

module.exports = {
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
    ReportService,
    TeachingFormService,
    TutorService,
    TutorQualificationService,
    TuitionService,
    AuthService,
    UserService,
};
