import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom"; // these are hooks
import { parse } from "cookie";

export function NewPost(props) {
    // we need this to dynamically change what notes we see in the front end
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const {posts, setPosts} = props;
    const [thumbnail, setThumbnail] = useState(null);
    const [vehicle, setVehicle] = useState("");
    const isPersonalPost = props.personalPost;
    const { id } = useParams();

    async function createPost(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('isPublic', isPublic);
        if (thumbnail) formData.append('thumbnail', thumbnail); // Add the image file
        if (vehicle) formData.append('vehicle', JSON.stringify(vehicle));

        const res = await fetch(isPersonalPost ? `/post/edit/${id}/` : '/posts/', {
            method: 'post',
            credentials: "same-origin",
            body: formData, // Send the FormData
            headers: {
                // "Content-Type": "application/json",
                "X-CSRFToken": parse(document.cookie).csrftoken
            }
        });
        
        const body = await res.json();
        if (isPersonalPost) {
            const newPosts = posts.filter((post) => {
                if (post.id === id) {
                    post = body.post;
                }
            });
            setPosts(newPosts);
        } else {
            setPosts([...posts, body.post]); // we're assuming django will give us the text of the post with the header 'post' 
        } 
        navigate('/profile/');
    }

    async function getPost() {
        if (id === undefined && isPersonalPost) {
            window.location = '/registration/sign_in/';
        }
        const res = await fetch(`/post/${id}/`, {
            credentials: "same-origin"
        })

        const body = await res.json();
        const post = body.post;
        setTitle(post.title); // 'userPosts' is what the front end expects django to name the header containing the posts
        setDescription(post.description);
        setIsPublic(post.isPublic);
    }

    useEffect(() => {
        if (isPersonalPost && id) {
            getPost();
        }
    }, []); // run once upon startup 

	const navigate = useNavigate();
	return (
		<>
            <div className='navigation-bar-container'>
                <button className='button' onClick={() => navigate(-1)}> Back </button>
                <h1> Create post </h1>
                <button className='button' onClick={() => navigate('/')}> Homepage </button>
            </div>
            <form onSubmit={createPost} className="new-post-form">
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
                <input type="checkbox" className="myCheckbox" checked={isPublic} onChange={() => setIsPublic(prevIsPublic => !prevIsPublic)}></input>
                <button>Save</button>
            </form>
        </>
	)
}