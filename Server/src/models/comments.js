import {Schema, model} from "mongoose" 

const commentsSchema = new Schema({
    content  : {
        type : String, 
        required : true,

    },
    blogId : {
        type : Schema.Types.ObjectId,
        ref : "blog",
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : "user",
    }
}, {timestamps : true})

const Comments = model("comment", commentsSchema)
export default Comments  