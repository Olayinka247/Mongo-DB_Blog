import mongoose from "mongoose";

const { Schema, model } = mongoose;

const blogPostSchema = new Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    cover: { type: String, required: true },
    readTime: {
      value: { type: Number, min: 0, max: 10, required: true },
      unit: { type: String, required: true },
    },
    authors: [{ type: Schema.Types.ObjectId, ref: "Author" }],
    content: { type: String, required: true },
    comments: [
      {
        text: { type: String, required: true },
        rate: { type: String, required: true },
        commentDate: { type: Date },
      },
    ],
  },
  { timestamps: true }
);

export default model("BlogPost", blogPostSchema);
