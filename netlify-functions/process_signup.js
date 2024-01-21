exports.handler = async function (event, context) {
    try {
        const { username, password } = JSON.parse(event.body);

        // Signup logic

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User registered successfully!' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'An unexpected error occurred' }),
        };
    }
};
