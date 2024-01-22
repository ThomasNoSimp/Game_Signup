const signupButton = document.getElementById('signupButton');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

signupButton.addEventListener('click', (event) => {
    event.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;

    try {
        // Retrieve user data from environment variable
        let userData = process.env.USER_DATA ? JSON.parse(process.env.USER_DATA) : [];

        // Find user in the userData array based on username
        const user = userData.find(user => user.username === username);

        if (user && user.password === password) {
            showSuccess('Login successful');
            clearForm();
        } else {
            showError('Invalid username or password', 'Please re-enter your username and password');
        }
    } catch (error) {
        console.error(error);
        showError('Error', 'An error occurred while processing the login.');
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
}
