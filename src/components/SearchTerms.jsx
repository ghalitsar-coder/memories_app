import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import ChipInput from "material-ui-chip-input";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FETCH_POSTS_BY_SEARCH } from "../api/apiCalls";
const SearchTerms = () => {
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim() || tags) {
      FETCH_POSTS_BY_SEARCH({ search, tags: tags.join(",") }, dispatch);
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 p-4 rounded-lg shadow-lg ">
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        name="Search"
        value={search}
        onKeyPress={handleKeyPress}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ChipInput
        id="outlined-basic"
        label="Tags"
        variant="outlined"
        name="tags"
        value={tags}
        onAdd={(tag) => setTags([...tags, tag])}
        onDelete={(tag) => setTags(tags.filter((t) => t !== tag))}
      />
      <Button
        variant="contained"
        type="submit"
        onClick={handleSearch}
        color="secondary"
      >
        search
      </Button>
    </div>
  );
};

export default SearchTerms;
