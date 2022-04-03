import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {

  let navigate = useNavigate(); 
  const [articles, setArticles] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:5000/blogs')
    .then(res => res.json())
    .then(data => {
      setArticles(data)
    })
  },[])
  return (
    <section>
      <div className='flex justify-center items-center'> 
      <div className=' flex flex-col justify-center items-center gap-y-6 mt-6'>
        {
                    articles.map(item => 
                      <div className='w-[350px] lg:w-[700px] bg-gray-200 flex flex-col justify-center items-center shadow-lg rounded-sm'>
                        <div className=' flex justify-center'>
                        <img src={item.imageUrl} alt="" className='w-full lg:w-[800px] h-[220px] lg:h-[280px]'/>
                        </div>
                        <div className='flex flex-col gap-y-4 w-11/12 mt-5 mb-5'>
                          <a href="/" className='text-xl'>{item.title}</a>
                          <p className=''>{item.description.slice(0,100)}...<span><button className='text-lime-600' onClick={() => navigate(`/article/${item._id}`)}>"Read more"</button></span></p>
                          
                        </div>
                      </div>
                      )
        }

      </div>
      </div>
      
    </section>
  )
}

export default Home