import { useEffect, useState } from 'react';
import {useParams, useNavigate} from "react-router-dom"; // these are hooks
import { Link } from "react-router-dom";
import { logout } from "./App.jsx"

export function CreatePost() {
    const params = useParams();
	const navigate = useNavigate();
	return (
		<>
            <div className='navigation-bar-container'>
                <button className='button' onClick={() => navigate(-1)}> Back </button>
                <h1> Create post </h1>
                <button className='button' onClick={() => navigate('/')}> Homepage </button>
            </div>
            <div className='posts-container'>
                <div className='post'>
                    This will be a form
                </div>
            </div>
        </>
	)
}