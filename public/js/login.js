// login form handler
async function loginFormHandler(event) {
    event.preventDefault();

    // collects the username and password from the login form
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    // if the username and password fields are not empty
    if (username && password) {
        // fetch the login route and pass in the username and password as JSON
        const response = await fetch('/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        // If the login was OK, redirect to the dashboard
        if (response.ok) {
            document.location.replace('/dashboard');
            //Otherwise, display the error
        } else {
            alert(response.statusText);
        }
    }
}

// Add the event listener to the login form
document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
