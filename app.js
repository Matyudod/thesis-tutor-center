const express = require("express");
const path = require("path");
var cookieParser = require("cookie-parser");
const listEndpoints = require("express-list-endpoints");
const route = require("./src/routers/index.route");
const config = require("./src/configs/database.config");
const CronJob = require("node-cron");
const {
    ReportService,
    ClassroomService
} = require("./src/services/index.service");
// const cors = require("cors");
// const corsConfigs = require("./src/configs/cors.config");

const app = express();
// let corsConfig = {
//     origin: function (origin, callback) {
//         if (corsConfigs.allowOrigins.indexOf(origin) !== -1 || !origin) {
//             callback(null, true);
//         } else {
//             callback(new Error("Not allowed by CORS"));
//         }
//     },
//     methods: corsConfigs.allowMethods,
// };

// app.use(cors(corsConfig));
app.set("views", "./src/views");
app.use(
    "/fontawesome",
    express.static(path.join(__dirname, "node_modules", "@fortawesome", "fontawesome-free"))
);
app.use(
    "/bootstrap/css",
    express.static(path.join(__dirname, "node_modules", "bootstrap", "dist", "css"))
);

app.use("/admin-lte", express.static(path.join(__dirname, "node_modules", "admin-lte", "dist")));
app.use("/dist", express.static(path.join(__dirname, "node_modules", "moment", "dist")));
app.use("/chart.js", express.static(path.join(__dirname, "node_modules", "chart.js")));
app.use("/datatables", express.static(path.join(__dirname, "node_modules", "datatables", "media")));
app.use(express.static(path.join(__dirname, "node_modules", "bootstrap", "dist")));
app.use("/js", express.static(path.join(__dirname, "node_modules", "jquery", "dist")));
app.use("/tinymce", express.static(path.join(__dirname, "node_modules", "tinymce")));
app.use(express.static(path.join(__dirname, "src", "public")));
app.use(express.urlencoded({ limit: "100mb", extended: false }));
app.use(express.json({ limit: "100mb" }));
app.use(cookieParser("secret"));
// app.use(express.cookieParser("A secret"));
app.set("view engine", "ejs");
//Show all routes of application
app.get("/routing", (req, res) => {
    let paths = [];
    listEndpoints(route).forEach(x => {
        let path;
        if (x.methods.length > 1) {
            path = [];
            x.methods.forEach(method => {
                path.push(method + ": " + x.path);
            });
        } else {
            path = x.methods + ": " + x.path;
        }
        paths.push(path);
    });
    res.json(paths);
});

app.initScheduledJobs = () => {
  const scheduled1 = CronJob.schedule("0 0 0 * * *", async () => {
    let reportService = new ReportService();
    let classroomService = new ClassroomService();
    let classrooms = await classroomService.select({currentTutor:{$ne:null},isApproved:true});
    let reportList = [];
    for(let classroom of classrooms){
        reportList.push(
            {
                course: classroom,
                date: new Date(),
            }
        )
    }
    await reportService.create(reportList);
  });

  const scheduled2 = CronJob.schedule("0 0 0 * * *", async () => {
    let reportService = new ReportService();
    let classroomService = new ClassroomService();
    let classrooms = await classroomService.select({currentTutor:{$ne:null},isApproved:true});
    for(let classroom of classrooms){
        let tempDate = new Date(classroom.registrationDate);
        let dateExpire = new Date(tempDate.setMonth(tempDate.getMonth()+classroom.expireMonth));
        if(dateExpire < new Date()){
            await classroomService.updateOne(classroom._id,{
                isCancelled: true,
                reasonCancel : "Lớp đã kết thúc",
                updateAt: new Date()
            });
        }
    }
    await reportService.create(reportList);
  });
  scheduled1.start();
  scheduled2.start();
}
app.initScheduledJobs();
app.use("/", route);
module.exports = app;
