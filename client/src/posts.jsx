import { useEffect, useState } from 'react';

export function Posts(props, personalPosts) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const {posts, setPosts} = props;
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
        const postUrl = personalPosts ? `/posts/${user.id}` : '/posts/';
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
            getPosts();
        }
    }, [user]);

	return (
        <div className='posts-container'>
            {loading && <div>Loading...</div>}
            {posts.map(post => (
                <div className='post' key={post.id}>
                    <h2>{post.title}</h2>
                    {post.description}
                </div>
            ))}
        </div>
	)
}