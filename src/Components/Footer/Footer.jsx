import React from "react";
import "./Footer.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Footer() {
  return (
    <div className="footer-main">
      <div className="footer bg-black w-100 mt-5">
        <div className="container d-flex justify-content-center align-items-center ">
          <div className="footer-container py-5 d-flex flex-column  align-items-center">
            <h2 className="text-center text-white">Fresh Cart</h2>
            <p className="text-center main-bg-color">
              Get your Product form our shop
            </p>
            <p className="text-white text-center w-75 mt-1">
              Fresh Cart is a E-commerce for Customers around the word to buy
              Products
            </p>
            <div className="icons-footer d-flex gap-2">
              <i
                className=" fa-brands fa-facebook icons-footer"
                style={{ color: "white", cursor: "pointer" }}
              ></i>{" "}
              <i
                className=" fa-brands fa-twitter icons-footer"
                style={{ color: "white", cursor: "pointer" }}
              ></i>{" "}
              <i
                className=" fa-brands fa-instagram icons-footer"
                style={{ color: "white", cursor: "pointer" }}
              ></i>{" "}
              <i
                className=" fa-brands fa-google icons-footer"
                style={{ color: "white", cursor: "pointer" }}
              ></i>{" "}
            </div>
            <div className=" mt-3 w-100  d-flex justify-content-between gap-1">
              <input
                className="p-2 w-100 input-field  rounded-2"
                placeholder="Enter Your email address"
                type="email"
              />
              <button className="btn btn-secondary">
                Subscribe
                <i icon="fa-regular fa-envelope-open" className="ms-2 fs-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
