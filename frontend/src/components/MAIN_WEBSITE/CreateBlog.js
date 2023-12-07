import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import axios from 'axios';
export default function CreateBlog() {

    const [title,setTitle]= useState("");
    const [snippets,setSnippets]= useState("");
    const [body,setBody]= useState("");
    
    const HandleClick=()=>{
        axios
        .post("http://localhost:5000/Create", {
          title: title,
          snippets : snippets,
          body: body,
        })
        .then((res) => {
          console.log(res.data);
          console.log("Saved")
        })
        .catch((error) => {
          console.error(error);
        });
}
  return (
    <Layout>
    <div>
        <input type='text' placeholder='Enter The Title Of Blog' onChange={(event)=>{
            setTitle(event.target.value)
        }} ></input><br>
        </br>
        <br></br>
        <input type='text' placeholder='Enter The Snippets Of Blog' onChange={(event)=>{
            setSnippets(event.target.value)
        }}></input><br></br>
        <br></br>
         <textarea placeholder='enter the blog Content' onChange={(event)=>{
            setBody(event.target.value)
        }}>
         </textarea>
         <button onClick={HandleClick}>
            Post a Blogs
         </button>
    </div>
    </Layout>
  )
}
