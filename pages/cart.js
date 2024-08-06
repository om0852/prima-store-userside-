import Buttons from "@/component/Buttons";
import { CartContext } from "@/component/CartContext";
import Center from "@/component/Center";
import Header from "@/component/Header";
import Input from "@/component/Input";
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
const ProductInfoCell = styled.td`
  padding: 10px 0;
`;
const ProductImagesBox = styled.div`
  width: 100px;
  height: 100px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 80px;
    max-height: 80px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;
const CartPage = () => {
  const { cartProducts, addProduct, removeProduct } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState({});

  const handleAddress = (e) => {
    setAddress((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (cartProducts.length > 0) {
      console.log(cartProducts);
      axios
        .post("/api/cart", { data: cartProducts })
        .then((res) => setProducts(res.data));
    }
  }, [cartProducts]);

  const moreOfThisProduct = (id) => {
    addProduct(id);
  };
  const lessOfThisProduct = (id) => {
    removeProduct(id);
  };
  let total = 0;
  for (const pId of cartProducts) {
    const price = products.find((p) => p._id == pId)?.price || 0;
    total += price;
  }
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
                      <tr key={index}>
                        <ProductInfoCell>
                          <ProductImagesBox>
                            <img src={data.images[0]} />
                          </ProductImagesBox>
                          {data.title}
                        </ProductInfoCell>
                        <td>
                          <button
                            onClick={() => lessOfThisProduct(data._id)}
                            className="bg-none w-10 h-10 text-black"
                          >
                            -
                          </button>
                          {cartProducts.filter((id) => id === data._id).length}
                          <button
                            onClick={() => moreOfThisProduct(data._id)}
                            className="bg-none w-10 h-10 text-black"
                          >
                            +
                          </button>
                        </td>
                        <td>
                          {data.price *
                            cartProducts.filter((id) => id === data._id).length}
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>${total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <form method="post" action="/api/checkout">
                <h2 className="text-2xl">Order Information</h2>
                <Input
                  onChange={(e) => handleAddress(e)}
                  name="name"
                  type="text"
                  value={address?.name}
                  placeholder="Name"
                />
                <Input
                  onChange={(e) => handleAddress(e)}
                  name="email"
                  type="email"
                  value={address?.email}
                  placeholder="Email"
                />
                <CityHolder>
                  <Input
                    onChange={(e) => handleAddress(e)}
                    name="city"
                    type="text"
                    value={address?.city}
                    placeholder="City"
                  />
                  <Input
                    onChange={(e) => handleAddress(e)}
                    name="code"
                    type="text"
                    value={address?.code}
                    placeholder="Postal Code"
                  />
                </CityHolder>
                <Input
                  onChange={(e) => handleAddress(e)}
                  name="state"
                  type="text"
                  value={address?.state}
                  placeholder="State"
                />
                <Input
                  onChange={(e) => handleAddress(e)}
                  name="street_address"
                  type="text"
                  value={address?.street_address}
                  placeholder="Street Address"
                />
                <Input
                  onChange={(e) => handleAddress(e)}
                  name="country"
                  value={address?.country}
                  type="text"
                  placeholder="Country"
                />
                {/* <Input type="text" placeholder="Address 1" />
              <Input type="text" placeholder="Address 2" /> */}
              <input type="hidden" name="cartProducts" value={cartProducts.join(",")}/>
                <button
                  type="submit"
                  className="px-2 py-1 w-full text-md bg-black text-white rounded-md my-3 border-2 border-black"
                >
                  Continue to payment
                </button>
              </form>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
};

export default CartPage;
