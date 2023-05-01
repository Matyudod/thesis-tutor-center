const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TutorModelSchema = new Schema(
    {
        tutor: {
            type: mongoose.Schema.Types.ObjectId,
            autopopulate: true,
            ref: "users",
            required: true,
        },
        name: { type: String, trim: true, required: true },
        phone: { type: String, trim: true, required: true },
        birthday: { type: Date, required: true },
        gender: {
            type: mongoose.Schema.Types.ObjectId,
            autopopulate: true,
            ref: "genders",
            required: true,
        },
        teachingForms: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    autopopulate: true,
                    ref: "teachingforms",
                    required: true,
                },
            ],
            required: true,
        },

        tutorQualification: {
            type: mongoose.Schema.Types.ObjectId,
            autopopulate: true,
            ref: "tutorqualifications",
            required: true,
        },
        anotherCertification: { type: String, trim: true },
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
        },
        subjects: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    autopopulate: true,
                    ref: "subjects",
                    required: true,
                },
            ],
            required: true,
        },
        classes: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    autopopulate: true,
                    ref: "classes",
                    required: true,
                },
            ],
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
        avartar: { type: String, trim: true, required: true },
        description: { type: String, trim: true },
        score: { type: Number, default: 100 },
        registrationDate: { type: Date, default: Date.now, required: true },
        updateAt: { type: Date, default: Date.now, required: true },
        isApproved: { type: Boolean, default: false, required: true },
        isRemoved: { type: Boolean, default: false},
        reason: { type: String, trim: true },
    },
    { versionKey: false }
);

TutorModelSchema.plugin(require("mongoose-autopopulate"));
const TutorModel = mongoose.model("tutors", TutorModelSchema, "tutors");

module.exports = { TutorModel };
