import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function VerifyCode() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  async function checkCode(event) {
    event.preventDefault();
    console.log("dsdfdfdf", code);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          resetCode: code,
        }
      );

      if (data.status === "Success") {
        toast.success("Your Code is correct");
        navigate("/resetPassword")
      } 
    } catch (error) {
      console.log(error);
      toast.error("Your Code is not correct or not valid");

    }
  }

  return (
    <>
      <div className="container py-5">
        <div className="row">
          {" "}
          <h6>Enter here the verify code which you get in the Mail (Your code is just 10 minutes valid)</h6>
          <form
            onSubmit={function (event) {
              checkCode(event);
            }}
          >
            <div className="mb-3">
              <label htmlFor="code" className="form-label">
                Enter your Code
              </label>
              <input
                onChange={(e) => setCode(e.target.value)}
                type="text"
                className="form-control"
                id="code"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
