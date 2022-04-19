import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import NoArticles from "../images/no-articles.jpg";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

function Myblogs() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [user, setUser] = useContext(UserContext);
  let navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetch("https://mehblog.herokuapp.com/myblogs")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
      });
  });
  //delete article
  const deleteArticle = (id) => {
    fetch(`https://mehblog.herokuapp.com/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => console.log(data));
  };

  const handleSubmit = (id) => {
    console.log(id);
    // e.preventDefault();
    fetch(`https://mehblog.herokuapp.com/updateMyblog/${id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updateBlog),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => console.log(data));

    // navigate("/myblogs");
    setOpen(false);
  };

  const [category, setCategory] = useState({
    Tech: false,
    Programing: false,
    AI: false,
    ML: false,
    Blockchain: false,
  });
  const selectCategory = (category) => {
    for (let i = 0; i < articles.length; i++) {
      if (articles[i].category === category) {
        setCategory({ [articles[i].category]: true });
      }
    }
  };
  const [updateBlog, setUpdateBlog] = useState([]);
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUpdateBlog({ ...updateBlog, [name]: value });
  };
  // const updateBlogg = (id) => {
  //   fetch(`http://localhost:5000/updateMyblog/${id}`,{
  //     method: 'PATCH',
  //     headers: {'Content-type' : 'application/json'},
  //     body : JSON.stringify(updateBlog)
  // })
  //   .then(res => {
  //     return res.json()
  //   })
  //   .then(data => console.log(data))
  // }
  return (
    <section>
      <div className="container flex justify-center items-center">
        <div className="w-4/5 flex flex-col justify-center items-center gap-y-6 mt-6">
          {articles.length !== 0 ? (
            [...articles].reverse().map((item) => (
              <div className="w-[350px] lg:w-[700px] bg-gray-200 flex flex-col justify-center items-center shadow-lg rounded-sm">
                <div className=" flex justify-center">
                  <img
                    src={item.imageUrl}
                    alt=""
                    className="w-full lg:w-[800px] h-[220px] lg:h-[360px]"
                  />
                </div>
                <div className="flex flex-col gap-y-4 w-11/12 mt-5 mb-5">
                  <a href={`/article/${item._id}`} className="text-xl">
                    {item.title}
                  </a>
                  <p className="">
                    {item.description.slice(0, 100)}...
                    <span>
                      <button
                        className="text-lime-600"
                        onClick={() => navigate(`/article/${item._id}`)}
                      >
                        "Read more"
                      </button>
                    </span>
                  </p>
                </div>
                <div className="flex gap-4 w-full">
                  <button
                    className="p-2 px-5 font-semibold text-white bg-green-600 w-1/2"
                    onClick={() => {
                      handleOpen();
                      selectCategory(item.category);
                      setUpdateBlog(item);
                    }}
                  >
                    Update
                  </button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style} className="w-screen lg:w-2/4">
                      <div className="w-full  shadow-md flex flex-col justify-center items-center">
                        <form
                          action="/"
                          onSubmit={() => handleSubmit(item._id)}
                          className="w-11/12 gap-y-5 flex flex-col justify-center items-center"
                        >
                          <p className="font-bold text-xl text-lime-500">
                            Create Blog
                          </p>
                          <input
                            placeholder="Image URL"
                            type="text"
                            name="imageUrl"
                            className="bg-gray-200 p-2 w-full outline-lime-500"
                            value={updateBlog.imageUrl}
                            onChange={handleInputs}
                            required
                          />

                          <input
                            placeholder="Title"
                            type="text"
                            name="title"
                            className="bg-gray-200 p-2 w-full outline-lime-500"
                            value={updateBlog.title}
                            onChange={handleInputs}
                            required
                          />
                          <textarea
                            placeholder="Description"
                            name="description"
                            className="bg-gray-200 p-2 w-full outline-lime-500"
                            value={updateBlog.description}
                            onChange={handleInputs}
                            required
                          />

                          <select
                            name="category"
                            id=""
                            className="bg-gray-200 p-2 w-full"
                            onChange={(e) => {
                              setUpdateBlog({
                                ...updateBlog,
                                [e.target.name]: e.target.value,
                              });
                            }}
                          >
                            <option
                              type="text"
                              value="Tech"
                              name="category"
                              selected={category.Tech}
                            >
                              Tech
                            </option>
                            <option
                              type="text"
                              value="Programing"
                              name="category"
                              selected={category.Programing}
                            >
                              Programing
                            </option>
                            <option
                              type="text"
                              value="AI"
                              name="category"
                              selected={category.AI}
                            >
                              AI
                            </option>

                            <option
                              type="text"
                              value="Maching Learning"
                              name="category"
                              selected={category.ML}
                            >
                              Maching Learning
                            </option>

                            <option
                              type="text"
                              value="Blockchain"
                              name="category"
                              selected={category.Blockchain}
                            >
                              Blockchain
                            </option>
                          </select>
                          <button
                            type="submit"
                            className="p-2 bg-lime-500 text-white w-full mb-5"
                          >
                            Update blog
                          </button>
                        </form>
                      </div>
                    </Box>
                  </Modal>
                  <button
                    className="p-2 px-5 p-x-6 font-semibold text-white bg-red-600 w-1/2"
                    onClick={() => deleteArticle(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold">No articles found</p>
              <img src={NoArticles} alt="helo" className="w-96 h-96" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Myblogs;
