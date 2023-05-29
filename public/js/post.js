
//function for creating a new post
async function newFormHandler(event) {
    event.preventDefault();

    // get the post title and content from the form
    const title = document.querySelector('input[name="post-title"]').value;
    const post_content = document.querySelector('textarea[name="post-content"]').value;

    // use the add post route from your API 
    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_content
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

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            post_content
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

    const response = await fetch(`/api/posts/${id}`, {
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