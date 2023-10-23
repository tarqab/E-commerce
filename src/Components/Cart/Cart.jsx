import React, { useContext } from "react";
import { cartContext } from "../CartContext/cartContext";
import { Oval } from "react-loader-spinner";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const {

    cartProducts,
    totalPrice,
    numOfCartItems,
    deleteProduct,
    updateCount,
  } = useContext(cartContext);

  const navigate =  useNavigate();
  async function deleteElement(id) {
    const res = await deleteProduct(id);
    if (res.status === "success") toast.success("Product is deleted");
    else {
      toast.error("Error is happened");
    }
  }
  async function updateCountElement(id, count) {
    const res = await updateCount(id, count);

    if (res.status === "success") {
      toast.success("Updating amount is done");
    } else {
      toast.error("Error is happened");
    }
  }


  setTimeout(callNoProducts, 3000);

  function callNoProducts() {
    if (!cartProducts) {
      navigate("/cartEmpty")
        
    }
  }

  if (cartProducts?.length === 0) {
    return <h2 className="text-center py-5">Ops ! Your Cart is Empty</h2>;
  }

  if (!cartProducts) {
    return (
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
    );
  }

  return (
    <>
      <div className="container py-5">
        <h2>Your Orders</h2>
        <div className="d-flex justify-content-between">
          <div>
            {" "}
            <h5>
              Total Price :
              <span className="main-bg-color">{totalPrice / 10} Euro</span>
            </h5>
            <h5>
              Total Items:
              <span className="main-bg-color">{numOfCartItems} </span>
            </h5>
          </div>
          <div>
            <Link to="/payment" className="btn btn-info">
              Confirm Payment
            </Link>
          </div>
        </div>

        <div className="row">
          {cartProducts?.map(function (product, index) {
            return (
              <div key={index} className="col-md-12">
                <div className="card mb-3" style={{ Width: "100%" }}>
                  <div className="row g-0">
                    <div className="col-md-2">
                      <img
                        style={{ Width: "100px" }}
                        src={product.product.imageCover}
                        className="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                    <div className="col-md-6">
                      <div className="card-body h-100 flex-column d-flex justify-content-center    ">
                        <h5 className="card-title">{product.product.title}</h5>

                        <p className="card-text">
                          <small className="text-body-secondary">
                            {product.price / 10}Euro
                          </small>
                        </p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex justify-content-around align-items-center h-100">
                        <div className="">
                          {" "}
                          <button
                            onClick={() =>
                              updateCountElement(
                                product.product.id,
                                product.count + 1
                              )
                            }
                            className="btn  btn-outline-success"
                          >
                            +
                          </button>
                          <span className="mx-2">{product.count}</span>
                          <button
                            onClick={() =>
                              updateCountElement(
                                product.product.id,
                                product.count - 1
                              )
                            }
                            className="btn btn-outline-danger"
                          >
                            -
                          </button>
                        </div>
                        <div>
                          <button
                            onClick={() => deleteElement(product.product.id)}
                            className="btn btn-danger"
                          >
                            remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
