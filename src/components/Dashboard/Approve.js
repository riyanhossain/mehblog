import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NoArticles from "../images/no-articles.jpg";

function Approve() {
  const deleteArticle = (id) => {
    fetch(`https://mehblog.herokuapp.com/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => console.log(data));
  };

  let navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetch("https://mehblog.herokuapp.com/approval")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
      });
  });

  const grantApprove = (id) => {
    fetch(`https://mehblog.herokuapp.com/approve/${id}`, {
      method: "PATCH",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => console.log(data));
  };
  return (
    <Fragment>
      <div className="flex justify-center items-center">
        <div className=" flex flex-col justify-center items-center gap-y-6 mt-6">
          {articles.length !== 0 ? (
            [...articles].reverse().map((item) => (
              <div className="w-[350px] lg:w-[800px] bg-gray-200 flex flex-col justify-center items-center shadow-lg rounded-sm">
                {/* <img
                  src={item.imageUrl}
                  alt=""
                  className="w-screen h-[220px] lg:h-[360px]"
                /> */}
                <div className="flex flex-col gap-y-4 w-11/12 mt-5 mb-5">
                  <Link to={`/dashboard/article/${item._id}`} className="text-xl">
                    {item.title}
                  </Link>
                  <p className="">
                    {item.description.slice(0, 200)}...
                    <span>
                      <button
                        className="text-lime-600"
                        onClick={() =>
                          navigate(`/dashboard/article/${item._id}`)
                        }
                      >
                        "Read more"
                      </button>
                    </span>
                  </p>
                  <div className="flex gap-x-4 w-full">
                    <button
                      className="p-2 px-5 font-semibold text-white bg-green-600 w-1/2"
                      onClick={() => grantApprove(item._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="p-2 px-5 font-semibold text-white bg-red-600 w-1/2"
                      onClick={() => deleteArticle(item._id)}
                    >
                      Discard
                    </button>
                  </div>
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
    </Fragment>
  );
}

export default Approve;
