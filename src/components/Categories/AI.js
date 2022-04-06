import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AI() {
    let navigate = useNavigate(); 
    const [articles, setArticles] = useState([]);
    useEffect(()=>{
      fetch('https://mehblog.herokuapp.com/ai')
      .then(res => res.json())
      .then(data => {
        setArticles(data)
      })
    },[])
  return (
    <section>
    <div className='container flex justify-center items-center'> 
    <div className='w-4/5 flex flex-col justify-center items-center gap-y-6 mt-6'>
      {
                    [...articles].reverse().map(item => 
                      <div className='w-[350px] lg:w-[700px] bg-gray-200 flex flex-col justify-center items-center shadow-lg rounded-sm'>
                        <div className=' flex justify-center'>
                        <img src={item.imageUrl} alt="" className='w-full lg:w-[800px] h-[220px] lg:h-[360px]'/>
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

export default AI