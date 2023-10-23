import axios from "axios";
import React, { useContext } from "react";
import { Bars, Oval } from "react-loader-spinner";
import "./products.css";
import { useQuery } from "@tanstack/react-query";
import HomeSlider from "../HomeSlider/HomeSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import { Link } from "react-router-dom";
import { cartContext } from "../CartContext/cartContext";
import toast from "react-hot-toast";
import { authContext } from "../../Context/authentication";

export default function Products() {
  // const [allProducts, setAllProducts] = useState(null);

  function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { isError, isFetching, isLoading, data } = useQuery(
    ["allProducts"],
    getAllProducts
    // { refetchOnMount: false, refetchInterval: 2000 , cacheTime: 4000 , enabled:false}
  );
  const { token } = useContext(authContext);

  const { addProuductToCart } = useContext(cartContext);

  async function addProduct(id) {
    const response = await addProuductToCart(id);
    if (response.status === "success") {
      toast.success("Product added", {
        position: "top-center",
        duration: 2000,
      });
    } else toast.error("error is happened");
  }
  // async function getAllProducts() {
  //   const res = await axios.get(
  //     "https://ecommerce.routemisr.com/api/v1/products",
  //     {
  //       headers: {
  //         Accept: "application/json, text/plain, /",
  //         "Content-Type": "multipart/form-data",
  //       },
  //     }
  //   );
  //   setAllProducts(res.data.data);
  // }
  // try {
  //   useEffect(function () {
  //     getAllProducts();
  //   }, []);
  // } catch (err) {
  //   console.log("error", err);
  // }

  return (
    <>
      {!isLoading ? (
        <div className="container mt-5">
          <div className="row gx-0">
            <div className="col-sm-9">
              <HomeSlider />
            </div>
            <div className="col-sm-3">
              <img
                src={require("../../images/grocery-banner.png")}
                style={{ width: "100%", height: "200px" }}
                alt="sliderImg"
              />
              <img
                src={require("../../images/grocery-banner-2.jpeg")}
                style={{ width: "100%", height: "200px" }}
                alt="sliderImg"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <CategorySlider />
            </div>
          </div>

          <div className="row">
            {data?.data.data.map(function (product, index) {
              return (
                <React.Fragment key={product.id}>
                  {!product.title.includes("Relaxed Fit") ? (
                    <div className="col-md-2">
                      <Link to={`/productDetails/${product.id}`}>
                        <div className="product mt-2">
                          <img
                            src={product.imageCover}
                            className="w-100"
                            alt="product-ph"
                          />
                          <h6 className="main-bg-color mt-1">
                            {product.category.name}
                          </h6>
                          <h5 className="title-product">
                            {product.title.split(" ").slice(0, 2).join(" ")}
                          </h5>
                          <div className="d-flex justify-content-between align-items-center mt-2">
                            <p>{product.price / 10} Euro</p>
                            <p>
                              <i className="fa-solid fa-star star"></i>{" "}
                              {product.ratingsAverage}{" "}
                            </p>
                          </div>
                        </div>
                      </Link>
                      <button
                        disabled={!token}
                        onClick={() => addProduct(product.id)}
                        className="mt-2 w-100 p-1 gap-2 rounded-3 bg-success border-white "
                      >
                        Add to Cart
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
}
