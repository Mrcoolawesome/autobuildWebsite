import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RenderVehicle } from './carPreview';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from "@react-three/drei";
import { Environment } from '@react-three/drei';

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
                <img src={post.thumbnail} alt="Thumbnail" className='thumbnail'/>
                <div className="vehicle-view">
                    <Canvas>
                        <ambientLight intensity={Math.PI / 2} />
                        <Environment preset="city" />
                        <OrbitControls minDistance={50} maxPolarAngle={90}/>
                        {post && post.vehicle && <RenderVehicle vehicle={post.vehicle} />}
                    </Canvas>
                </div>
            </div>
        </div>
	)
}