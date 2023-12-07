import React, { useState } from 'react'
import Layout from './Layout'

export default function CreateBlog() {
    const [title,setTitle]= useState("");
    const [snippets,setSnippets]= useState("");
    const [body,setBody]= useState("");
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
    </div>
    </Layout>
  )
}
