import {useNavigate} from "react-router-dom"; // these are hooks
import { Link } from "react-router-dom";
import { Posts } from './posts.jsx';

export function Profile(props) {
	const navigate = useNavigate();
	return (
		<>
            <div className='navigation-bar-container'>
                <button className='button' onClick={() => navigate(-1)}> Back </button>
                <h1> Your Posts </h1>
                <Link className='button' to="/createPost/">Create Post</Link>
            </div>
            {Posts(props, true)}
        </>
	)
}