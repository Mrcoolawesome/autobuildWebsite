import { Link } from "react-router-dom";
import { Posts } from './posts.jsx';
import { isLoggedIn, logout, signIn } from "./loggingIn.jsx";
import { useState, useEffect } from "react";

// displays the homepage with all of the public posts
export function HomePage(props) {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        // have to do this weird stuff to get the right value from the async 'isLoggedIn' function
        const getLogin = async () => {
            const status = await isLoggedIn();
            setLoggedIn(status);
        };
        getLogin();
    }, []); // run once upon startup 

	return (
		<>
            <div className='navigation-bar-container'>
                <Link className='button' to="/profile/">Profile</Link> 
                <h1> Autobuild Website </h1>
                <button className='button' onClick={loggedIn === true ? logout : signIn}>{loggedIn === true ? "logout" : "sign in"}</button>
            </div>
            {Posts(props, false)}
        </>
	)
}