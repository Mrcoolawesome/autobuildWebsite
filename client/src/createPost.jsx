import { useState } from 'react';
import {useParams, useNavigate} from "react-router-dom"; // these are hooks
import { parse } from "cookie";
import { Posts } from './posts.jsx';

export function NewPost(props) {
    // we need this to dynamically change what notes we see in the front end
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const {posts, setPosts} = props;
    const [thumbnail, setThumbnail] = useState(null);

    async function createPost(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('isPublic', isPublic);
        formData.append('thumbnail', thumbnail); // Add the image file

        const res = await fetch('/posts/', {
            method: 'post',
            credentials: "same-origin",
            body: formData, // Send the FormData
            headers: {
                // "Content-Type": "application/json",
                "X-CSRFToken": parse(document.cookie).csrftoken
            }
        });
        
        const body = await res.json();
        setPosts([...posts, body.post]); // we're assuming django will give us the text of the post with the header 'post'        
    }

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
                Thumbnail
                <input type="file" accept="image/*" onChange={e => setThumbnail(e.target.files[0])}></input> {/* accepts png, jpg, and gifs according to chatgpt*/}
                Description
                <textarea cols="30" rows="10" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                Is public
                <input type="checkbox" className="myCheckbox" onChange={() => setIsPublic(prevIsPublic => !prevIsPublic)}></input>
                <button>Save</button>
            </form>
            {Posts(props, true)}
        </>
	)
}