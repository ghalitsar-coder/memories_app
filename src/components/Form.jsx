import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_POST, UPDATE_POST } from "../api/apiCalls";
import { clearPost } from "../redux/postsRedux";
import { useLocation, useNavigate } from "react-router-dom";

const Form = () => {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { authData } = useSelector((state) => state.user);
  const { post } = useSelector((state) => state.posts);
  const location = useLocation();

  const clear = () => {
    setFormData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  useEffect(() => {
    if (post) {
      console.log(post);
      setFormData(post);
    }
  }, [post]);

  useEffect(() => {
    dispatch(clearPost());
    clear();
  }, [location]);



  const handleChange = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    if (key === "tags") {
      setFormData({ ...formData, [key]: value.split(",") });
    } else {
      setFormData({ ...formData, [key]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!post) {
      CREATE_POST({ ...formData, creator: authData?.result?.name }, dispatch);
    } else {
      UPDATE_POST(formData, dispatch);
      dispatch(clearPost());
    }

    clear();
  };

  if (!authData) {
    return (
      <div className="flex-1 h-fit grid place-content-center p-5 rounded-lg shadow-lg">
        <h1 className="text-lg font-[Poppins] my-10">Create a Memory!</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/auth")}
        >
          SIGN In
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full p-2 flex flex-col h-fit shadow-md rounded-md">
      <h1 className="font-semibold text-center text-xl  ">
        {post ? "Editing" : "Creating"} a Memory
      </h1>
      <form onSubmit={handleSubmit} className="my-4 flex flex-col  gap-y-5">
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic"
          label="Message"
          variant="outlined"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic"
          label="Tags"
          variant="outlined"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
        />
        <FileBase
          type="file"
          multiple={false}
          value={formData.selectedFile}
          name="selectedFile"
          onDone={({ base64 }) =>
            setFormData({ ...formData, selectedFile: base64 })
          }
          required
          placeholder=""
        />
        <Button variant="contained" type="submit" color="secondary">
          {post ? "edit" : "Create"}
        </Button>
      </form>
    </div>
  );
};

export default Form;
