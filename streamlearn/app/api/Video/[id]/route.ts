import { NextResponse } from "next/server";
import Video from "../../../../lib/Models/Video";
import connectMongoDB from "../../../../lib/mongodbConnection";

export async function GET(_, {params}) {
    try {
        await connectMongoDB();
        const {id} = params;
        const video = await Video.findById(id);
        return NextResponse.json(video);
    } catch (error) {
        console.error('something went wrong\n', error)
        return NextResponse.json(
            { error: 'no video found' },
            { status: 500 }
        )
    }
}