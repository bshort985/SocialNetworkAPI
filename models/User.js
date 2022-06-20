// user model. using validator to validate email. thanks stack overflow!
const { Schema, model } = require("mongoose");

// import { isEmail } from "validator";


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // validate: { validator: isEmail , message: "Invalid Email"}
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: "Thought"
        }],
        friends: [
            {
            type: Schema.Types.ObjectId,
            ref: "User"
            },
        ],
    },
    {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false,
    }
);

const User = model("User", userSchema);
module.exports = { User };