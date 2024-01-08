import nodemailer from 'nodemailer';
import User from "@/models/userModels";
import bcryptjs from "bcryptjs";


export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {

        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 360000
                });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 360000
                });
        }

        let transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "f73aca2b1456bb",
                pass: "5bad0332b1e1f5"
            }
        });

        const mailOption = {
            from: "bhowmikcwda@gmail.com",
            to: email,
            subject: emailType === 'VERIFY'? "verify your email": "reset your password",
            html: `<p> Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> 
            to ${emailType === 'VERIFY'? "verify your email": "reset your password"}</p>`
        };

        const response = await transport.sendMail(mailOption);
        console.log("mail response: ", response);
        return response;

    } catch (error: any) {
        throw new Error(error.message);
    }
}