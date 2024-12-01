import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RenderVehicle } from './carPreview';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { isLoggedIn, logout, signIn } from './loggingIn';

// displays a given posts' details when a user clicks on the post
export function IndividualPost() {
    const [loggedIn, setLoggedIn] = useState(false);
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [vehicle, setVehicle] = useState({});

    // get the post from the db
    async function getPost() {
        const res = await fetch(`/post/${id}`, {
            credentials: "same-origin",
        });
        const body = await res.json();
        setPost(body.post);
        setVehicle(body.post.vehicle);
    }

    useEffect(() => {
        // have to do this weird stuff to get the right value from the async 'isLoggedIn' function
        const getLogin = async () => {
            const status = await isLoggedIn();
            setLoggedIn(status);
        };
        getLogin();
        getPost();
    }, []); // run once upon startup 

    // written mostly by ChatGPT
    function downloadVehicle() {
        const jsonString = JSON.stringify(vehicle, null, 2);

        // Create a Blob object
        const blob = new Blob([jsonString], { type: "application/json" });

        // Create an object URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create a temporary <a> element
        const link = document.createElement('a');
        link.href = url;
        link.download = post.title; // The file name for the download
        document.body.appendChild(link); // Append the link to the body
        link.click(); // Programmatically click the link to trigger the download
        document.body.removeChild(link); // Remove the link from the DOM

        // Release the object URL to free memory
        URL.revokeObjectURL(url);
    }

    const navigate = useNavigate();
    return (
        <>
            <div className='navigation-bar-container'>
                <button className='button' onClick={() => navigate(-1)}> Back </button>
                <h1> Autobuild Website </h1>
                <button className='button' onClick={loggedIn === true ? logout : signIn}>{loggedIn === true ? "logout" : "sign in"}</button>
            </div>
            <div className='single-post' key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <div className="vehicle-view">
                    <Canvas>
                        <ambientLight intensity={1} />
                        <Environment preset="warehouse" />
                        <OrbitControls minDistance={50} maxDistance={200} maxPolarAngle={90} /> {/* camera can't go upside down and can't get too close or far from the car with these values */}
                        {post && post.vehicle && <RenderVehicle vehicle={post.vehicle} />} {/* need to make sure everything's ready to go before displaying the vehicle */}
                    </Canvas>
                </div>
            </div>
            <div className='button' onClick={downloadVehicle}> Download</div>
        </>
    )
    
}