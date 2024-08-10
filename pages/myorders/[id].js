import React, { useEffect, useState } from "react";
import { Title } from "../products";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";

const Line = styled.div`
  width: 0.6vh;
  height: 10vh;
  ${(props) =>
    props.state
      ? css`
          background-color: green;
        `
      : css`
          background-color: none;
          border: 1px solid #ccc;
        `}
`;

const MyOrder = () => {
  const router = useRouter();
  const { id, pid } = router.query;
  console.log(id, pid);
  const [order, setOrder] = useState(null);
  const [product, setProduct] = useState(null);
  const [line_items, setLine_Items] = useState(null);
  function findItemByProductId(productId) {
    console.log(order);
    console.log(order.line_items.find((item) => item.productId === productId));
    setLine_Items(
      order.line_items.find((item) => item.productId === productId)
    );
  }

  useEffect(() => {
    if (id && pid) {
      axios
        .get(`/api/myorders/${id}?pid=${pid}`)
        .then((res) => {
          setOrder(res.data.order);
          setProduct(res.data.product);
        })
        .catch((error) => console.log(error));
    }
  }, [id, pid]);
  useEffect(() => {
    if (order) {
      findItemByProductId(pid);
    }
  }, [order]);
  return (
    <div>
      <Title className="px-4">Order Details</Title>
      <div className="w-full h-auto py-2 shadow-sm">
        <div className="w-full py-2 px-4 border-b-[1px] border-gray-300">
          Order Id - {order?._id}
        </div>
        <div className="w-full flex justify-between items-center py-2 px-4 border-b-[1px] border-gray-300">
          <div>
            <Title>{product?.title}</Title>
            <p>₹{order && line_items?.price_data?.unit_amount}</p>
          </div>
          <div className="w-[15vh] h-[15vh]">
            <img src={product?.images?.[0]} className="w-full h-full" />
          </div>
        </div>
        <div className="tracking w-full py-2 px-2 border-b-[1px] border-gray-300">
          <div className="grid place-items-center w-[30px] py-4">
            <div
              className={`w-4 h-4 rounded-full ${
                order && line_items?.OrderState.length >0
                  ? "bg-green-500"
                  : "bg-none border-2 border-gray-400"
              } relative`}
            >
              <div className=" w-[40vh] absolute left-[30px] top-[-5px]">
                Order Confirmed
              </div>
            </div>
            <Line state={order && line_items?.OrderState.length >1}></Line>
            <div
              className={`w-4 h-4 rounded-full ${
                order && line_items?.OrderState.length >1
                  ? "bg-green-500"
                  : "bg-none border-2 border-gray-400"
              } relative`}
            >
              <div className="absolute  w-[40vh] left-[30px] top-[-5px]">
                Shipped
              </div>
            </div>
            <Line state={order && line_items?.OrderState.length >2}></Line>
            <div
              className={`w-4 h-4 rounded-full ${
                order && line_items?.OrderState.length >2
                  ? "bg-green-500"
                  : "bg-none border-2 border-gray-400"
              } relative`}
            >
              <div className="absolute  w-[40vh] left-[30px] top-[-5px]">
                Out For Delivery
              </div>
            </div>
            <Line state={order && line_items?.OrderState.length >3}></Line>
            <div
              className={`w-4 h-4 rounded-full ${
                order && line_items?.OrderState.length >3
                  ? "bg-green-500"
                  : "bg-none border-2 border-gray-400"
              } relative`}
            >
              <div className="absolute  w-[40vh] left-[30px] top-[-5px]">
                {order && line_items?.OrderState.length == 4
                  ? "Delivered"
                  : " Delivery"}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full py-2 px-2 border-b-[1px] border-gray-300">
          Shipping Details
        </div>
        <div className="w-full py-2 px-6 border-b-[1px] border-gray-300">
          <div className="flex flex-row justify-between items-center">
            <p className="text-xl capitalize"> {order?.name} </p>{" "}
            {/* <button
              type="button"
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Change
            </button> */}
          </div>
          <div className="capitalize">
            <p>{order?.street_address}</p>
            <p>{order?.city}</p>
            <p>
              {order?.state}-{order?.code}
            </p>
            <p>{order?.country}</p>
            <p>Phone number:-{order?.number}</p>
          </div>
        </div>
        <div className="w-full  py-2 px-6 border-b-[1px] border-gray-300">
          Price Details
        </div>
        <div className="w-full py-2 px-6 border-b-[1px] border-gray-300">
          <p>Selling Price:-{line_items?.price_data?.unit_amount}</p>{" "}
          <p>Delivery Charges:-{product?.delivery_charges}</p>{" "}
          {/* <p>Total Amount:-{product?.delivery_charges+line_items?.price_data?.unit_amount}</p> */}
        </div>
        <div className="w-full py-2 px-6 border-b-[1px] border-gray-300">
          <p>Payment Status:-{!order?.paid ? "Pending" : "Completed"}</p>
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
