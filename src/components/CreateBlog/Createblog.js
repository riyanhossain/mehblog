import styled from "@emotion/styled";
import { PhotoCamera } from "@mui/icons-material";
import { Button, IconButton, Stack } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import "../../App.css";

function Createblog() {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);

  // const userLocal=JSON.parse(localStorage.getItem('user'));
  const [blog, setBlog] = useState({
    title: "",
    imageUrl: "",
    description: "",
    blogger: user.displayName,
    // ? user.displayName:userLocal.displayName,
    bloggerMail: user.email,
    // ? user.email:userLocal.email,
    category: "",
    date: new Date().toLocaleDateString().split(",")[0],
    comments: [],
    approval: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    //post
    fetch("https://mehblog.herokuapp.com/blog", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(blog),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    navigate(`/`);
  };

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setBlog({ ...blog, [name]: value });
    console.log(blog);
  };
  const Input = styled("input")({
    display: "none",
  });
  const [selectedImage, setSelectedImage] = useState("");
  const uploadImage = (e) => {
    const imageData = new FormData();
    imageData.append("file", selectedImage);
    imageData.append("upload_preset", "wslmylxt");
    axios
      .post("https://api.cloudinary.com/v1_1/dqdll5wus/image/upload", imageData)
      .then((res) => {
        setBlog({ ...blog, [e.target.name]: res.data.secure_url });
      });
  };
  return (
    <section>
      <div className="w-screen flex justify-center items-center mt-5">
        <div className="w-4/5  shadow-md lg:w-1/3 flex flex-col justify-center items-center">
          {/* <button className="bg-cyan-500 w-full" onClick={()=>uploadImage()}>Sub</button> */}

          <form
            action="/"
            onSubmit={handleSubmit}
            className="w-11/12 gap-y-5 flex flex-col justify-center items-center"
          >
            <p className="font-bold text-xl text-lime-500">Create Blog</p>
            {blog.imageUrl !== '' && <img src={blog.imageUrl} alt="" className="h-72 w-full" />}
            {/* <input
              placeholder="Image URL"
              type="text"
              name="imageUrl"
              className="bg-gray-200 p-2 w-full outline-lime-500"
              value={blog.imageUrl}
              onChange={handleInputs}
              required
            /> */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              className="w-full bg-gray-200 flex justify-center"
            >
              <label htmlFor="icon-button-file">
                <span className="text-blue-500 font-bold">Upload Image</span>
                <Input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  name="imageUrl"
                  onChange={(e) => {
                    setSelectedImage(e.target.files[0]);
                    uploadImage(e);
                  }}
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </Stack>

            <input
              placeholder="Title"
              type="text"
              name="title"
              className="bg-gray-200 p-2 w-full outline-lime-500"
              value={blog.title}
              onChange={handleInputs}
              required
            />
            <textarea
              placeholder="Description"
              name="description"
              className="bg-gray-200 p-2 w-full outline-lime-500"
              value={blog.description}
              onChange={handleInputs}
              required
            />
            <select
              name="category"
              id=""
              className="bg-gray-200 p-2 w-full"
              onChange={(e) => {
                setBlog({ ...blog, [e.target.name]: e.target.value });
              }}
            >
              <option type="text" value="Not Specified" name="category">
                Choose category
              </option>
              <option type="text" value="Tech" name="category">
                Tech
              </option>
              <option type="text" value="Programing" name="category">
                Programing
              </option>
              <option type="text" value="AI" name="category">
                AI
              </option>
              <option type="text" value="Maching Learning" name="category">
                Maching Learning
              </option>
              <option type="text" value="Blockchain" name="category">
                Blockchain
              </option>
            </select>
            <button
              type="submit"
              className="p-2 bg-lime-500 text-white w-full mb-5"
            >
              Create blog
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Createblog;
