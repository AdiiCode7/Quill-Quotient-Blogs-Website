import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import axios from "axios";


export default function Home() {
 const [Response, setResponse ]= useState("");
 const [blogData, setBlogData] = useState({
  title: '',
  snippets: '',
  body: ''
});
  // axios.get('http://localhost:5000/Home')
  // .then(response => {
  //   setResponse(response.data)
  //   console.log(response.data);

  // })
  // .catch(error => {
  //   // Handle errors here
  //   console.error('Error:', error);
  // });
  useEffect(() => {
    // Replace the URL with your server endpoint for fetching the blog data
    fetch('http://localhost:5000/Home') 
      .then(response => response.json())
      .then(data => {
        setBlogData(data); // Assuming the server sends the blog data as JSON
      })
      .catch(error => console.error('Error fetching blog data:', error));
  }, []); 
//   const loggedUsername = location.state && location.state.loggedUsername;
  return (
    <Layout>
    <>     
    <div className="App">
    <h1>{Response}</h1>
      
    <h1>Welcome to Home Page</h1>
      <p>User: {blogData.username || 'Guest'}</p>
      <p>Blog Title: {blogData.title || 'No Title'}</p>
      <p>Blog Snippets: {blogData.snippets || 'No Snippets'}</p>
      <p>Blog Body: {blogData.body || 'No Body'}</p>
    </div>
    </>
    </Layout>
  );
}
