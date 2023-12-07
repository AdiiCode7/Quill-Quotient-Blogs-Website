import React, { useState } from "react";
import Layout from "./Layout";
import axios from "axios";


export default function Home() {
 const [Response, setResponse ]= useState("");
  axios.get('http://localhost:5000/Home')
  .then(response => {
    setResponse(response.data)
    console.log(response.data);

  })
  .catch(error => {
    // Handle errors here
    console.error('Error:', error);
  });
//   const loggedUsername = location.state && location.state.loggedUsername;
  return (
    <Layout>
    <>     
    <div className="App">
    <h1>{Response}</h1>
      {/* {loggedUsername && <p>Logged in as: {loggedUsername}</p>} */}
    </div>
    </>
    </Layout>
  );
}
