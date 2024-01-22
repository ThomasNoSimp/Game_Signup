exports.handler = async function(event, context) {
  try {
      // Retrieve user data from environment variable or initialize an empty array
      let userData = process.env.USER_DATA ? JSON.parse(process.env.USER_DATA) : [];

      // Extract username and password from the request body
      const { username, password } = JSON.parse(event.body);

      // Add the new user to the userData array
      userData.push({ username, password });

      // Update the USER_DATA environment variable with the modified array
      process.env.USER_DATA = JSON.stringify(userData);

      return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Signup successful' }),
      };
  } catch (error) {
      console.error(error);
      return {
          statusCode: 500,
          body: JSON.stringify({ message: 'Internal Server Error' }),
      };
  }
};
