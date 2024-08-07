import { connectToDB } from "@/libs/connect";
import Order from "@/models/Order";

export default async function handler(req,res){
    await connectToDB();
    const {email}=req.body;
    console.log(email)
    res.json(await Order.find({email}));
} 