import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Article() {
  const [article, setArticle] = useState([]);
  let { id } = useParams();
  console.log(article.imageUrl);
  useEffect(() => {
    fetch("http://localhost:5000/article/" + id)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
      });
  },[]);
  return (
    <section>
      <div className="container flex justify-center items-center">
        <div className="w-4/5 flex flex-col justify-center items-center gap-y-6 mt-6">
          {article.map((item) => (
            <div className="w-[350px] lg:w-[700px] bg-gray-200 flex flex-col justify-center items-center shadow-lg rounded-sm">
              <div className=" flex justify-center">
                <img
                  src={item.imageUrl}
                  alt=""
                  className="w-full lg:w-[800px] h-[220px] lg:h-[280px]"
                />
              </div>
              <div className="flex flex-col gap-y-4 w-11/12 mt-5 mb-5">
                <p className="text-xl">
                  {item.title}
                </p>
                <p className="">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Article;
