import mongoose, { model, Schema } from "mongoose";

const commentSchema = new Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    date_posted: {
      type: Date,
      default: Date.now,
    },

    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);

export { Comment };
