import Header from "@/component/Header";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Title } from "./products";

const MyOrders = () => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .post("/api/myorders", { email: session?.user?.email })
      .then((res) => setOrders(res.data));
  }, []);
  return (
    <>
      <Header />
      <div className="w-full h-auto">
        {/* <Title>My Orders</Title> */}
        <h1>My Orders</h1>
        {orders.line_items &&
          orders?.line_items?.map((data, index) => {
            <div key={index} className="w-full border-y-2 border-gray-400">
              <div className="w-50 h-full p-2">
                {/* <img src={data.images[0]} alt="image" className='w-full h-full'/> */}
              </div>
              <div>Delivery Expected by Aug 11</div>
              <div>{data / title}</div>
            </div>;
          })}
      </div>
    </>
  );
};

export default MyOrders;
