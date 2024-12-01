import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

// function that displays all posts given if they're personal or public posts
export function Posts(props, personalPosts) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const {posts, setPosts} = props;

    // get the user from the db
    async function getUser() {
        const res = await fetch('/user/', {
            credentials: "same-origin",
        });
        const body = await res.json();
        setUser(body.user);
        setLoading(false);
    }

    // this is what's intially called when we want to get ALL the posts in the server
    async function getPosts() {
        if (user.id === undefined && personalPosts) {
            window.location = '/registration/sign_in/';
        }
        const postUrl = personalPosts ? `/posts/${user.id}` : '/posts/'; // send to different viewpoint given if we're looking at personal posts or not
        const res = await fetch(postUrl, {
            credentials: "same-origin"
        })

        const body = await res.json();
        setPosts(body.posts); // 'userPosts' is what the front end expects django to name the header containing the posts
    }

    useEffect(() => {
        getUser();
    }, []); // run once upon startup 

    useEffect(() => {
        if (loading === false) {
            getPosts(); // get the posts once we know who the user is
        }
    }, [user]);

	return (
        <div className='posts-container'>
            {loading && <div>Loading...</div>}
            {posts.map(post => (
                <Link to={personalPosts ? `/post/edit/${post.id}` : `/post/${post.id}`} key={post.id}>
                    <div className='post'>
                        <h2>{post.title}</h2>
                        {post.description}
                        <img src={post.thumbnail} alt="Thumbnail" className='thumbnail'/>
                    </div>
                </Link>
            ))}
        </div>
	)
}