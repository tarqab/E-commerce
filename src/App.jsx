import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Products from "./Components/Products/Products";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Categories from "./Components/Categories/Categories";
import NotFound from "./Components/NotFound.jsx/NotFound";
import Brands from "./Components/Brands/Brands";
import Profile from "./Components/Profile/Profile";
import { AuthProvider } from "./Context/authentication";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { CartContextProvider } from "./Components/CartContext/cartContext";
import { Toaster } from "react-hot-toast";
import Cart from "./Components/Cart/Cart";
import Payment from "./Components/Payment/Payment";
import AllOrders from "./Components/AllOrders/AllOrders";
import CartEmpty from "./Components/CartEmpty/CartEmpty";
import Wishlist from "./Components/Wishlist/Wishlist";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import VerifyCode from './Components/VerifyCode/VerifyCode'
import ResetPassword from "./Components/ResetPassword/ResetPassword";



const myRouter = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Products />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: "allOrders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "forgetPassword",
        element: <ForgetPassword />,
      },
      {
        path: "verifyCode",
        element: <VerifyCode />,
      },
      {
        path: "resetPassword",
        element: <ResetPassword />,
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <NotFound /> },
      { path: "cartEmpty", element: <CartEmpty /> },
    ],
  },
]);

export default function App() {
  let clientQuery = new QueryClient();

  return (
    <>
      <QueryClientProvider client={clientQuery}>
        <CartContextProvider>
          <AuthProvider>
            <RouterProvider router={myRouter} />
          </AuthProvider>
        </CartContextProvider>
        <Toaster />
      </QueryClientProvider>
    </>
  );
}
