import { useEffect, useState } from 'react';
import {useParams, useNavigate} from "react-router-dom"; // these are hooks
import { Link } from "react-router-dom";
import { logout } from "./App.jsx"

export function Profile() {
    const params = useParams();
	const navigate = useNavigate();
	return (
		<>
            <div className='navigation-bar-container'>
                <button className='button' onClick={() => navigate(-1)}> Back </button>
                <h1> Your Posts </h1>
                <Link className='button' to="/createPost/">Create Post</Link>
            </div>
            <div className='posts-container'>
                <div className='post'>
                    I have stuff
                </div>
            </div>
        </>
	)
}