import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom"; // these are hooks
import { parse } from "cookie";
import { isLoggedIn } from './getLoggedIn';

// will create a form that a user can submit to create a new post
export function NewPost(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const {posts, setPosts} = props; // this is where we get if the user is logged in or not
    const [thumbnail, setThumbnail] = useState(null);
    const [vehicle, setVehicle] = useState("");
    const isPersonalPost = props.personalPost;
    const { id } = useParams();

    // this is what sends the post to the db
    async function createPost(e) {
        checkSignedIn(); // making sure they're still signed in
        e.preventDefault(); // don't reload page
        const formData = new FormData(); // different way of sending form data, allows for sending images
        formData.append('title', title);
        formData.append('description', description);
        formData.append('isPublic', isPublic);
        if (thumbnail) formData.append('thumbnail', thumbnail); // Add the image file
        if (vehicle) formData.append('vehicle', JSON.stringify(vehicle));

        // if it's a personal post, then we're editing that post, so send it to the edit endpoint
        // otherwise send it to the regular '/posts/' endpoint if they're creating a whole new post
        const res = await fetch(isPersonalPost ? `/post/edit/${id}/` : '/posts/', {
            method: 'post',
            credentials: "same-origin",
            body: formData, // Send the FormData
            headers: {
                "X-CSRFToken": parse(document.cookie).csrftoken,
            }
        });
        
        // only show the posts for the current user if they're looking at their personal posts
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
        navigate('/profile/'); // send them back to the main profile page
    }

    // if we're editing a post, we need to get it first to display it
    async function getPost() {
        checkSignedIn(); // making sure they're still signed in
        const res = await fetch(`/post/${id}/`, {
            credentials: "same-origin"
        })

        const body = await res.json();
        const post = body.post;
        setTitle(post.title); // 'userPosts' is what the front end expects django to name the header containing the posts
        setDescription(post.description);
        setIsPublic(post.isPublic);
    }

    // send the user to the sign in page if they're not already signed in
    function checkSignedIn() {
        if (!isLoggedIn) {
            window.location = '/registration/sign_in/';
        }
    }

    useEffect(() => {
        if (isPersonalPost && id) {
            checkSignedIn(); // check if the user is signed in before allowing them to create a post
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