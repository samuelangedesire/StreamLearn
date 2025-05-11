import bcrypt from 'bcryptjs';
import User from '../../../lib/models/user';
import connectMongoDB from '../../../lib/mongodbConnection';
import { NextResponse } from 'next/server';


export async function POST(request) {
    try {
      const { username, useremail, useryear, password } = await request.json();
      await connectMongoDB();
  
      //verifions que tous les champs ont bien été rempli
  
      if (!username || !useremail || !useryear || !password) {
        return NextResponse.json(
          {message: "Every fields are required"}
        )
      }
  
      //verifions si l'email est deja dans notre base de donnée
  
      const userexist = await User.findOne({useremail});
      if (userexist) {
        return NextResponse.json(
          {message: "User already existed"},
          {status:400}
        )
      }
  
      const HashedPassword = bcrypt.hashSync(password, 10);
      await User.create({ username, useremail, useryear, password: HashedPassword });
  
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