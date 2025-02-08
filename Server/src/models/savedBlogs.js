import { Schema, model } from "mongoose";

const savedBlogSchema = new Schema(
  {
    savedBy: {
      type: Schema.Types.ObjectId,  
      ref: "user", 
      required: true,
    },
    savedBlogId: {
      type: Schema.Types.ObjectId,
      ref: "blog",
      required: true,
    },
  },
  { timestamps: true }
);

const SavedBlogs = model("SavedBlog", savedBlogSchema);
export default SavedBlogs;