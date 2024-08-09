import mongoose, { Schema } from "mongoose";
import { bcrypt } from "bcrypt";
import { jwt } from "jsonwebtoken";


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true  // used for searching
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,    //cloudinary
        required: true,
    },
    coverImage: {
        type: String,
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    refreshToken: {
        type: String,
    }
}, { timestamps: true })




// .. we dont use ArrowFunction here as it dont have its own context
// .. Async, because working with db | CPU processing takes time.
// .. next, middleware flag which needs to called after finishing of the task. such the flag is being passed to nearest nextFunction

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hash(this.password, 10)
    } return next()
})


// customMethods using Mongoose
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })
}

userSchema.methods.generateRefreshToken = function () {
    jwt.sign({
        _id: this._id,
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY })
}


export const User = mongoose.model('User', userSchema)