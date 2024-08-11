"use client";
import Header from "@/component/Header"; // Assuming a custom path
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Title } from "./products";
import Link from "next/link";

const MyOrders = () => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    console.log(session?.user?.email)
    if (session?.user?.email) {
      axios
        .post("/api/myorders", { email: session.user.email })
        .then((res) => {
          console.log(res);
          setOrders(res.data);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    }
  }, [session]); // Dependency array ensures useEffect runs when session changes

  useEffect(() => {
    console.log(orders); // For debugging purposes
  }, [orders]); // Dependency array ensures useEffect runs when orders change

  return (
    <>
      <Header />
      <div className="w-full h-auto">
        {/* <Title>My Orders</Title> */}
        <Title className="py-2 px-4">My Orders</Title>
        {orders.length == 0 && (
          <Title className="py-2 px-4 text-center">No Order Found</Title>
        )}
        {orders &&
          orders.map((order, index) => (
            <div key={index} className="w-full border-y-2 border-gray-200">
              {order.line_items &&
                order.line_items.map((item, idx) => (
                  <Link
                    href={`/myorders/${order._id}?pid=${item.productId}`}
                    key={idx}
                    className="flex items-center border-b-2 border-gray-400 space-x-4 p-4"
                  >
                    <div className="w-[20vh] h-[100px] flex justify-center items-center">
                      <img
                        src={item.images}
                        alt="Product"
                        className="w-full h-auto"
                      />
                    </div>
                    <div className="w-full">
                      <p>
                        Delivery Expected by{" "}
                        {new Date(order.createdAt).toDateString()}
                      </p>
                      <p className="capitalize text-2xl font-semibold">
                        {item.title}
                      </p>
                      <p className="capitalize text-xl font-semibold">
                        ₹{item.price_data.unit_amount}
                      </p>
                    </div>
                    <div className="w-[50px] flex items-center justify-end px-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </div>
                  </Link>
                ))}
            </div>
          ))}
      </div>
    </>
  );
};

export default MyOrders;
