import  mongoose, { Schema, model } from  "mongoose";

export interface VideoDocument {
    _id: string;
    title: string;
    content: string;
    url: string
  }

  const VideoSchema = new Schema<VideoDocument>({

    title: {
        type: String,
        required: [true, "Please provide an title"],
      },
      content: {
        type: String,
        required: [true, "Please provide a content"],
      },
    url: {
        type: String,
        required: [true, "Please provide an image"],
    },

  },

  { timestamps: true },

);
  
const  Video  =  mongoose.models?.Video  ||  model<VideoDocument>('Video', VideoSchema);

export  default  Video;
    