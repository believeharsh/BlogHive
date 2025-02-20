import mongoose from "mongoose";

const followSchema = new mongoose.Schema({
    follower: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // The user who follows
    following: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true } // The user being followed
}, { timestamps: true });

const follow = mongoose.model("Follow", followSchema);
export default follow

