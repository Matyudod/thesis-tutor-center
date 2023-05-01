const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ClassroomModelSchema = new Schema(
    {
        code: { type: String, trim: true, unique: true, required: true },
        gender: {
            type: mongoose.Schema.Types.ObjectId,
            autopopulate: true,
            ref: "genders",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            autopopulate: true,
            ref: "users",
            required: true,
        },
        name: { type: String, trim: true, required: true },
        phone: { type: String, trim: true, required: true },
        teachingForm: {
            type: mongoose.Schema.Types.ObjectId,
            autopopulate: true,
            ref: "teachingforms",
            required: true,
        },
        subject: {
            type: mongoose.Schema.Types.ObjectId,
            autopopulate: true,
            ref: "subjects",
            required: true,
        },
        address: {
            city: {
                name: { type: String, trim: true, required: true },
                slug: { type: String, trim: true, required: true },
                type: { type: String, trim: true, required: true },
                name_with_type: { type: String, trim: true, required: true },
                code: { type: String, trim: true, required: true },
            },
            district: {
                name: { type: String, trim: true, required: true },
                type: { type: String, trim: true, required: true },
                slug: { type: String, trim: true, required: true },
                name_with_type: { type: String, trim: true, required: true },
                path: { type: String, trim: true, required: true },
                path_with_type: { type: String, trim: true, required: true },
                code: { type: String, trim: true, required: true },
                parent_code: { type: String, trim: true, required: true },
            },
            ward: {
                name: { type: String, trim: true, required: true },
                type: { type: String, trim: true, required: true },
                slug: { type: String, trim: true, required: true },
                name_with_type: { type: String, trim: true, required: true },
                path: { type: String, trim: true, required: true },
                path_with_type: { type: String, trim: true, required: true },
                code: { type: String, trim: true, required: true },
                parent_code: { type: String, trim: true, required: true },
            },
            address: { type: String, trim: true, required: true },
        },
        class: {
            type: mongoose.Schema.Types.ObjectId,
            autopopulate: true,
            ref: "classes",
            required: true,
        },
        dayPerWeek: {
            type: mongoose.Schema.Types.ObjectId,
            autopopulate: true,
            ref: "dayperweeks",
            required: true,
        },
        schedules: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    autopopulate: true,
                    ref: "schedules",
                    required: true,
                },
            ],
            required: true,
        },
        requirement: { type: String, trim: true, required: true },
        suggestedTutors: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    autopopulate: true,
                    ref: "tutors",
                    required: true,
                },
            ],
            default: [],
        },
        currentTutor: {
            type: mongoose.Schema.Types.ObjectId,
            autopopulate: true,
            ref: "tutors",
            required: false,
            default: null,
        },
        tutorRegisted: {
            type: [
                {
                    tutor: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "tutors",
                        required: true,
                    },
                    status: {
                        type: Number, min: 0, max: 3, required: true, default: 0 
                    },
                    tuition: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "tuitions",
                        required: true,
                    },
                    registrationDate: {
                        type: Date, required: true, default: Date.now,
                    },
                },
            ],
            default: [],
        },
        maxFee: { type: Number, require: true },
        currentFee: { type: Number, default: null },
        isCancelled: { type: Boolean, default: false, require: true },
        reasonCancel: { type: String, default: null, require: false },
        isApproved: { type: Boolean, default: false, require: true },
        registrationDate: { type: Date, default: Date.now },
        expireMonth: {type: Number, default: 3, require: true },
        updateAt: { type: Date, default: Date.now },
    },
    { versionKey: false }
);

ClassroomModelSchema.plugin(require("mongoose-autopopulate"));
const ClassroomModel = mongoose.model("classrooms", ClassroomModelSchema, "classrooms");

module.exports = { ClassroomModel };
