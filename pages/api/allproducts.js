import { connectToDB } from "@/libs/connect";
import Product from "@/models/Product";

export default async function handler(req,res){
    await connectToDB();
    try {
        const {filter}=req.body
if(filter.length>0){
    res.json(await Product.find({category:filter}, null, { sort: { _id: -1 } }))
}
res.json(await Product.find({}, null, { sort: { _id: -1 } }))
    } catch (error) {
        res.json(error.message)
    }
}