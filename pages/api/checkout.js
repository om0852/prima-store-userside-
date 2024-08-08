import { connectToDB } from "@/libs/connect";
import Order from "@/models/Order";
import Product from "@/models/Product";
import Razorpay from "razorpay";


    const razorpay = new Razorpay({
        key_id:process.env.RAZORPAY_ID,
        key_secret:process.env.RAZORPAY_SECRET
        
    })

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.json("Invalid Request");
      return;
    }

    const {
      name,
      email,
      city,
      code,
      number,
      state,
      street_address,
      country,
      cartProducts,
      totalPrice
    } = req.body;
console.log(req.body)
    const productIds = cartProducts.split(",");
    const uniqueIds = [...new Set(productIds)];
    await connectToDB();
    const productInfos = await Product.find({ _id: uniqueIds });
    let line_items = [];
    for (const productId of uniqueIds) {
      const productInfo = productInfos.find(
        (p) => p._id.toString() == productId
      );
      const quantity = productIds.filter((id) => id == productId).length || 0;
     
      if (quantity > 0 && productInfo) {
        line_items.push({
          quantity,
          price_data: {
            curreny: "INR",
            unit_amount: productInfo.price,
          },
          title:productInfo.title,
          images:productInfo.images[0],
          productId:productInfo._id,
          OrderState:[]
        });
      }
    }
   const orderDoc= await Order.create({
      line_items,
      name,
      email,
      city,
      state,
      country,
      code,
      number,
      paid:true,
      street_address,
      
    });
const order= await razorpay.orders.create({
  amount:totalPrice,
  currency:"INR",
  receipt:"reciept_" + orderDoc._id

})
    res.json({ orderId:order.id ,id:orderDoc._id});
  } catch (error) {
    console.log(error)
  }
}
