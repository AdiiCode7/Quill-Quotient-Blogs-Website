import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import { LineWave } from "react-loader-spinner";

function FrontPage() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let timeoutID;
    async function fetchData() {
      timeoutID = setTimeout(async () => {
        try {
          const response = await fetch("http://localhost:5000/Home");
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
          console.error("There was a problem with the fetch operation:", error);
        }
      }, 2000);
    }
    fetchData();
    return () => {
      clearTimeout(timeoutID);
    };
  }, []);

  return (
    <Layout>
      <div>
        {error && <p>Error: {error}</p>}
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id} className="flex">
              <div className="w-2 bg-orange-500 h-20 ml-8 mt-12"></div>
              <div className="mt-12 ml-4">
                <Link to={`/HomeDetail/${blog._id}`}>
                  <h2 className="text-xl font-bold">{blog.title}</h2>
                  <p>{blog.snippets}</p>
                  <p>Open the Blog to read .......</p>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div class="min-h-screen flex items-center justify-center">
           <LineWave
  height="200"
  width="200"
  color="#FFA500"
  ariaLabel="line-wave"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  firstLineColor=""
  middleLineColor=""
  lastLineColor=""
/>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default FrontPage;
