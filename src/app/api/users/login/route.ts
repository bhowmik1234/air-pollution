import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'

connect();

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json();
        const {email, password} = reqBody;

        const user = await User.findOne({email});

        if(!user)
        {
            return NextResponse.json({
                error: "User not present"},
                {status: 400
            });
        }

        // check valid password
        const validPassword = await bcryptjs.compare(password, user.password);
        if(!validPassword)
        {
            return NextResponse.json({error: "Invalid Password"}, {status: 500});
        }

        // tokendata
        const tokenData = {
            id:user._id,
            email:user.email,
            username: user.username,
        };

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRETS!, {expiresIn:"1h"});
        const response = NextResponse.json({
            message: "Login successfully",
            success: true,
        });

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;
        
    }catch(error: any)
    {
        return NextResponse.json({error: error.message}, {status:500})
    }
}