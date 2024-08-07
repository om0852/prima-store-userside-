import Order from "@/models/Order";
import Product from "@/models/Product";

export default async function handler(req, res) {
  const { id, pid } = req.query;
  console.log(id, pid);
  res.json({
    order: await Order.findOne({ _id: id }),
    product: await Product.findOne({ _id: pid }),
  });
}
