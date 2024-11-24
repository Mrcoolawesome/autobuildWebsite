import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RenderVehicle } from './carPreview';

export function IndividualPost() {
    const { id } = useParams();
    const [post, setPost] = useState({});

    async function getPost() {
        const res = await fetch(`/post/${id}`, {
            credentials: "same-origin",
        });
        const body = await res.json();
        setPost(body.post);
        console.log(body.post.vehicle.vertices[0].x); // this is an object, with an array of vertex objects within it's 'vertices' attribute
    }

    useEffect(() => {
        getPost();
    }, []); // run once upon startup 

    return (
        <div className='post-container'>
            <div className='post' key={post.id}>
                <h2>{post.title}</h2>
                {post.description}
                <img src={post.thumbnail} alt="Thumbnail" className='thumbnail'/>
                <div className="vehicle-view">
                    {RenderVehicle()}
                </div>
            </div>
        </div>
	)
}