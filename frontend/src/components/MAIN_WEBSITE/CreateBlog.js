
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import React, { useState} from 'react'
import Layout from './Layout';
// export {a, b, c};

// let a;
// let b;
// let c;
export default function CreateBlog() {
 const navigate = useNavigate();
  const [title, setTitle] = useState("");
 const [snippets, setSnippets] = useState("");
 const [body, setBody] = useState("")

//   const [Gtitle, setGTitle] = useState("");
//  const [Gsnippets, setGSnippets] = useState("");
//   const [Gbody, setGBody] = useState("");

 const handleClick = () => {
    axios
      .post("http://localhost:5000/Create", {
        title: title,
        snippets: snippets,
        body: body,
      })
      .then((res) => {
        if (res) {
        //  res.data.title
        //  res.data.Snips
        // res.data.body

        //   console.log(a);
          navigate("/FrontPage");
          console.log("Saved");
        }
      })
      .catch((error) => {
        console.error(error);
      });
 };
  return (
    <Layout>
    <div className="">
    <div className="mx-96 mt-20">
        <input type='text' placeholder='Enter The Title Of Blog' onChange={(event)=>{
            setTitle(event.target.value)
        }} 
        className="w-80 rounded h-8 pl-4 ml-16"
        ></input><br>
        </br>
        <br></br>
        <input type='text' placeholder='Enter The Snippets Of Blog' onChange={(event)=>{
            setSnippets(event.target.value)
        }}
        className="w-80 rounded h-8 pl-4 ml-16"
        ></input><br></br>
        <br></br>
         <textarea placeholder='enter the blog Content' onChange={(event)=>{
            setBody(event.target.value)
        }}
        className="w-80 rounded h-40 pl-4 ml-16 border-orange-500"
        >
         </textarea><br></br>
         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-12 rounded mt-4 ml-32"
          onClick={handleClick}>
            Post a Blogs
         </button>
         </div>
    </div>
    </Layout>
  )
}

