import { connectToDB } from "@/libs/connect";
import Categories from "@/models/Category";
import Product from "@/models/Product";

export default async function handler(req,res){
    try {
        await connectToDB();
        let {filter}=req.body
if(filter.length>0){
    console.log(filter)
    const data = await Categories.find({ parent: { $in: filter } });
if(data){

    data.map((data)=>{
            filter.push(data._id)
        
    })
    console.log(filter)
    res.json(await Product.find({category:filter}, null, { sort: { _id: -1 } }))
}
}
res.json(await Product.find({}, null, { sort: { _id: -1 } }))
    } catch (error) {
        res.json(error.message)
    }
}