import mongoose, { Document, Schema, model } from "mongoose";
export interface  UserDocument {
  name:string;
  email:string;
  password:string;
  role:string;
}
const usersSchema = new mongoose.Schema<UserDocument>(
    {
      name: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true,
      },
      email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"],
      },
      password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [6, "Password must be at least 6 characters"],
      },
      role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
      },
    },
    { timestamps: true },
  )
  
  const  User  =  mongoose.models?.User  ||  model<UserDocument>('User', usersSchema);

  export  default  User;
    