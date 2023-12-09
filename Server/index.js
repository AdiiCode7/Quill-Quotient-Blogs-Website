const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const SignUp = require("./Signin");
const router = express.Router();
const blogs = require("./BlogsData");
console.log("Hey Server!!!!");
const dbURI =
  "mongodb+srv://buniversity4:Adeel044@shariqadeel.6dniwds.mongodb.net/BlogsData?retryWrites=true&w=majority"; // Replace with your MongoDB URI
const app = express();
mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => {
      console.log(`Server is listening on Port 5000`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
app.use(express.json());
app.use(cors());

let loggedInUsername;
let BlogBody;
let BlogSnip;
let BlogTitle;
app.post("/signup", async (req, res) => {
  console.log("Hello go Down There");
  try {
    console.log("Trying");
    const { username, email, password } = req.body;
    const newLogin = new SignUp({ username, email, password });
    await newLogin.save();
    console.log("Saved");
    res.status(200).json({message: "Login SuccessFull"})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  console.log("Credentials Checking !!!!!");
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await SignUp.findOne({ username, password });
    if (!user) {
      console.log("No User Found Sorry");
      return res.status(401).json({ error: "Invalid credentials" });
    }
    console.log(" User Found :-> )");
    loggedInUsername = user.username;
    console.log(loggedInUsername);
    return res
      .status(200)
      .json({ message: "Login successful", Logged: user.username });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post("/Create", async (req, res) => {
  console.log("Trying To Save Blogs");
  try {
     console.log(" Still Trying");
     const { title, snippets, body } = req.body;
     const newLogin = new blogs({
       username: loggedInUsername,
       title,
       snippets,
       body,
     });
     await newLogin.save();
     const createdBlog = await blogs.findOne({ _id: newLogin._id });
     if (createdBlog) {
       BlogTitle = createdBlog.title;
       BlogSnip = createdBlog.snippets;
       BlogBody = createdBlog.body;
       console.log(BlogTitle)
       return res
      .status(200)
      .json({ message: "Login successful", title: BlogTitle, body: BlogBody, Snips: BlogSnip });

     }
     else {
       console.error("Error retrieving the newly created blog");
       res.status(500).json({ error: "Internal server error" });
      }
      console.log("Data Sent");
  } catch (error) {
     console.error(error);
     res.status(500).json({ error: "Internal server error" });
  }
 });


 app.get("/Home", async (req, res) => {
  try {
    const PostedBlogs = await blogs.find();
    if (PostedBlogs.length > 0) {
      return res.json({
        message: "Blog retrieval successful",
        blogs: PostedBlogs,
      });
    } else {
      console.error("Error retrieving the blogs");
      return res.status(404).json({ error: "Blogs not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/AllBlogs", async (req, res) => {
  try {
    const PostedBlogs = await blogs.find({username: loggedInUsername});
    if (PostedBlogs.length > 0) {
      return res.json({
        message: "Blog retrieval successful",
        blogs: PostedBlogs,
      });
    } else {
      console.log("why??")
      console.error("Error retrieving the blogs");
      return res.status(404).json({ error: "Blogs not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

console.log("Down Me is The Detail Page")
app.get('/HomeDetail/:id', async (req, res) => {
  try {
    const blogId = req.params.id;
    console.log('Received request for blog ID:', blogId);
    const blog = await blogs.findById(blogId);
     
    if (blog) {
      return res.json({
        message: 'Blog retrieval successful',
        blogs:blog
      });
    } else {
      console.error('Error retrieving the blog');
      return res.status(404).json({ error: 'Blog not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


console.log("Down Me is The Detail Page")
app.get('/UserBlogDetail/:id', async (req, res) => {
  try {
    const blogId = req.params.id;
    console.log('Received request for blog ID:', blogId);
    const blog = await blogs.findById(blogId);
     
    if (blog) {
      return res.json({
        message: 'Blog retrieval successful',
        blogs:blog
      });
    } else {
      console.error('Error retrieving the blog');
      return res.status(404).json({ error: 'Blog not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// app.delete('/Details/:id', async (req, res) => {
//   try {
//     const blogId = req.params.id;
//     console.log('Received request for blog ID:', blogId);
//     const blog = await blogs.findById(blogId);

//     if (blog) {
//       return res.json({
//         message: 'Blog retrieval successful',
//         blogs:blog
//       });
//     } else {
//       console.error('Error retrieving the blog');
//       return res.status(404).json({ error: 'Blog not found' });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// });


// pp.delete("/DeleteBlog", async (req, res) => {
//   try {
//     const deletedBlog = await blogs.findByIdAndDelete({_id : _id});

//     if (deletedBlog) {
//       return res.json({ message: "Blog deleted successfully" });
//     } else {
//       console.error("Error deleting the blog");
//       return res.status(404).json({ error: "Blog not found" });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });
 
//  app.get("/Home", async (req, res) => {
//   try {
//     const PostedBlog = await blogs.findOne();
//     if (PostedBlog) {
//       return res.json({
//           message: "Blog retrieval successful",
//           title: PostedBlog.title,
//           body: PostedBlog.body,
//           Snips: PostedBlog.snippets,
//         });
//     } else {
//       console.error("Error retrieving the blog");
//       return res.status(404).json({ error: "Blog not found" });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });



//  app.get("/Home", (req, res) => {
//     res.send(`Hey ${loggedInUsername}`);
//  });
 // app.post("/Create", async (req, res) => {
//   console.log("Trying To Save Blogs")
//     try {
//         console.log(" Still Trying")
//       const { title,snippets, body } = req.body;
//       const newLogin = new blogs({ username: loggedInUsername,title, snippets, body });
//       await newLogin.save();
//       console.log("Saved")

//        console.log("Saved");
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });

//   app.get("/Home", (req,res)=>{

//   })






// This is Working Code For /Create
// app.post("/Create", async (req, res) => {
  //   console.log("Trying To Save Blogs");
  //   try {
  //     console.log(" Still Trying");
  //     const { title, snippets, body } = req.body;
  //     const newLogin = new blogs({
  //       username: loggedInUsername,
  //       title,
  //       snippets,
  //       body,
  //     });
  //     await newLogin.save();
  
  //     const createdBlog = await blogs.findOne({ _id: newLogin._id });
  
  //     if (createdBlog) {
  //       BlogTitle = createdBlog.title;
  //       BlogSnip = createdBlog.snippets;
  //       BlogBody = createdBlog.body;
  //       console.log(BlogTitle)
  //     } else {
  //       console.error("Error retrieving the newly created blog");
  //       res.status(500).json({ error: "Internal server error" });
  //     }
  //     console.log(BlogTitle);
  //     console.log("Saved");
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "Internal server error" });
  //   }
  // });