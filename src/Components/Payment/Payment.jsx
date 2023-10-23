import axios from "axios";
import React, { useContext } from "react";
import { cartContext } from "../CartContext/cartContext";
import toast from "react-hot-toast";

export default function Payment() {
  const {
    cartID,
    setCartProducts,
    setTotalPrice,
    setNumOfCartItems,
    confirmOnlinePayment,
    setFinishedPayment,
  } = useContext(cartContext);

  async function confirmCashPayment(e) {
    const phoneValue = document.querySelector("#phone").value;
    const cityValue = document.querySelector("#city").value;
    const detailsValue = document.querySelector("#details").value;
    e.preventDefault();
    const shippingAddress = {
      shippingAddress: {
        details: detailsValue,
        phone: phoneValue,
        city: cityValue,
      },
    };
    console.log("shippingAddress", shippingAddress);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartID}`,
        shippingAddress,
        { headers: { token: localStorage.getItem("tkn") } }
      );

      console.log(data);
      if (data.status === "success") {
        toast.success("Order successfully initialized");
        setCartProducts([]);
        setTotalPrice(0);
        setNumOfCartItems(0);
      } else {
        toast.error("Error happened");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function completeOnlinePayment(e) {
    const phoneValue = document.querySelector("#phone").value;
    const cityValue = document.querySelector("#city").value;
    const detailsValue = document.querySelector("#details").value;
    const shippingAddress = {
      shippingAddress: {
        details: detailsValue,
        phone: phoneValue,
        city: cityValue,
      },
    };
    await confirmOnlinePayment(e, shippingAddress);
    
    
  }

  // async function confirmOnlinePayment(e) {
  //   const phoneValue = document.querySelector("#phone").value;
  //   const cityValue = document.querySelector("#city").value;
  //   const detailsValue = document.querySelector("#details").value;
  //   e.preventDefault();
  //   const shippingAddress = {
  //     shippingAddress: {
  //       details: detailsValue,
  //       phone: phoneValue,
  //       city: cityValue,
  //     },
  //   };
  //   try {
  //     const { data } = await axios.post(
  //       `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}`,
  //       shippingAddress,
  //       {
  //         headers: { token: localStorage.getItem("tkn") },
  //         params: { url: "http://localhost:3000" },
  //       }
  //     );
  //     if (data.status === "success") {
  //       toast.success("payment is done");
  //     }

  //     window.open(data.session.url, "_blank");
  //     setCartProducts([]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  console.log(cartID);
  return (
    <>
      <div className="container py-5 ">
        <form action="">
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input type="text" className="form-control" id="phone" />
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input type="text" className="form-control" id="city" />
          </div>
          <div className="mb-3">
            <label htmlFor="details" className="form-label">
              Details
            </label>
            <textarea type="text" className="form-control" id="details" />
          </div>
          <button onClick={confirmCashPayment} className="btn btn-primary me-2">
            Confirm cash payment
          </button>
          <button onClick={confirmOnlinePayment} className="btn btn-primary">
            Confirm Online payment
          </button>
        </form>
      </div>
    </>
  );
}
