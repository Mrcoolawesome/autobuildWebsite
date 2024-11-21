import { useEffect, useState } from 'react';
import {useParams, useNavigate} from "react-router-dom"; // these are hooks
import { Link } from "react-router-dom";
import { logout } from "./App.jsx"
import { parse } from "cookie";

export function NewPost() {
    // we need this to dynamically change what notes we see in the front end
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [user, setUser] = useState(null);

    async function getUser(){
        const res = await fetch('/user/', {
            credentials: "same-origin",
        });
        const body = await res.json();
        setUser(body.user);
        setLoading(false);
    }

    // this is what's intially called when we want to get ALL the posts in the server
    async function getPosts() {
        const res = await fetch("/posts/", {
            credentials: "same-origin"
        })

        const body = await res.json();
        setPosts(body.userPosts); // 'userPosts' is what the front end expects django to name the header containing the posts
    }

    async function createPost(e) {
        e.preventDefault();
        // this is creating a post request to the backend to the 'userPost' endpoint in the django server
        const res = await fetch("/posts/", {
            method: "post",
            credentials: "same-origin",
            body: JSON.stringify({
                title, 
                description, // this comma NEEDS to be here otherwise it won't parse correctly
            }),
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": parse(document.cookie).csrftoken
            }
        })
        const body = await res.json();
        if (posts !== undefined) {
            setPosts([...posts, body.userPost]); // we're assuming django will give us the text of the post with the header 'post'
        } else {
            setPosts([body.userPost]);
        }
        
    }

    useEffect(() => {
        getPosts();
    }, []); // run once upon startup 

    const params = useParams();
	const navigate = useNavigate();
	return (
		<>
            <div className='navigation-bar-container'>
                <button className='button' onClick={() => navigate(-1)}> Back </button>
                <h1> Create post </h1>
                <button className='button' onClick={() => navigate('/')}> Homepage </button>
            </div>
            <form onSubmit={createPost} className="new-note-form">
                Build Name
                <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
                Description
                <textarea cols="30" rows="10" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                <button>Save</button>
            </form>
            <div className='posts-container'>
                {loading && <div>Loading...</div>}
                <div className='post'>
                    This will be a post
                </div>
            </div>
        </>
	)
}