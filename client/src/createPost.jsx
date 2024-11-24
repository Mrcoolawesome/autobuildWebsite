import { useState } from 'react';
import { useNavigate } from "react-router-dom"; // these are hooks
import { parse } from "cookie";

export function NewPost(props) {
    // we need this to dynamically change what notes we see in the front end
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const {posts, setPosts} = props;
    const [thumbnail, setThumbnail] = useState(null);
    const [vehicle, setVehicle] = useState("");

    async function createPost(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('isPublic', isPublic);
        formData.append('thumbnail', thumbnail); // Add the image file
        formData.append('vehicle', JSON.stringify(vehicle));

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
                <input type="file" accept="image/*" onChange={e => setThumbnail(e.target.files[0])}></input>
                Vehicle
                <input type="file" accept=".json" onChange={e => {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.readAsText(file);
                    reader.onload = (event) => {
                        const jsonContents = JSON.parse(event.target.result);
                        setVehicle(jsonContents);
                    }
                }}></input>
                Description
                <textarea cols="30" rows="10" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                Is public
                <input type="checkbox" className="myCheckbox" onChange={() => setIsPublic(prevIsPublic => !prevIsPublic)}></input>
                <button>Save</button>
            </form>
        </>
	)
}