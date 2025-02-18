import { Schema, model } from "mongoose";

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    body: {
        type: String,
        required: true,
    },

    coverImage: {
        type: String,
    },

    coverImagePublicId: {
        type: String,
    },

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },

}, { timestamps: true });

const blog = model('blog', blogSchema);
export default blog; 