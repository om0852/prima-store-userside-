import React, { useEffect, useState } from "react";
import { Title } from "../products";
import styled from "styled-components";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
const Line = styled.div`
  width: 0.6vh;
  height: 10vh;
  ${(props) =>
    props.state
      ? "background-color: green"
      : "  background-color: none; border:1px solid #ccc;"}
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
      <Title>Order Details</Title>
      <div className="w-full h-auto py-2 shadow-sm">
        <div className="w-full py-2 px-2 border-b-[1px] border-gray-300">
          Order Id - {order?._id}
        </div>
        <div className="w-full flex justify-between items-center py-2 px-2 border-b-[1px] border-gray-300">
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
                order && line_items?.OrderState.length == 1
                  ? "bg-green-500"
                  : "bg-none border-2 border-gray-400"
              } relative`}
            >
              <div className=" w-[40vh] absolute left-[30px] top-[-5px]">
                Order Confirmed
              </div>
            </div>
            <Line state={order && line_items?.OrderState.length == 2}></Line>
            <div
              className={`w-4 h-4 rounded-full ${
                order && line_items?.OrderState.length == 2
                  ? "bg-green-500"
                  : "bg-none border-2 border-gray-400"
              } relative`}
            >
              <div className="absolute  w-[40vh] left-[30px] top-[-5px]">
                Shipped
              </div>
            </div>
            <Line state={order && line_items?.OrderState.length == 3}></Line>
            <div
              className={`w-4 h-4 rounded-full ${
                order && line_items?.OrderState.length == 3
                  ? "bg-green-500"
                  : "bg-none border-2 border-gray-400"
              } relative`}
            >
              <div className="absolute  w-[40vh] left-[30px] top-[-5px]">
                Out For Delivery
              </div>
            </div>
            <Line state={order && line_items?.OrderState.length == 4}></Line>
            <div
              className={`w-4 h-4 rounded-full ${
                order && line_items?.OrderState.length == 4
                  ? "bg-green-500"
                  : "bg-none border-2 border-gray-400"
              } relative`}
            >
              <div className="absolute  w-[40vh] left-[30px] top-[-5px]">
                Delivery
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
