import { Link } from "react-router-dom";
import { Posts } from './posts.jsx';
import { useEffect } from 'react';
import { isLoggedIn } from "./getLoggedIn.jsx";

// displays the homepage with all of the public posts
export function HomePage(props) {

    // this will send the user to the sign in page
    async function signIn() {
        window.location = "/registration/sign_in/";
    }
    
    async function logout() {
        const res = await fetch("/registration/logout/", {
          credentials: "same-origin", // include cookies!
        });
      
        if (res.ok) {
          // navigate away from the single page app!
          window.location = "/";
        } else {
          // handle logout failed!
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, []); // run once upon startup 

	return (
		<>
            <div className='navigation-bar-container'>
                <Link className='button' to="/profile/">Profile</Link> 
                <h1> Autobuild Website </h1>
                <button className='button' onClick={isLoggedIn ? logout : signIn}>{isLoggedIn ? "logout" : "sign in"}</button>
            </div>
            {Posts(props, false)}
        </>
	)
}