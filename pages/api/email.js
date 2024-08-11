import { connectToDB } from "@/libs/connect";
import nodemailer from "nodemailer";

export const EmailSender=async(message,body) =>{

  try {
    await connectToDB();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "smartcoder0852@gmail.com",
        pass: "iuyk wfjm wswv ejyq",
      },
    });

    // Function to generate OTP
    
    const mail = await transporter.sendMail({
      from: "smartcoder852@gmail.com",
      to: process.env.ADMIN_EMAIL,
      subject:body,
      html: message,
    });
return true
    // Set expiration time to 5 minutes from now
  } catch (error) {
    return false
  }
}