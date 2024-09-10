import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostList from "./components/postList";
import PostDetails from "./components/postDetails";
import Login from "./components/logIn";
import Logout from "./components/logOut";
import SignUp from "./components/signUp";


function App() {

  return (
    <Router>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/post/:postId" element={<PostDetails />} />
        <Route path="/allposts" element={<PostList />} />
        <Route path="/signup" element={<SignUp />} />

      </Routes>
    </Router>
  );
}

export default App
