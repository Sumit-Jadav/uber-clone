import React, { useEffect } from "react";
import { CaptainContext } from "../contex/CaptainContex";
import { useNavigate } from "react-router-dom";

const CaptainProtectedWrapper = ({ children }) => {
  const { user } = React.useContext(CaptainContext);
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

export default CaptainProtectedWrapper;
