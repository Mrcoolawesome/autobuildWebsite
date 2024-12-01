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