import React, { useEffect, useState } from "react";
import axios from "axios";


import { Oval } from "react-loader-spinner";

export default function Brands() {
  const [allBrands, setAllBrands] = useState(null);

  async function getAllBrands() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/brands"
    );
    setAllBrands(data);
    console.log(data);
  }
  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <>
      {!allBrands ? (
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
          <h2 className="text-center">Brands</h2>
          <div className="row py-2 g-2">
            {allBrands?.data.map(function (item, index) {
              return (
                <div key={index} className="col-md-3">
                  <div className="brands shadow py-2">
                    <img
                      src={item.image}
                      className="w-100"
                      alt="brands-type"
                    />
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
