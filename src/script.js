const signupButton = document.getElementById('signupButton');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const rePasswordInput = document.getElementById('re-password');

signupButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;
    const rePassword = rePasswordInput.value;

    if (password !== rePassword) {
        showError('Passwords do not match', 'Please re-enter your password');
        return;
    }

    try {
        const response = await fetch('/.netlify/functions/process_signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        if (response.ok) {
            // Successful signup
            const responseData = await response.json();
            showSuccess(responseData.message);
            clearForm();
        } else {
            // Handle error response from the server
            const responseData = await response.json();
            showError('Error', responseData.message || 'An unexpected error occurred');
        }
    } catch (error) {
        // Handle network or other unexpected errors
        showError('Error', 'An unexpected error occurred');
    }
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
