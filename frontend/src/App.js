import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInPage from "./components/SIGN_IN_UP/SignInPage";
import SignUpPage from "./components/SIGN_IN_UP/Signuppage";
import Layout from "./components/MAIN_WEBSITE/Layout";
import Home from "./components/MAIN_WEBSITE/Home";
import CreateBlog from "./components/MAIN_WEBSITE/CreateBlog";


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<SignInPage />} />
          <Route path="/Layout" element={(<Layout />,<Home/>)}  />
          <Route path="/Home" element={<Home/>}></Route>
          <Route path="/Create" element={<CreateBlog/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
