import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RenderVehicle } from './carPreview';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Stats, OrbitControls } from '@react-three/drei';

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
        <div className='single-post' key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <div className="vehicle-view">
                <Canvas>
                    <Stats />
                    <ambientLight intensity={1} />
                    <Environment preset="warehouse" />
                    <OrbitControls minDistance={50} maxPolarAngle={90}/>
                    {post && post.vehicle && <RenderVehicle vehicle={post.vehicle} />}
                </Canvas>
            </div>
        </div>
    )
    
}