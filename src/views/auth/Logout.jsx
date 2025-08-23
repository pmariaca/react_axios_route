import { useEffect } from 'react';
import { useLoaderData } from "react-router";
import { useNavigate } from 'react-router';

function Logout() {
	const navegate = useNavigate()
	console.log('  == Logout--  useLoaderData : ', useLoaderData())

	useEffect(() => {
		navegate("/");
	}, [])
	return <div>Logout</div>;
}

export default Logout