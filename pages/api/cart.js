import { connectToDB } from "@/libs/connect";
import Product from "@/models/Product";

export default async function handler(req,res){
    await connectToDB();
    const ids = req.body.data;
    res.json(await Product.find({_id:ids}));

}