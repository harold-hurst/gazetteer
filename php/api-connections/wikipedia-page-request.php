<?php

$countryName = $_REQUEST['countryName'];
$modifiedCountryName = str_replace(' ', '_', $countryName);

$apiUrl = 'https://en.wikipedia.org/w/api.php?action=query&titles=' . $modifiedCountryName . '&prop=extracts&exintro&format=json';

// Initialize cURL session
$ch = curl_init($apiUrl);

// Set cURL options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);  // Return the response as a string
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);  // Follow redirects if necessary

// Execute the cURL request
$response = curl_exec($ch);

// Check for cURL errors
if ($response === false) {
    echo "Error making API request: " . curl_error($ch);
    $defaultResponse = json_encode([
        "error" => "Sorry, we couldn't retrieve information at the moment. Please try again later."
    ]);
    echo $defaultResponse;
    exit;
}

// Close the cURL session
curl_close($ch);

// Display the response
echo $response;
?>