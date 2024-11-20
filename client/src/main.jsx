import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HomePage } from './homePage.jsx'
import {createHashRouter, RouterProvider} from 'react-router-dom'
import { Profile } from './profile.jsx'
import { CreatePost } from './createPost.jsx'

const router = createHashRouter([ // sort of like urls.py for django
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <HomePage />,
        children: [
          
        ]
			},
      {
        path: "/profile/",
        element: <Profile />,
      },
      {
        path: "/createPost/",
        element: <CreatePost />,
      }
		]
	},
]) 

ReactDOM.createRoot(document.getElementById('root')).render(
	<RouterProvider router={router} />,
)
