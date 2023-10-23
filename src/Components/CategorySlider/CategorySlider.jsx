import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Oval } from "react-loader-spinner";

export default function CategorySlider() {
  function getAllCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, isLoading } = useQuery(["categorySlider"], getAllCategories, {
    refetchOnMount: false,
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 5,
    arrows: false,
  };

  return (
    <>
      {isLoading ? (
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
        <div className="my-5">
          <h2>Category</h2>
          <div>
            <Slider {...settings}>
              {data?.data.data.map(function (item, index) {
                return (
                  <div key={index}>
                    <img
                      style={{ width: "100%", height: "200px" }}
                      src={item.image}
                      alt="sliderImg"
                      
                    />
                    <h6 className="mt-2">{item.name}</h6>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      )}
    </>
  );
}
