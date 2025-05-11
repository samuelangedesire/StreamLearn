import mongoose, { Schema } from "mongoose";

const userSchema = new Schema (
    {
        username: {
            type: String,
            required: true,
        },
        useremail: {
            type: String,
            required: true,
            unique: true
        },
        useryear: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required : true,
        }
    },
    {
        timestamps: true,
    }
)

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;