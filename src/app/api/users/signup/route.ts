import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import {sendEmail} from "@/helper/mailer"

connect()

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json();
        const {username, email, password} = reqBody;
        console.log(reqBody);
        const user = await User.findOne({email});
        if(user)
        {
            return NextResponse.json({error: "User prsent in the data base"}, {status:400});
        }
        // hashPassword
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);


        const newUser = new User({
            username, 
            email,
            password: hashPassword,
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        await sendEmail({email, emailType:'VERIFY', userId: savedUser._id});

        return NextResponse.json({
            message: "User saved successfully",
            success: true,
            savedUser
        });

    }catch(error:any)
    {
        return NextResponse.json({error: error.message }, {status: 500})
    }
}