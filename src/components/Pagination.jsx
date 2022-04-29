import React, { useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_POSTS } from "../api/apiCalls";

export default function Paginate({ page }) {
  const dispatch = useDispatch();
  const { numberOfPages, currentPage } = useSelector((state) => state.posts);
  useEffect(() => {
    if (page) {
      FETCH_POSTS(page, dispatch);
    }
  }, [page]);

  return (
    <Stack
      spacing={2}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Pagination
        count={numberOfPages}
        page={currentPage || 1}
        renderItem={(item) => {
          return (
            <PaginationItem
              {...item}
              component={Link}
              to={`/posts?page=${item.page}`}
              components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            />
          );
        }}
      />
    </Stack>
  );
}
