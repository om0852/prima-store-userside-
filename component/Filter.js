import { Title } from "@/pages/products";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Filter = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    axios
      .get("/api/fetchCatgeory")
      .then((res) => setCategory(res.data))
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <div
      className="w-[40vh] h-96 py-4 absolute right-[10vh]  bg-white top-0 z-50"
      style={{ height: "100vh", zIndex: 50 }}
    >
      <Title className="px-4">Filter</Title>
      <div>
        {category &&
          category.map((data, index) => {
            return (
              <div style={{display:"grid",gridTemplateColumns:"auto auto", gap:"0vh",placeItems:"start"}}>
                <input className="w-10" type="checkbox" id={index} value={data.name} name="category" />
                <label className="text-xl m-0 p-0 " htmlFor={index}>{data.name}</label>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Filter;
