
//function for creating a new post
async function newFormHandler(event) {
    console.log("There was a click on the new post button");
    event.preventDefault();

    // get the post title and content from the form
    const title = document.querySelector('input[name="post-title"]').value;
    const content = document.querySelector('textarea[name="post-content"]').value;

    // create a new post
    const response = await fetch(`/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);

//this function is for updating a post
async function editFormHandler(event) {
    event.preventDefault();

    // get the post id from the window location
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const title = document.querySelector('input[name="post-title"]').value;
    const post_content = document.querySelector('textarea[name="post-content"]').value;

    const response = await fetch(`/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);

//this function deletes a post
async function deleteClickHandler(event) {
    // get the post id from the delete button
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/posts/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelectorAll('.delete-post-btn').forEach(btn => {
    btn.addEventListener('click', deleteClickHandler);
});