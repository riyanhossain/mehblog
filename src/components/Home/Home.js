import React from 'react'

function Home() {
  const data =[{
    id: 1,
    Image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    Title: 'Lorem ipsum dolor sit amet',
    Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    Button: 'Read More',
    category: 'Internet',
},
{
    id: 2,
    Image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    Title: 'Lorem ipsum dolor sit amet',
    Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    Button: 'Read More',
    category: 'Internet',
},
{
    id: 3,
    Image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    Title: 'Lorem ipsum dolor sit amet',
    Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    Button: 'Read More',
    category: 'Internet',
}];
  return (
    <section>
      <div className='container flex justify-center items-center'> 
      <div className='w-4/5 flex flex-col justify-center items-center gap-y-6 mt-6'>
        {
                    data.map(item => 
                      <div className='bg-gray-200 flex flex-col justify-center items-center shadow-lg rounded-sm'>
                        <div className='flex justify-center mt-5'>
                        <img src={item.Image} alt="" className='w-11/12 h-[220px] lg:h-[300px]'/>
                        </div>
                        <div className='flex flex-col gap-y-4 w-11/12 mt-5 mb-5'>
                          <a href="/" className='text-xl'>{item.Title}</a>
                          <p className=''>{item.Description.slice(0,100)}...<span><button className='text-lime-600'>"{item.Button}"</button></span></p>
                          
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