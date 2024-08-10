"use client";
import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  const [filter,setFilter]=useState(false)
  const [selectedCategory,setCategory]=useState([])
  useEffect(() => {
    if(cartProducts?.length>0){

      ls?.setItem("cart", JSON.stringify(cartProducts||[]));
    }
    
  }, [cartProducts]);
  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  function addProduct(productId){
    setCartProducts(prev=>[...prev,productId]);
  }
function removeProduct(productId){
    setCartProducts(prev=>{
      const pos = prev.indexOf(productId);
      if(pos!==-1){
        console.log(pos)
        return prev.filter((value,index)=>index!==pos)
      }else{
        return prev;
      }
    });
  }
  return (
    <CartContext.Provider value={{ setCartProducts, cartProducts,addProduct,removeProduct ,setFilter,filter,selectedCategory,setCategory}}>
      {children}
    </CartContext.Provider>
  );
}

// export const useGlobalContext = ;
