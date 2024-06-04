import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import User from "./user/User.tsx";
import Login from "./user/Login.tsx";
import axios from "axios";
import Cookie from "js-cookie";

// todo: careful, this will be sent to every endpoint i call with axios
axios.defaults.headers.common['Authorization'] = "Bearer " + Cookie.get("authToken");

const router = createBrowserRouter([
		{
			path: "/",
			element: <App/>,
			children: [
				{path: "/user", element: <User/>},
				{path: "/login", element: <Login/>},
			]
		},
	]
);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router}/>
	</React.StrictMode>,
)
