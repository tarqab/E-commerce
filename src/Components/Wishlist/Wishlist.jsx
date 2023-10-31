import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { Navigate, useNavigate } from "react-router-dom";

export default function Wishlist() {
  const [allWishProduct, getAllWishProduct] = useState(null);
  async function getWishlist() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers: { token: localStorage.getItem("tkn") } }
      );
      getAllWishProduct(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeFromWishlist(productID) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productID}`,
        { headers: { token: localStorage.getItem("tkn") } }
      );
      console.log(data.message);
      if (data.status === "success") {
        toast.success("Product removed from wishlist");
        getWishlist();
      } else {
        toast.error("Error occurred");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getWishlist();
  }, []);

  if (allWishProduct?.data.length === 0) {
    return <h2 className="text-center py-5">Ops ! Your Wishlist is Empty</h2>;
  }

  return (
    <>
      {!allWishProduct ? (
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
            {allWishProduct?.data.map((product) => {
              return (
                <div key={product._id} className="col-md-12">
                  <div className="card mb-3" style={{ Width: "100%" }}>
                    <div className="row g-0">
                      <div className="col-md-2">
                        <img
                          style={{ Width: "100px" }}
                          src={product.imageCover}
                          className="img-fluid rounded-start"
                          alt="..."
                        />
                      </div>
                      <div className="col-md-6">
                        <div className="card-body h-100 flex-column d-flex justify-content-center    ">
                          <h5 className="card-title">{product.title}</h5>

                          <p className="card-text">
                            <small className="text-body-secondary">
                              {product.price / 10}Euro
                            </small>
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="d-flex justify-content-around align-items-center h-100">
                          <button
                            onClick={() => removeFromWishlist(product.id)}
                            className="btn btn-danger"
                          >
                            remove from wishlist
                          </button>
                        </div>
                      </div>
                    </div>
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
