import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoGeneral from "../../images/freshcart-logo.svg";
import { authContext } from "../../Context/authentication";
import { cartContext } from "../CartContext/cartContext";
export default function Navbar() {
  const { token, setToken } = useContext(authContext);
  const { numOfCartItems } = useContext(cartContext);

  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("tkn");
    setToken(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="">
            {" "}
            <img src={logoGeneral} alt="logo"></img>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {token ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/categories">
                    {" "}
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/brands">
                    {" "}
                    Brands
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link position-relative" to="/cart">
                    {" "}
                    Cart
                    <span className="position-absolute top-0 start-125 translate-middle badge rounded-pill bg-danger">
                      {numOfCartItems}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/allOrders">
                    {" "}
                    All Orders
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item" style={{ cursor: "pointer" }}>
                <i className="fa-brands  me-2 fa-facebook"></i>
                <i className="fa-brands  me-2 fa-twitter"></i>
                <i className="fa-brands  me-2 fa-whatsapp"></i>
                <i className="fa-brands  me-2 fa-linkedin"></i>
              </li>
              {token ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <span
                      onClick={logout}
                      style={{ cursor: "pointer" }}
                      className="nav-link"
                      to=""
                    >
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
