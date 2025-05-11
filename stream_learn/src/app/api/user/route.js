import User from '../../lib/models/user';
import connectMongoDB from '../../lib/mongodbConnection';
import { NextResponse } from 'next/server';


export async function GET() {
  try {
    await connectMongoDB();
    const users = await User.find();
    return NextResponse.json({ users });
  } catch (error) {
    console.error('something want wrong', error);
    return NextResponse.json(
      { error: 'Failed to retrieve all users' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    await connectMongoDB();
    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: 'user deleted' }, { status: 200 });
  } catch (error) {
    console.error('something want wrong', error);
    return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
  }
}
