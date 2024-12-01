// ask the db if this user is logged in, return true if they are
export async function isLoggedIn() {
    let loggedIn = false;
    const res = await fetch('/user/', {
        credentials: "same-origin",
    });
    const body = await res.json();
    const user = body.user;
    user === "anonymous" ? loggedIn = false : loggedIn = true;
    return loggedIn;
}

export async function logout() {
    const res = await fetch("/registration/logout/", {
      credentials: "same-origin", // include cookies!
    });
  
    if (res.ok) {
      // navigate away from the single page app!
      window.location = "/";
    } else {
      window.location = "/logoutFailed/"
    }
}

// this will send the user to the sign in page
export async function signIn() {
    window.location = "/registration/sign_in/";
}

export function LogoutFailed() {
    return (
        <>
        <h1> Logout Failed, refresh page </h1>
        </>
    )
}