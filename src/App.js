import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import PostDetails from "./components/PostDetails";

const App = () => {
  const { authData } = useSelector((state) => state.user);
  return (
    <div className="mt-12">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/posts" />} />
        <Route path="/posts" element={<Home />} />
        <Route path="/posts/search" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route
          path="/auth"
          element={authData !== null ? <Navigate to={"/"} /> : <Auth />}
        />
      </Routes>
    </div>
  );
};

export default App;
