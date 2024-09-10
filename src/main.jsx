import React, { useState} from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import PostList from "./components/postList";
import PostDetails from "./components/postDetails";
import Login from "./components/logIn";
import Logout from "./components/logOut";
import SignUp from "./components/signUp";

import App from './App.jsx'
import HomePage from './Homepage.jsx';
import PageNotFound from './components/pageNotFound.jsx';
//import './index.css'



const AppRouter = () => {

 
  const routes = [
 
  {
      path: "/",
      element: <HomePage />,
      children:[
        {path: "login", element: <Login />},
        {path: "signup", element: <SignUp />},
      ],
      errorElement: <PageNotFound />,
  },
  {
    path: "/homepage",
    element: <HomePage />,
    children:[
      {path: "login", element: <Login />},
      {path: "signup", element: <SignUp />},
    ],
},

  {
    path: "/blogPage",
    element: <App />,
    children:[
      {path: "allposts", element: <PostList />},
      {path: "logout", element: <Logout />},
      {path: "post/:postId", element: <PostDetails /> },
    ],
  },
  
  ];

const router = createBrowserRouter(routes); 
return <RouterProvider router={router} /> 

};


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter />  
  </React.StrictMode>,
)



