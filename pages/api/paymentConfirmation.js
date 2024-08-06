import Order from "@/models/Order"

export default async function handler(req,res){
    const {state,id,order_id}=req.body
    console.log(req.body)
    if(state==200){
        const data  =await Order.updateOne({_id:id},{paid:true,order_id:order_id})
    }else{
        const data  = await Order.deleteOne({_id:id})

    }
    res.json("done")
}