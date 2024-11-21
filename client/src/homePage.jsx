import { Link } from "react-router-dom";
import { logout } from "./App.jsx"
import { Posts } from './posts.jsx';

export function HomePage(props) {
	return (
		<>
            <div className='navigation-bar-container'>
                <Link className='button' to="/profile/">Profile</Link>  {/* CAN ONLY USE A LINK TAG IN A COMPONENT THAT IS PART OF THE ROUTER*/}
                <h1> Autobuild Website </h1>
                <button className='button' onClick={logout}>Logout</button>
                {/* <Link to={`/user/${user.id}`}> {user.name} </Link> - This is what we're gonna actually use so we get the user's specific data*/}
            </div>
            {Posts(props, false)}
        </>
	)
}