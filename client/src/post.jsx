import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function IndividualPost() {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [imageSrc, setImageSrc] = useState(null);

    async function getPost() {
        const res = await fetch(`/post/${id}`, {
            credentials: "same-origin",
        });
        const body = await res.json();
        setPost(body.post);
    }

    async function fetchImageWithCredentials() {
        const res = await fetch(`http://127.0.0.1:8000${post.thumbnail}/`, {
            credentials: "same-origin",
        });
        const blob = await res.blob();
        setImageSrc(URL.createObjectURL(blob));
    }

    useEffect(() => {
        getPost();
    }, []); // run once upon startup 

    useEffect(() => {
        if (post.thumbnail) {
            fetchImageWithCredentials();
        }
    }, [post.thumbnail]); // Runs whenever post.thumbnail changes

    return (
        <div className='post-container'>
            <div className='post' key={post.id}>
                <h2>{post.title}</h2>
                {post.description}
                <h1>{`http://127.0.0.1:8000${post.thumbnail}/`}</h1>
                <img src={post.thumbnail} alt="Thumbnail" />
            </div>
        </div>
	)
}