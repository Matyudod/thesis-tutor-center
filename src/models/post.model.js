const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostModelSchema = new Schema(
    {
        title: { type: String, trim: true, required: true, unique: true },
        content: { type: String, trim: true, required: true },
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            autopopulate: true,
            ref: "users",
            required: true,
        },
        createAt: { type: Date, default: Date.now },
        updateAt: { type: Date, default: Date.now },
    },
    { versionKey: false }
);

PostModelSchema.plugin(require("mongoose-autopopulate"));
const PostModel = mongoose.model("posts", PostModelSchema, "posts");

module.exports = { PostModel };
