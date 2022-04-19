import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Article() {
  const [article, setArticle] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    fetch("https://mehblog.herokuapp.com/article/" + id)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
      });
  }, []);
  const [comment, setComment] = useState({
    name: "",
    comment: "",
  });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setComment({ ...comment, [name]: value });
  };

  const handleSubmit = (e) => {
    article[0].comments = [...article[0].comments, comment];
    setArticle(article);
    setComment({
      name: "",
      comment: "",
    });
    e.preventDefault();
    //update
    fetch(`https://mehblog.herokuapp.com/updateComments/${id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(article),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => console.log(data));
  };
  return (
    <section>
      <div className="container flex justify-center items-center">
        <div className="w-4/5 flex flex-col justify-center items-center gap-y-6 mt-6">
          {article.map((item) => (
            <div className="w-[350px] lg:w-[700px] bg-gray-100 flex flex-col justify-center items-center shadow-lg rounded-sm">
              <div className=" flex justify-center">
                <img
                  src={item.imageUrl}
                  alt=""
                  className="w-full lg:w-[800px] h-[220px] lg:h-[360px]"
                />
              </div>
              <div className="flex flex-col gap-y-4 w-11/12 mt-5 mb-5">
                <p className="text-xl">{item.title}</p>
                <p className="support-line-break">{item.description}</p>
              </div>
              <div className="flex flex-col gap-y-4 w-11/12 mt-5 mb-5">
                <form
                  action={`/article/${id}`}
                  className="w-full flex flex-col gap-y-4"
                  onSubmit={handleSubmit}
                >
                  <input
                    className=" p-1 w-full outline-cyan-500"
                    name="name"
                    value={comment.name}
                    onChange={handleInputs}
                    placeholder="Name"
                    required
                  />
                  <textarea
                    className=" p-1 w-full outline-cyan-500"
                    name="comment"
                    value={comment.comment}
                    onChange={handleInputs}
                    placeholder="Comment"
                    required
                  />
                  <button className="bg-cyan-500 p-1 text-white" type="submit">
                    Comment
                  </button>
                </form>
                <p className="text-lg p-1 bg-lime-200 w-full font-semibold">
                  Comments({item.comments.length})
                </p>
                {item.comments.map((comment) => (
                  <div className="flex flex-col gap-y-1 rounded shadow-md border-2 border-lime-200">
                    <p className="text-sm p-2 font-bold text-lime-600 ">
                      {comment.name}
                    </p>
                    <p className="text-sm p-2 font-serif	 ">{comment.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Article;
