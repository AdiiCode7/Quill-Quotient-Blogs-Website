import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
import Example from "../SIGN_IN_UP/Loading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// import { useNavigate } from "react-router-dom";

const UsersBlogsDetailsPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  const Navigate = useNavigate();
  const [updatedData, setUpdatedData] = useState({
    title: "",
    snippets: "",
    body: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/UserBlogDetail/${id}`);
        const data = await response.json();

        if (response.ok) {
          console.log("Fetched data:", data);
          setBlog(data.blogs);
          setUpdatedData({
            title: data.blogs,
            snippets: data.blogs.snippets,
            body: data.blogs.body,
          });
        } else {
          console.error("Error fetching blog details");
        }
      } catch (error) {
        console.error("Internal server error");
      }
    };

    fetchData();
  }, [id]);
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/UserBlogDetail/${id}`);
      // setBlogs(blogs.filter(blog => blog._id !== deleteId));
      Navigate("/AllBlogs");
      console.log(response.data.message);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`/UserBlogDetail/${id}`, updatedData);
      console.log("Updated item:", response.data);
      Navigate("/AllBlogs");
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  return (
    <Layout>
      <div>
        {blog ? (
          <div className="flex relative">
            <div className="mt-12 ml-4">
              <h2>{blog.title}</h2>
              <h3>{blog.snippets}</h3>
              <p>{blog.body}</p>
              <p>Poste By : {blog.username}</p>
            </div>
            <button
              onClick={handleUpdate}
              className="absolute top-8 right-0 mt-2 mr-24 p-2 text-white bg-yellow rounded-full"
            >
              Update
            </button>
            <button
              onClick={handleDelete}
              className="absolute top-8 right-0 mt-2 mr-24 p-2 text-white rounded-full"
            >
              🗑️
            </button>
          </div>
          
          
        ) : (
          /* <p className='text-4xl mt-24 ml-12 text-orange-500'>Loading...</p> */
          {
            /* <Example type="bars" color="#ff0000" /> */
          }
        )}
      </div>
    </Layout>
  );
};

export default UsersBlogsDetailsPage;
