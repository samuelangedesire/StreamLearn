import { writeFile, mkdir, stat } from 'fs/promises';
import { NextResponse } from 'next/server';
import { join } from 'path';
import connectMongoDB from '../../../lib/mongodbConnection';
import Video from '../../../lib/Models/Video';

export async function POST(request) {

    const formData = await request.formData();
    const allowedVideoTypes = ["video/mp4", "video/webm", "video/ogg"];

    const title = formData.get("title") ;
    const content = formData.get("content") ;
    const video = formData.get("video") ;

    if(!title || !content || !video) {
        return NextResponse.json(
             { error: 'Provides all fields' },
             { status: 400 }
        )
    }

    if (!allowedVideoTypes.includes(video.type)) {
        return NextResponse.json(
            { error: "Unsupported video format." },
            { status: 400 }
        );
        }

    const bytes = await video.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const relativeUploadDir = `/uploads/${new Date(Date.now())
    .toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    })
    .replace(/\//g, "-")}`;

    const uploadDir = join(process.cwd(), "public", relativeUploadDir);

    try {
    // This is for checking the directory is exist
    await stat(uploadDir);
  } catch (e: any) {

    if (e.code === "ENOENT") {
      // If the directory doesn't exist (ENOENT : Error No Entry), create one
      await mkdir(uploadDir, { recursive: true });

    } else {
      console.error( "Error while trying to create directory when uploading a file\n",e );
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }
  }

try {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const extension = video.name.split('.').pop()
      const originalName = video.name.replace(/\.[^/.]+$/, "").replace(/\s+/g, "-");
      const filename = `${originalName}-${uniqueSuffix}.${extension}`;
      await writeFile(`${uploadDir}/${filename}`, buffer);
      const fileUrl = `${relativeUploadDir}/${filename}`;
  
      // Save to database
     await connectMongoDB();
     await Video.create({title, content, url: fileUrl})
  
      return NextResponse.json(
        { message: 'Video created' },
        { status: 201 }
    );
    } catch (e) {
      console.error("Error while trying to upload a file\n", e);
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }
  }

  export async function GET () {
    try {
        await connectMongoDB();
        const video = await Video.find();
        return NextResponse.json(video);
        
    } catch (error) {
        console.error("Error while trying to get all\n", error);
        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 }
        )
    }
  }
 
  export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    await connectMongoDB();
    await Video.findByIdAndDelete(id);
    return NextResponse.json({ message: 'video deleted' }, { status: 200 });
  } catch (error) {
    console.error('something want wrong', error);
    return NextResponse.json({ error: 'Error deleting video' }, { status: 500 });
  }
}