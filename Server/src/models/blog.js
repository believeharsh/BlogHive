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
        data: Buffer,        // Binary data
        contentType: String  // MIME type
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
}, { timestamps: true });

const blog = model('blog', blogSchema);
export default blog; 