import { Avatar, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import images from "../constant/Images";
import { authLogout } from "../redux/usersRedux";
import decode from "jwt-decode";

const Navbar = () => {
  const { authData } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const token = authData?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(authLogout());
      }
    }
  }, [location]);

  return (
    <div className="w-[90%] mx-auto p-5 shadow-lg rounded-lg   mb-9 flex flex-col md:flex-row md:justify-between ">
      <div
        className="flex h-10 cursor-pointer items-center justify-center"
        onClick={() => navigate("/")}
      >
        <img src={images.text} alt="text" className="w-40 h-full" />
        <img src={images.logo} alt="text-image" className="w-10 ml-2 h-full" />
      </div>
      <div
        className={`flex ${
          authData ? "justify-between" : "justify-center"
        } mt-5 md:mt-0 md:flex-end items-center `}
      >
        {authData && (
          <div className="md:mr-4 flex items-center">
            {authData?.result?.imageUrl ? (
              <Avatar
                alt={authData.result.name}
                src={authData?.result?.imageUrl}
              >
                {authData.result.name.charAt(0).toUpperCase()}
              </Avatar>
            ) : (
              <div className="w-10 h-10 bg-indigo-600  rounded-full flex mr-2 ">
                <span className="m-auto text-white text-lg font-semibold ">
                  {authData.result.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}

            <h1 className="font-semibold text-lg ml-2 ">
              {" "}
              {authData.result.name}{" "}
            </h1>
          </div>
        )}
        {!authData ? (
          location.pathname !== "/auth" && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/auth")}
            >
              Sign in
            </Button>
          )
        ) : (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => dispatch(authLogout())}
          >
            logout
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
