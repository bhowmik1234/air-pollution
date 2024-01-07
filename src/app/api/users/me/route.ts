import { getDataFromToken} from "@/helper/getDataFromToken"

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request:NextRequest){

    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            mesaaage: "User found",
            data: {_id:userId, username: "two", email:"tow@"}
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}