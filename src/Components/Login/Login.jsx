import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

import axios from "axios";
import { authContext } from "../../Context/authentication";

export default function Login() {
  let user = {
    email: "",
    password: "",
  };
  const { setToken } = useContext(authContext);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  // Formik offers: => 1- map your form with an object
  // 2- validation
  //3- Controlled Form

  async function loginToAccount(values) {
    setLoader(true);
    try {
      console.log("submit...", values);

      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      console.log(data);

      if (data.message === "success") {
        localStorage.setItem("tkn", data.token);
        setToken(data.token);
        setSuccessMsg("Welcom again");
        setTimeout(function () {
          navigate("/products");
        }, 1000);
      }
    } catch (err) {
      console.log("error: ", err);
      setErrorMsg(err.response.data.message);
    }

    setLoader(false);
  }
  const formikObject = useFormik({
    initialValues: user,
    onSubmit: loginToAccount,
    validate: function (values) {
      //  will be called after submit only if there all things going well

      // const PhoneRegex = /^017[0-8]{8}|069[0-8]{8}$/;
      // const PhoneRegex = /^01[125][0-9]{8}$/;
      setErrorMsg(null);
      const errors = {};

      if (!values.email.includes("@") || !values.email.includes(".")) {
        errors.email = "Mail must have @ and .";
      }

      if (!(values.password.length >= 6 && values.password.length <= 12)) {
        errors.password = "The password should between 6 and 12 digits";
      }

      console.log(errors);
      return errors;
    },
  });

 

  return (
    <>
      <div className="container">
        {errorMsg ? (
          <div className="alert alert-danger mt-2 ">{errorMsg} </div>
        ) : (
          ""
        )}
        {successMsg ? (
          <div className="alert alert-success mt-2 ">{successMsg}</div>
        ) : (
          ""
        )}

        <h2 className="mt-3">Login Now</h2>
        <p>
                For testing there is made account yo can use it <br />
                mail: test@gmail.com <br /> password: 123456
        </p>
        <form onSubmit={formikObject.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              onBlur={formikObject.handleBlur}
              onChange={formikObject.handleChange}
              value={formikObject.values.email}
              type="email"
              className="form-control"
              id="email"
              placeholder="Email address"
            />
            {formikObject.errors.email && formikObject.touched.email ? (
              <div className="alert alert-danger mt-1 p-2">
                {formikObject.errors.email}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password{" "}
            </label>
            <input
              onBlur={formikObject.handleBlur}
              onChange={formikObject.handleChange}
              value={formikObject.values.password}
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
            />
            {formikObject.errors.password && formikObject.touched.password ? (
              <div className="alert alert-danger mt-1 p-2">
                {formikObject.errors.password}
              </div>
            ) : (
              ""
            )}
          </div>

          <button
            type="submit"
            className="btn btn-success d-flex"
            disabled={!formikObject.isValid || !formikObject.dirty}
          >
            {loader ? (
              <Oval
                height={30}
                width={40}
                color="#fff"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#4fa94d"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            ) : (
              "Login"
            )}
          </button>
        </form>
        <Link to="/forgetPassword">
          {" "}
          <h6 className="mt-1" style={{ cursor: "pointer" }}>
            Forget Password?
          </h6>
        </Link>
      </div>
    </>
  );
}
