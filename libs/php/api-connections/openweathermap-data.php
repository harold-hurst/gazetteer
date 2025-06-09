<?php


// data by city not available for 3.0
$url = 'https://api.openweathermap.org/data/3.0/onecall?lat=' . $_REQUEST['lat'] . '&lon=' . $_REQUEST['lng'] . '&exclude=current,minutely,hourly,alerts&appid=745267ab8cb24cb1769dbb5962301b17';

// Initialize cURL session
$ch = curl_init();

// Set cURL options
curl_setopt_array($ch, array(
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'GET',
    CURLOPT_SSL_VERIFYPEER => false // ⚠️ Only disable for local development/testing
));

// Execute the request
$response = curl_exec($ch);

// Handle errors
if (curl_errno($ch)) {
    echo 'cURL Error: ' . curl_error($ch);
} else {
    header('Content-Type: application/json'); // Set response type
    echo $response;
}

// Close cURL session
curl_close($ch);
