async function logout() {
    const response = await fetch('/users/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace('/login');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('a[href="/logout"]').addEventListener('click', function(event) {
    event.preventDefault();
    logout();
});
