<?php

$countryCode = $_REQUEST['code'];


$apiUrl = 'http://api.geonames.org/searchJSON?&country=' . $countryCode . '&maxRows=10&username=haroldhurst';
// Initialize a cURL session
$curl = curl_init();

// Set the cURL options
curl_setopt_array($curl, [
    CURLOPT_URL => $apiUrl,                  // API URL
    CURLOPT_RETURNTRANSFER => true,           // Return the response as a string
    CURLOPT_FOLLOWLOCATION => true,           // Follow redirects if any
    CURLOPT_ENCODING => "",                  // Accept all encodings
    CURLOPT_MAXREDIRS => 10,                 // Max number of redirects
    CURLOPT_TIMEOUT => 30,                   // Timeout in seconds
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1, // Use HTTP/1.1
    CURLOPT_CUSTOMREQUEST => "GET",          // Set the request type to GET
    CURLOPT_HTTPHEADER => [                  // Set the headers
        "User-Agent: PHP Request",           // User-Agent to avoid potential issues
    ],
]);

// Execute the cURL request and get the response
$response = curl_exec($curl);

// Check for errors in the request
if ($err = curl_error($curl)) {
    // If there is an error, display it
    echo "cURL Error #: " . $err;
} else {
    // Output the full raw response from the API
    echo $response;
}

// Close the cURL session
curl_close($curl);

?>
