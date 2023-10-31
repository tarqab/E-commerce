import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Bars, Oval } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { cartContext } from "../CartContext/cartContext";
import toast from "react-hot-toast";
import { error } from "jquery";
export default function ProductDetails() {
  const { id } = useParams();

  const { addProuductToCart } = useContext(cartContext);
  const [loaderAddingProduct, setLoaderAddingProduct] = useState();
  const [loaderWishlist, setLoaderWishlist] = useState(false);

  async function addProduct(id) {
    setLoaderAddingProduct(true);

    const response = await addProuductToCart(id);
    if (response.status === "success") {
      toast.success("Product added", {
        position: "top-center",
        duration: 2000,
      });
    } else toast.error("error is happened");
    setLoaderAddingProduct(false);
  }

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { data, isFetching } = useQuery(["productDetails"], getProductDetails, {
    cacheTime: 0,
  });

  async function addToWishlist(id) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId: id },
        {
          headers: { token: localStorage.getItem("tkn") },
        }
      );
      if (data.status === "success") {
        toast.success("Product added to wishlist");
        setLoaderWishlist(true)
      } else {
        toast.error("Error occurred");
      }
    } catch (error) {
      console.log(error);
    }

    console.log(data.message);
  }
  return (
    <>
      {isFetching ? (
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
          <div className="row">
            <div className="col-md-3">
              <figure>
                <img
                  className="w-100"
                  src={data.data.data.imageCover}
                  alt={data.data.data.title}
                />
              </figure>
            </div>
            <div className="col-md-9 details d-flex justify-content-center align-items-center">
              <div className="details">
                <h1>{data.data.data.title}</h1>
                <p className="mt-4">{data.data.data.description}</p>
                <h5 className="">{data.data.data.price / 10 + " "}Euro</h5>
                <button
                  onClick={() => addProduct(id)}
                  className="w-100 p-3 rounded-3 gap-2 bg-success border-white d-flex justify-content-center align-items-center"
                >
                  {loaderAddingProduct ? (
                    <Bars
                      height="20"
                      width="20"
                      color="#fff"
                      ariaLabel="bars-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  ) : (
                    ""
                  )}
                  Add to Cart
                </button>
                <button
                  onClick={() => addToWishlist(id)}
                  className="w-100 p-3 rounded-3 gap-2 bg-warning d-flex justify-content-center align-items-center"
                >
                  Add to wishlist
                  {!loaderWishlist ?  <i className="fa-regular fa-heart fa-lg" ></i> :  <i className="fa-solid fa-heart" style={{color:"red"}}></i> }
                 
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
