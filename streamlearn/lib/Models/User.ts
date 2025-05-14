import  mongoose, { Schema, model } from  "mongoose";

export interface UserDocument {
    _id: string;
    email: string;
    password: string;
    name: string;
    role: string
  }

  const UserSchema = new Schema<UserDocument>({

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
    name: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true,
    },

  },

  { timestamps: true },

);
  
const  User  =  mongoose.models?.User  ||  model<UserDocument>('User', UserSchema);

export  default  User;
    