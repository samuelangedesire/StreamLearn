import bcrypt from 'bcryptjs';
import connectMongoDB from '../../../lib/mongodbConnection';
import User from '../../../lib/Models/User';
import { NextResponse } from 'next/dist/server/web/spec-extension/response';

export async function POST(request:Request) {
  
  try {
    const { name, email, password } = await request.json();
    await connectMongoDB();

    //verifions que tous les champs ont bien été rempli

    if (!name || !email || !password) {
      return NextResponse.json(
        {error: "Every fields are required"}
      )
    }

    //verifions si l'email est deja dans notre base de donnée

    const userexist = await User.findOne({email});
    if (userexist) {
      return NextResponse.json(
        {error: "User already existed"},
        {status:400}
      )
    }

    const HashedPassword = bcrypt.hashSync(password, 10);
    await User.create({ name, email, password: HashedPassword });

    return NextResponse.json(
      { message: 'User created ' },
      { status: 201 }
    );

  } catch (error) {
    console.error('something is not good', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }

}
