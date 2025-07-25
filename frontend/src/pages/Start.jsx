import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div>
      <div className="bg-contain  bg-top  bg-[url('traffic.png')] h-screen pt-8  w-full  flex  justify-between flex-col">
        <img className="w-16 ml-9" src="Uber.png" alt="" />
        <div className="bg-white w-full pb-7 py-4 px-4">
          <h2 className="text-[30px] font-bold">Get Started with Uber</h2>
          <Link
            to="/login"
            className="flex items-center justify-center bg-black w-full text-white py-3 rounded-lg mt-5"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
