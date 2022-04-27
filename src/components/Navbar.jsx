import React from "react";
import { useNavigate } from "react-router-dom";
import images from "../constant/Images";

const Navbar = () => {
  const user = false;

  const navigate = useNavigate();

  return (
    <div className="w-[90%] mx-auto p-5  bg-red-400 mb-9 flex flex-col md:flex-row md:justify-between ">
      <div
        className="flex h-10 cursor-pointer items-center justify-center"
        onClick={() => navigate("/")}
      >
        <img src={images.text} alt="text" className="w-40 h-full" />
        <img src={images.logo} alt="text-image" className="w-10 ml-2 h-full" />
      </div>
      <div
        className={`flex ${
          user ? "justify-between" : "justify-center"
        } mt-5 md:mt-0 md:flex-end items-center `}
      >
        {user && (
          <div className="md:mr-4 flex items-center">
            <div className="w-10 h-10 bg-indigo-600  rounded-full flex mr-2 ">
              <span className="m-auto text-white text-lg font-semibold ">
                G
              </span>
            </div>
            <h1 className="font-semibold text-lg  ">Ghalitsardev</h1>
          </div>
        )}
        {!user ? (
          <button
            className="w-fit bg-sky-500 p-2 font-[Poppins]  text-white font-semibold rounded-md shadow-md "
            onClick={() => navigate(`/auth`)}
          >
            Sign In
          </button>
        ) : (
          <button className="w-fit bg-sky-500 p-2 font-[Poppins]  text-white font-semibold rounded-md shadow-md ">
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
