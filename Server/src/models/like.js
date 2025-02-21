import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const likeSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blog",
      required: true,
    },
  },
  { timestamps: true }
);

const likes = model("like", likeSchema);

export default likes ; 
