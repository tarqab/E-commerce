import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState(null);
  const [email, setEmail] = useState(null);

  const navigate = useNavigate();

  async function resetNewPassword(event) {
    event.preventDefault();
    // console.log("email and pass", email, newPassword);

    try {
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          email: email,
          newPassword: newPassword,
        }
      );

      console.log(data);
      if (data.token) {
        toast.success("Your password is reset successfully");
        navigate("/login");
      } else {
        toast.error("error occurred please try from the beginning again!");
      }
    } catch (error) {
      console.log(error);
      toast.error("error occurred please try from the beginning again!");
    }
  }

  return (
    <>
      <div className="container py-5">
        <div className="row">
          <form
            onSubmit={function (event) {
              resetNewPassword(event);
            }}
          >
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Enter your Mail address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="form-control"
                id="email"
                placeholder="Your email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                Enter your Code
              </label>
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                type="text"
                className="form-control"
                id="code"
                placeholder="New password"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Change now
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
