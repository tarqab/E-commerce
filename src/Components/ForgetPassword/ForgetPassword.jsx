import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  let user = {
    email: "",
  };
   const navigate = useNavigate()
  async function restPassword(values) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );
      console.log(values);
      console.log(data);
      if (data.statusMsg === "success") {
        toast.success("Rest code is sent to your mail" ,{duration:5000});
        navigate("/verifyCode")
      } else toast.error("error is occurred ");
    } catch (error) {
      console.log(error);
    }
  }
  const formikObject = useFormik({
    initialValues: user,
    onSubmit: restPassword,
    // validate: function (values) {
    //   //  will be called after submit only if there all things going well

    //   // const PhoneRegex = /^017[0-8]{8}|069[0-8]{8}$/;
    //   // const PhoneRegex = /^01[125][0-9]{8}$/;
    //   setErrorMsg(null);
    //   const errors = {};

    //   if (!values.email.includes("@") || !values.email.includes(".")) {
    //     errors.email = "Mail must have @ and .";
    //   }

    //   if (!(values.password.length >= 6 && values.password.length <= 12)) {
    //     errors.password = "The password should between 6 and 12 digits";
    //   }

    //   console.log(errors);
    //   return errors;
    // },
  });
  return (
    <>
      <div className="container py-5">
        <div className="row">
          {" "}
          <h6>If you have an account, you will receive a Message to your Mail box</h6>
          <form onSubmit={formikObject.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Enter your Email
              </label>
              <input
                onChange={formikObject.handleChange}
                value={formikObject.values.email}
                type="email"
                className="form-control"
                id="email"
                placeholder="Email address"
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
