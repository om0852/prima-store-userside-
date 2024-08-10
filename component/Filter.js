"use client";
import { Title } from "@/pages/products";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";

const Filter = () => {
  const [category, setCategory] = useState([]);
  const { filter, setCategory: setC ,selectedCategory} = useContext(CartContext);
  useEffect(() => {
    axios
      .get("/api/fetchCatgeory")
      .then((res) => setCategory(res.data))
      .catch((err) => console.log(err.message));
  }, []);
  const handleCheck = (e) => {
    if (e.target.checked) {
      setC((prev) => [...prev,e.target.value]);
    }else{
      setC((prev)=>prev.filter((i)=>i!=e.target.value))
    }
  };
  return (
    <div
      className="w-[40vh] h-96 py-4 fixed right-[10vh]  bg-white top-0 z-50"
      style={{ height: "100vh", zIndex: 50, right: filter ? 0 : "-100vh",position:"fixed" }}
    >
      <Title className="px-4">Filter</Title>
      <Title className="px-4 my-4">Select Category</Title>
      <div>
        {category &&
          category.map((data, index) => {
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0vh",
                  placeItems: "center", // Center items both horizontally and vertically
                  textAlign: "center", // Optional: Center-align text within the labels
                }}
              >
                <input
                  className="w-10"
                  type="checkbox"
                  id={index}
                  value={data._id}
                  onClick={handleCheck}
                  name="category"
                />
                <label className="text-xl m-0 p-0" htmlFor={index}>
                  {data.name}
                </label>
              </div>
            );
          })}
        <button
          type="button"
          style={{
            color: "white",
            backgroundColor: "#1e40af", // bg-blue-700
            border: "none",
            borderRadius: "9999px", // rounded-full
            fontSize: "0.875rem", // text-sm
            fontWeight: "500", // font-medium
            padding: "0.625rem 1.25rem", // py-2.5 px-5
            textAlign: "center",
            margin: "2vh auto",
            marginLeft: "10vh",
            cursor: "pointer",
            transition: "background-color 0.2s ease-in-out",
            outline: "none",
            boxShadow: "0 0 0 4px rgba(59, 130, 246, 0.3)", // focus:ring-4 focus:ring-blue-300
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#1d4ed8")
          } // hover:bg-blue-800
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#1e40af")
          }
          onFocus={(e) =>
            (e.currentTarget.style.boxShadow =
              "0 0 0 4px rgba(37, 99, 235, 0.5)")
          } // focus:ring-blue-300
          onBlur={(e) =>
            (e.currentTarget.style.boxShadow =
              "0 0 0 4px rgba(59, 130, 246, 0.3)")
          }
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Filter;
