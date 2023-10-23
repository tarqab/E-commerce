import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { error } from "jquery";
import { Oval } from "react-loader-spinner";
export default function AllOrders() {
  const [userOrders, setUserOrders] = useState(null);

  useEffect(() => {
    const result = jwtDecode(localStorage.getItem("tkn"));
    getUserOrders(result.id);
  }, []);

  async function getUserOrders(id) {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );

      

      setUserOrders(data);
    } catch (error) {
      console.log(error);
    }
  }
  if (userOrders === null) {
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
      <div className="container py-2">
        <h2>All Orders</h2>
        <div className="row gy-2">
          {userOrders.map(function (order, idx) {
            return (
              <div key={idx} className="col-md-6">
                <div className="order border border-success-subtle rounded-4 p-2">
                  <div className="container">
                    <div className="row">
                      {order.cartItems?.map(function (item, index) {
                        return (
                          <div key={index} className="col-sm-4">
                            <div>
                              <img
                                src={item.product.imageCover}
                                className="w-100"
                                alt={item.product.title}
                              />
                              <h5>
                                {item.product.title
                                  .split(" ")
                                  .slice(0, 2)
                                  .join(" ")}
                              </h5>
                              <p>Count: {item.count}</p>
                              <p>Price: {item.price}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <p>
                    Order sent to user with phone{" "}
                    {order.shippingAddress?.phone + " "}
                    and with details {order.shippingAddress?.details} at{" "}
                    {order.shippingAddress?.city}
                  </p>
                  <h5>Payment Method: {order.paymentMethodType}</h5>
                  <h5>Total Price: {order.totalOrderPrice}</h5>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
