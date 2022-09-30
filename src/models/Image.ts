import mongoose, { model, Schema } from "mongoose";

const imageSchema = new Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    image_url: {
      type: String,
      required: true,
    },
    date_posted: {
      type: Date,
      default: Date.now,
    },
    image_cloudinary_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Image = model("Image", imageSchema);

export { Image };
