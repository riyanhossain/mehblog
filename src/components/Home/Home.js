import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  let navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetch("https://mehblog.herokuapp.com/blogs")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
      });
  });
  return (
    <Fragment>
      <div className="flex justify-center items-center">
        <div className=" flex flex-col justify-center items-center gap-y-6 mt-6">
          {[...articles]
            .reverse()
            .slice(0, 10)
            .map((item) => (
              <div className="w-[350px] lg:w-[800px] bg-gray-200 flex flex-col justify-center items-center shadow-lg rounded-sm">
                  <img
                    src={item.imageUrl}
                    alt=""
                    className="w-screen h-[220px] lg:h-[360px]"
                  />
                <div className="flex flex-col gap-y-4 w-11/12 mt-5 mb-5">
                  <Link to={`/article/${item._id}`} className="text-xl">
                    {item.title}
                  </Link>
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
              </div>
            ))}
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
