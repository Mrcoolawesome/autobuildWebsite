import { Link } from "react-router-dom";
import { Posts } from './posts.jsx';
import { useEffect, useState } from 'react';

export function HomePage(props) {
    const [loggedIn, setLoggedIn] = useState(false);

    async function isLoggedIn() {
        const res = await fetch('/user/', {
            credentials: "same-origin",
        });
        const body = await res.json();
        const user = body.user;
        console.log(user);
        user === "anonymous" ? setLoggedIn(false) : setLoggedIn(true);
    }

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
                <Link className='button' to="/profile/">Profile</Link>  {/* CAN ONLY USE A LINK TAG IN A COMPONENT THAT IS PART OF THE ROUTER*/}
                <h1> Autobuild Website </h1>
                <button className='button' onClick={loggedIn ? logout : signIn}>{loggedIn ? "logout" : "sign in"}</button>
                {/* <Link to={`/user/${user.id}`}> {user.name} </Link> - This is what we're gonna actually use so we get the user's specific data*/}
            </div>
            {Posts(props, false)}
        </>
	)
}