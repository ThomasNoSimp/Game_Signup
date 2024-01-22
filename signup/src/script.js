const signupButton = document.getElementById('signupButton');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const rePasswordInput = document.getElementById('re-password');

signupButton.addEventListener('click', (event) => {
    event.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;
    const rePassword = rePasswordInput.value;

    if (password !== rePassword) {
        showError('Passwords do not match', 'Please re-enter your password');
        return;
    }

    // Handling asynchronous code without using async/await in the event listener
    fetch('/.netlify/functions/process_signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error response from the server');
        }
    })
    .then(responseData => {
        // Successful signup
        showSuccess(responseData.message);
        clearForm();
    })
    .catch(error => {
        // Handle errors
        showError('Error', error.message || 'An unexpected error occurred');
    });
});

function showError(title, text) {
    Swal.fire({
        title: title,
        text: text,
        icon: 'error',
        confirmButtonText: 'Okay'
    });
}

function showSuccess(text) {
    Swal.fire({
        title: 'Success',
        text: text,
        icon: 'success',
        confirmButtonText: 'Okay'
    });
}

function clearForm() {
    usernameInput.value = '';
    passwordInput.value = '';
    rePasswordInput.value = '';
}
