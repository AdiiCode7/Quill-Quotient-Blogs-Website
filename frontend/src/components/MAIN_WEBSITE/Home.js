import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { Link } from 'react-router-dom';

function FrontPage() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:5000/Home');
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const result = await response.json();
        if (response.ok) {
          setBlogs(result.blogs);
        } else {
          setError(result.error);
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <Layout>

      <div>
      {error && <p>Error: {error}</p>}
      {blogs.length > 0 ? (
        blogs.map((blog) => 
        (
          <div key={blog._id} className='flex'>
          <div className='w-2 bg-orange-500 h-20 ml-8 mt-12'>
          </div>
          <div className='mt-12 ml-4'>
          <Link to={`/HomeDetail/${blog._id}`}>
          <h2 className='text-xl font-bold'>{blog.title}</h2>
          <p>{blog.snippets}</p>
            <p>Open the Blog to read .......</p></Link>   
            </div>    
          </div>
        ))
      ) : (
        <p>No blogs found <Link to="/Create"> <span className='text-blue-900 text-lg'>Create a New Blog</span> </Link></p>
        
      )}
    </div>
    </Layout>
  );
}

export default FrontPage;


