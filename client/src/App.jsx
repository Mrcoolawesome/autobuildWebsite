import { useState } from 'react';
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import './App.css';

export async function logout() {
  const res = await fetch("/registration/logout/", {
    credentials: "same-origin", // include cookies!
  });

  if (res.ok) {
    // navigate away from the single page app!
    window.location = "/registration/sign_in/";
  } else {
    // handle logout failed!
  }
}

function App() {
  return (
    <>
			<Outlet />{/* This is our page */}
    </>
  )
}

export default App;
