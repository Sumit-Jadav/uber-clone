import React, { useEffect } from "react";
import { UserContext } from "../contex/UserContex";
import { useNavigate } from "react-router-dom";
const UserProtectedWrapper = ({ children }) => {
  const { user } = React.useContext(UserContext);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      console.log(token);
      navigate("/login");
    }
  }, [token, navigate]);

  // if (!token) {
  //   console.log(token);
  //   navigate("/login");
  // }
  return <div>{children}</div>;
};

export default UserProtectedWrapper;
