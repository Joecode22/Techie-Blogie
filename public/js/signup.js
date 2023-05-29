document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
  
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (response.ok) {
      alert('Successfully signed up!');
      location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  });
  