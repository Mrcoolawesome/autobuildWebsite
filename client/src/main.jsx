import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { HomePage } from './homePage.jsx';
import {createHashRouter, RouterProvider} from 'react-router-dom';
import { Profile } from './profile.jsx';
import { NewPost } from './createPost.jsx';
import { useState } from 'react';
import { IndividualPost } from './post.jsx';

function Root() { // made our own function so we could use hooks
	const [posts, setPosts] = useState([]);
	const router = createHashRouter([ // sort of like urls.py for django
		{
			path: "/",
			element: <App />,
			children: [
				{
					path: "/",
					element: <HomePage setPosts={setPosts} posts={posts}/>,
				},
		  {
			path: "/profile/",
			element: <Profile setPosts={setPosts} posts={posts}/>,
		  },
		  {
			path: "/createPost/",
			element: <NewPost setPosts={setPosts} posts={posts} />,
		  },
		  {
			path: "/post/:id",
			element: <IndividualPost personalPost={false} />,
		  },
		  {
			path: "/post/edit/:id",
			element: <NewPost setPosts={setPosts} posts={posts} personalPost={true} />,
		  }
			]
		},
	]);
	
	return <RouterProvider router={router} />; 
}

ReactDOM.createRoot(document.getElementById('root')).render(
	<Root />,
)
