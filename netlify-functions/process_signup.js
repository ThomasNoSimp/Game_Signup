const fs = require('fs');
const path = require('path');

exports.handler = async function (event, context) {
    try {
        console.log('Function execution started');

        const { username, password } = JSON.parse(event.body);
        const newData = { username, password };

        // Adjust the file path based on your project structure
        const filePath = path.join(__dirname, '..', 'user_data.json');

        // Read existing data or initialize an empty array
        const existingData = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf-8')) : [];

        // Append new data and write back to the file
        existingData.push(newData);
        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

        console.log('Function execution completed successfully');

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User registered successfully!' }),
        };
    } catch (error) {
        console.error('Error processing signup:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'An unexpected error occurred' }),
        };
    }
};
