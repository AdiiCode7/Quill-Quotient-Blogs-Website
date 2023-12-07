const express = require ("express");
const mongoose = require("mongoose");
const cors = require("cors");
const SignUp = require("./Signin");
const blogs = require("./BlogsData");
console.log("Hey Server!!!!")
const dbURI = "mongodb+srv://buniversity4:Adeel044@shariqadeel.6dniwds.mongodb.net/BlogsData?retryWrites=true&w=majority"; // Replace with your MongoDB URI
const app = express();
mongoose.connect(dbURI)
.then(() => {
  console.log("Connected to MongoDB");
  app.listen(5000, () => {
    console.log(`Server is listening on Port 5000`);
  });
})
.catch((err) => {
  console.error(err);
});
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS for all routes
let loggedInUsername;
let BlogBody;
let BlogSnip;
let BlogTitle;
// Define Mongoose schema for Login model
// Route to handle login
app.post("/signup", async (req, res) => {
  console.log("Hello go Down There")
    try {
        console.log("Trying")
      const { username,email, password } = req.body;
      const newLogin = new SignUp({ username,email, password });
      await newLogin.save(); 
    //   res.json({ message: 'Login data saved successfully' });
    console.log("Saved")
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/login', async (req, res) => {
    console.log("Credentials Checking !!!!!")
    const { username, password } = req.body;
  
    try {
      // Check if the user exists
      const user = await SignUp.findOne({ username, password });
      if (!user) {
        console.log("No User Found Sorry")
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      console.log(" User Found :-> )")
      loggedInUsername = user.username;
      console.log(loggedInUsername)
      return res.status(200).json({ message: 'Login successful', Logged: user.username });
    } 
    catch (error) 
    {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post("/Create", async (req, res) => {
    console.log("Trying To Save Blogs")
      try {
          console.log(" Still Trying")
        const { title,snippets, body } = req.body;
        const newLogin = new blogs({ username: loggedInUsername,title, snippets, body });
        await newLogin.save(); 
      console.log("Saved")
    //   req.session.BlogTitle = title;
    // req.session.BlogBody = body;
    // req.session.BlogSnips = snippets;
         console.log("Saved");
    res.redirect('/Home'); 
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const Login = require("./Signin");
// require("dotenv").config()

// const app = express();

// const PORT = process.env.PORT || 8080;

// const dbURI =
//   "Mongo Connection String here";
// mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
//   .then(() => {
//     console.log("Connected to MongoDB");

//     app.listen(PORT,()=>
//     {
//         console.log("Server is Listening on Port 5000")
//     })
//   })
//   .catch((err) => {
//     console.error(err);
//   });

//  app.get("/", (req,res)=>{
//     const signin = new Login
                                                

//     console.log("Data Transfer is Started Or React is Connected: !!!!!!")

//     res.redirect("/");
// })
// app.listen(PORT, ()=>{
//     console.log('Server is Connected on the Port Number: ${PORT}')
// })


// app.get("/submit" , (req,res)=>{
    
// })

//   app.post("/submit", (req,res)=>{
//     const user = new User;
    
//   })

//  app.get("/send",(req,res)=>{
//   res.json({message: "Hello From the Server !!!!!"})
//  })

// app.listen(8000,()=>
// {
// console.log("Server is Running on port 8000");
// })

  // app.get('/Home', (req, res) => 
  // {
  //   res.send(`Welcome to Home Page, ${loggedInUsername}!`);
  // });

  // app.use(session({
  //   secret: 'your-secret-key', // Change this to a secure random key
  //   resave: false,
  //   saveUninitialized: true
  // }));
  
  // app.use((req, res, next) => {
  //   // Set a variable in res.locals to make it available in templates
  //   res.locals.loggedInUsername = req.session.loggedInUsername || null;
  //   res.locals.BlogBody = req.session.BlogBody || null;
  //   next();
  // });
  
  // app.get('/Create', (req, res) => {
  //   // Assuming you have a login route that sets the session variable
  //   req.session.loggedInUsername = 'exampleUser';
  //   res.send('Logged in successfully!');
  // });
  
  // app.get('/Home', (req, res) => {
  //   res.send(`Welcome to Home Page, ${res.locals.loggedInUsername || 'Guest'}!`);
  // });
  
  // app.listen(3000, () => {
  //   console.log('Server is running on port 3000');
  // });


// Optional: Define a route for the root ("/") if needed
// app.get("/", (req, res) => {
//   res.send("Welcome to the homepage!");
// });

