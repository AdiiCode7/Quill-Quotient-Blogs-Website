import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from './Layout';
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";
// import Example from '../SIGN_IN_UP/Loading';

const HomePageDetails= () => {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/HomeDetail/${id}`);
        const data = await response.json();

        if (response.ok) {
            console.log('Fetched data:', data);
          setBlog(data.blogs);
        } else {
          console.error('Error fetching blog details');
        }
      } catch (error) {
        console.error('Internal server error');
      }
    };

    fetchData();
  }, [id]);


  return (
    <Layout>
      <div>
      {blog ? (
        <div className='flex relative'>
        <div className='mt-12 ml-4'> 
          <h2>{blog.title}</h2>
          <h3>{blog.snippets}</h3>
          <p>{blog.body}</p>
          <p>Poste By : {blog.username}</p>
        </div>

        {/* <button onClick={handleDelete} className="absolute top-8 right-0 mt-2 mr-24 p-2 text-white rounded-full">       
              🗑️
            </button> */}
</div>
      ) : (
    /* <p className='text-4xl mt-24 ml-12 text-orange-500'>Loading...</p> */
        {/* <Example type="bars" color="#ff0000" /> */}
      )}
    </div>
    </Layout>
  );
};

export default HomePageDetails;
