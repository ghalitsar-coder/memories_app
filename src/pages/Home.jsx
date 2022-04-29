import React, { useEffect } from "react";
import Form from "../components/Form";
import Posts from "../components/Posts";
import { FETCH_POSTS } from "../api/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import SearchTerms from "../components/SearchTerms";
import Paginate from "../components/Pagination";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {


  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  return (
    <div className="w-[90%] mx-auto  flex flex-col-reverse md:flex-row">
      <Posts />
      <div className="flex-1">
        <SearchTerms />
        <Form />
        <div className="mt-4 shadow-md rounded-md p-3">
          <Paginate page={page} />
        </div>
      </div>
    </div>
  );
};

export default Home;
