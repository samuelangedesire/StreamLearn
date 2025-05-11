import bcrypt from 'bcryptjs';
import User from '../../../lib/models/user';
import connectMongoDB from '../../../lib/mongodbConnection';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        await connectMongoDB();
        const {useremail, password} = await request.json();

        //verifions que le email et le mot de passe sont renseignés avant d'effectuer une quelconque action
        if (!useremail || !password) {
            return NextResponse.json(
                {message: "Please provide all fields"},
                {status: 400}
            );
        }

        const user = await User.findOne({useremail});
        //on verifie que l'utilisateur est dans notre base de donnée
        if(!user) {
            return NextResponse.json(
                {message: "User not found, please register"},
                {status:400}
            )
        }

        const isValidPassword = bcrypt.compareSync(password, user.password);
        //on verifie que le mot de passe correspond au mot de passe stocké dans la base de donnée
        if (!isValidPassword) {
            return NextResponse.json(
                {message: "Password not match"},
                {status: 400}
            )
        }

        return NextResponse.json(
            {message: "Login succesful"},
            {status: 200}
        )

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {error: "something want wrong"},
            {status: 500}
        )
    }
}