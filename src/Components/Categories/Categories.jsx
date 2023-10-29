import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Categories.css";
import { Oval } from "react-loader-spinner";

export default function Categories() {
  const [allCategories, setAllCategories] = useState(null);

  async function getAllCategories() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    setAllCategories(data);
    console.log(data);
  }
  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      {!allCategories ? (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <Oval
            height={80}
            width={80}
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      ) : (
        <div className="container py-5">
          <div className="row g-2">
            {allCategories?.data.map(function (item, index) {
              return (
                <div key={index} className="col-md-3">
                  <div className="category">
                    <img
                      src={item.image}
                      className="w-100"
                      alt="category-type"
                    />
                    <h5 className="mt-2">{item.name}</h5>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
