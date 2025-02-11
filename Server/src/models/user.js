import { Schema, model } from "mongoose";
import { createHmac, randomBytes } from "node:crypto";
import { createAccessToken, createRefreshToken } from "../services/userTokens.js";


const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },

    fullName: {
        type: String,
        required: true,
    },

    about: {
        type : String,
    },

    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
    },

    salt: {
        type: String,

    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER',
    },

    refreshToken: {
        type: String
    },

    profileImageURL: {
        type: String,
        default: "/public/Images/defaultImage.png",
        trim: true,
    }

}, { timestamps: true });

userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return;
    const salt = randomBytes(16).toString();
    const hashedPass = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex");

    this.salt = salt;
    this.password = hashedPass;

    next();
})

userSchema.static(
    "matchPassAndGenTokens",
    async function (email, password) {
        const user = await this.findOne({ email });
        if (!user) throw new Error("User not found!");

        const salt = user.salt;
        const hashedPassword = user.password;

        const userProvidedHash = createHmac("sha256", salt)
            .update(password)
            .digest("hex");

        if (hashedPassword !== userProvidedHash)
            throw new Error("Incorrect Password")

        const accessToken = createAccessToken(user)
        const refreshToken = createRefreshToken(user._id)

        user.refreshToken = refreshToken
        await User.updateOne({ _id: user._id }, { refreshToken });

        return { accessToken, refreshToken }
    }
);

const User = model('user', userSchema);
export default User; 