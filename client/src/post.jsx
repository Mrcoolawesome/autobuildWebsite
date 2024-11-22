import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function IndividualPost() {
    const { id } = useParams();
    const [post, setPost] = useState({});

    async function getPost() {
        const res = await fetch(`/post/${id}`, {
            credentials: "same-origin",
        });
        const body = await res.json();
        setPost(body.post);
    }

    useEffect(() => {
        getPost();
    }, []); // run once upon startup 

    return (
        <div className='post-container'>
            <div className='post' key={post.id}>
                <h2>{post.title}</h2>
                {post.description}
                <h1>{`http://127.0.0.1:8000${post.thumbnail}`}</h1>
                <img src={`http://127.0.0.1:8000${post.thumbnail}`} alt="Thumbnail" />
            </div>
        </div>
	)
}