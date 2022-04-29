import { Alert, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import GoogleIcon from "@mui/icons-material/Google";
import { useDispatch, useSelector } from "react-redux";
import { USER_LOGIN, USER_REGISTER } from "../api/apiCalls";
import { authSuccess, errorGone } from "../redux/usersRedux";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [authData, setAuthData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();

  const { error } = useSelector((state) => state.user);

  const clear = () => {
    setAuthData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleChange = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    setAuthData({ ...authData, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { confirmPassword, ...rest } = authData;
    if (!isLogin) {
      if (confirmPassword !== rest.password) {
        return alert("Password doesn`t match!");
      }
      USER_REGISTER(rest, dispatch);
    } else {
      const { email, password } = authData;
      USER_LOGIN({ email, password }, dispatch);
    }
  };

  const googleSuccess = (res) => {
    const token = res?.tokenId;
    const result = res?.profileObj;
    dispatch(authSuccess({ token, result }));
  };

  const googleFailure = (err) => {
    console.log("Google sign in was unsuccessful. Try again later");
  };

  if (error) {
    setTimeout(() => {
      dispatch(errorGone());
    }, 2000);
  }

  return (
    <div className="w-[90%] mx-auto flex  place-content-center flex-col ">
      {error && <Alert severity="error">{error}</Alert>}
      <div className="p-5  min-w-fit  mx-auto shadow-lg rounded-lg">
        <div className="flex flex-col text-center ">
          {!isLogin ? (
            <>
              <h1 className="text-4xl font-semibold ">Create new Account!</h1>
              <p className="text-md my-5 text-slate-500 ">
                Maximus bibendum libero malesuada litora nibh velit gravida
                vitae porttitor
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl  font-semibold ">Hello Again!</h1>
              <p className="text-md  my-5 text-slate-500 ">
                At mattis ornare sollicitudin bibendum sapien sociosqu inceptos
                himenaeos adipiscing
              </p>
            </>
          )}
        </div>

        <form onSubmit={handleSubmit} className="my-4 flex flex-col  gap-y-5">
          {!isLogin && (
            <>
              <div className="w-full flex gap-2 order-1 ">
                <TextField
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  name="firstName"
                  value={authData.firstName}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  name="lastName"
                  value={authData.lastName}
                  onChange={handleChange}
                  fullWidth
                />
              </div>
            </>
          )}
          <div
            className={`w-full flex flex-col gap-5 ${!isLogin && "order-2"} `}
          >
            <TextField
              id="outlined-basic"
              label="email"
              variant="outlined"
              name="email"
              value={authData.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              id="outlined-basic"
              label="password"
              variant="outlined"
              name="password"
              value={authData.password}
              type="password"
              onChange={handleChange}
              fullWidth
            />
          </div>

          {!isLogin && (
            <TextField
              id="outlined-basic"
              label="Confirm Password"
              variant="outlined"
              name="confirmPassword"
              className="order-3"
              value={authData.confirmPassword}
              onChange={handleChange}
              type="password"
            />
          )}

          <Button
            variant="contained"
            className="order-4"
            type="submit"
            color="secondary"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </Button>
        </form>
        <GoogleLogin
          clientId="1083392709944-bt4r7r2q64aal2tlko99t1pnjgecad2c.apps.googleusercontent.com"
          render={(renderProps) => (
            <Button
              variant="contained"
              type="submit"
              color="inherit"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              fullWidth
              sx={{
                bgcolor: "#fff",
                color: "#000",
                display: "flex",
                alignItems: "center",
                margin: "10px 0",
              }}
            >
              <span className="ml-2">Sign in with Google</span>
            </Button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy="single_host_origin"
        />
        <h1
          className="font-semibold font-[Poppins] text-center text-slate-500 cursor-pointer "
          onClick={() => {
            setIsLogin(!isLogin);
            clear();
          }}
        >
          {!isLogin
            ? "Already have an account? Sign In"
            : "Create a new account"}
        </h1>
      </div>
    </div>
  );
};

export default Auth;
