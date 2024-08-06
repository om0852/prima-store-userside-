import { connectToDB } from "@/libs/connect";
import Order from "@/models/Order";
import Product from "@/models/Product";
import Razorpay from "razorpay";

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
      state,
      street_address,
      country,
      cartProducts,
    } = req.body;

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
            curreny: "USD",
            product_data: { name: productInfo.name },
            unit_amount: quantity * productInfo.price,
          },
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
      street_address,
    });

    const razorpay = new Razorpay({
        
    })
    res.json({ line_items });
  } catch (error) {}
}
