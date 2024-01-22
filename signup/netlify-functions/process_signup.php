<?php

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get form data
    $username = isset($_POST["username"]) ? $_POST["username"] : "";
    $password = isset($_POST["password"]) ? $_POST["password"] : "";

    // Basic validation
    if (empty($username) || empty($password)) {
        echo json_encode(array('message' => 'Username and password are required.'));
        exit();
    }

    // Create an associative array with user data
    $userData = array(
        "username" => $username,
        "password" => $password
    );

    // Load existing users from the JSON file
    $existingUsers = json_decode(file_get_contents("user_data.json"), true);

    // Check if the username already exists
    foreach ($existingUsers as $user) {
        if ($user['username'] === $username) {
            echo json_encode(array('message' => 'Username already exists. Choose a different one.'));
            exit();
        }
    }

    // Add the new user to the array
    $existingUsers[] = $userData;

    // Save the updated array back to the JSON file
    file_put_contents("user_data.json", json_encode($existingUsers, JSON_PRETTY_PRINT));

    echo json_encode(array('message' => 'User registered successfully!'));
} else {
    echo json_encode(array('message' => 'Invalid request.'));
}

?>
