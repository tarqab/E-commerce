import React, { useContext } from "react";
import { authContext } from "../../Context/authentication";

export default function Profile() {
  const { token } = useContext(authContext);

  if (token === null) {
    return <h2>your are not logged in</h2>;
  }

  return (
    <>
      <h2>Profile</h2>
    </>
  );
}
