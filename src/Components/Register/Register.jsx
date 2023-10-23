import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

import axios from "axios";

export default function Register() {
  let user = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  // Formik offers: => 1- map your form with an object
  // 2- validation
  //3- Controlled Form

  async function registerNewUser(values) {
    setLoader(true);
    try {
      console.log("submit...", values);

      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      console.log("sending to Backend");
      console.log(data);

      if (data.message === "success") {
        setSuccessMsg("Account is created successfully");
        setTimeout(function () {
          navigate("/login");
        }, 1000);
      }
    } catch (err) {
      console.log("error: ", err);
      setErrorMsg(err.response.data.message);
    }

    setLoader(false);
  }
  console.log(loader);
  const formikObject = useFormik({
    initialValues: user,
    onSubmit: registerNewUser,
    validate: function (values) {
      //  will be called after submit only if there all things going well

      // const PhoneRegex = /^017[0-8]{8}|069[0-8]{8}$/;
      // const PhoneRegex = /^01[125][0-9]{8}$/;
      setErrorMsg(null);
      const errors = {};

      if (values.name.length < 4 || values.name.length > 10) {
        errors.name = "Name must be at least 4 characters and maximum 10";
      }

      if (!values.email.includes("@") || !values.email.includes(".")) {
        errors.email = "Mail must have @ and .";
      }
      if (!values.phone.match(/^01[125][0-9]{8}$/)) {
        errors.phone = "Phone must start with 01 then 1,2 or 5 then 8 digits ";
      }

      if (!(values.password.length >= 6 && values.password.length <= 12)) {
        errors.password = "The password should between 6 and 12 digits";
      }
      if (values.rePassword?.length !== values.password?.length) {
        errors.rePassword = "The passwords not the same";
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

        <h2 className="mt-3">Register Now</h2>
        <form onSubmit={formikObject.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              Name
            </label>
            <input
              onBlur={formikObject.handleBlur}
              onChange={formikObject.handleChange}
              value={formikObject.values.name}
              type="text"
              className="form-control"
              id="name"
              placeholder="Name"
            />
            {formikObject.errors.name && formikObject.touched.name ? (
              <div className="alert alert-danger mt-1 p-2">
                {formikObject.errors.name}
              </div>
            ) : (
              ""
            )}
          </div>
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
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              onChange={formikObject.handleChange}
              onBlur={formikObject.handleBlur}
              value={formikObject.values.phone}
              type="text"
              className="form-control"
              id="phone"
              placeholder="Phone"
            />
            {formikObject.errors.phone && formikObject.touched.phone ? (
              <div className="alert alert-danger mt-1 p-2">
                {formikObject.errors.phone}
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
          <div className="mb-3">
            <label htmlFor="rePassword" className="form-label">
              Repeat password{" "}
            </label>
            <input
              onBlur={formikObject.handleBlur}
              onChange={formikObject.handleChange}
              value={formikObject.values.rePassword}
              type="password"
              className="form-control"
              id="rePassword"
              placeholder="Password"
            />
            {formikObject.errors.rePassword &&
            formikObject.touched.rePassword ? (
              <div className="alert alert-danger mt-1 p-2">
                {formikObject.errors.rePassword}
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
              "Register"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
