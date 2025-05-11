import { NextResponse } from 'next/server';
import User from '../../../lib/models/user';
import connectMongoDB from '../../../lib/mongodbConnection';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { username, useremail, useryear, password } = await request.json();
    await connectMongoDB();
    await User.findByIdAndUpdate(
      id,
      { username, useremail, useryear, password },
      { new: true }
    );
    return NextResponse.json(
      { message: 'User updated successfuly' },
      { status: 200 }
    );
  } catch (error) {
    console.error('something want wrong', error);
    return NextResponse.json({ error: 'Error updating User' }, { status: 500 });
  }
}

export async function GET(_, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();
    const user = await User.findById(id);
    console.log(id);
    return NextResponse.json({ user });
  } catch (error) {
    console.error('something want wrong', error);
    return NextResponse.json({ error: 'no user found' }, { status: 500 });
  }
}
