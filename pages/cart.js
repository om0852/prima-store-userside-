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
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.3fr 0.7fr;

  }
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
  const { cartProducts, addProduct, removeProduct,setCartProducts } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  let total = 0;
  for (const pId of cartProducts) {
    const price = products.find((p) => p._id == pId)?.price || 0;
    total += price;
  }
  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const response1 = await axios.post("/api/checkout", {
        ...address,
        cartProducts: cartProducts.join(","),
        totalPrice: total,
      });
      console.log(response1);
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_ID,
        amount: total * 100,
        currency: "INR",
        name: "Prima Store",
        description: "test transaction",
        order_id: response1.data.order_id,
        handler: async function (response) {
          try {
            
            await axios.post("/api/paymentConfirmation", {
              state: response.status_code,
              id: response1.data.id,
              order_id: response.order_id,
            });
            setCartProducts([]);
            localStorage.setItem("cart",[])

            
          } catch (error) {
            await axios.post("/api/paymentConfirmation", {
              state: false,
              id: response1.data.id,
            });
          }
        },
        prefill: {
          name: address.name,
          email: address.email,
          contact: address.phoneno,
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log(error);
    }
  };

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
              <div>
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
                <input
                  type="hidden"
                  name="cartProducts"
                  value={cartProducts.join(",")}
                />
                <button
                  type="button"
                  onClick={handlePayment}
                  className="px-2 py-1 w-full text-md bg-black text-white rounded-md my-3 border-2 border-black"
                >
                  Continue to payment
                </button>
              </div>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
};

export default CartPage;
