import Buttons from "@/component/Buttons";
import { CartContext } from "@/component/CartContext";
import Center from "@/component/Center";
import Header from "@/component/Header";
import Table from "@/component/StyledTable";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 30px;
`;

const CartPage = () => {
  const { cartProducts } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (cartProducts.length > 0) {
      console.log(cartProducts);
      axios
        .post("/api/cart", { data: cartProducts })
        .then((res) => setProducts(res.data));
    }
  }, [cartProducts]);
  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            {!cartProducts?.length && <div>Your cart is empty</div>}
            <h2>Cart</h2>
            {cartProducts?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((data, index) => {
                    return (
                      <tr>
                        <td>{data.title}</td>
                        <td>{cartProducts.filter(id=>id===data._id).length}</td>
                        <td>{data.price}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <h2 className="text-2xl">Order Information</h2>
              <input type="text" placeholder="Address" />
              <input type="text" placeholder="Address 2" />
              <button className="px-2 py-1 w-full text-md bg-black text-white rounded-md my-3 border-2 border-black">
                Continue to payment
              </button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
};

export default CartPage;
