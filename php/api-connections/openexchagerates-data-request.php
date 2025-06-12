<?php

// Enable comprehensive error reporting
ini_set('display_errors', 'On');
error_reporting(E_ALL);

// Record start time to calculate the response time
$executionStartTime = microtime(true);


$ch = curl_init();

$openExchangeRatesApiKey = '9c40e7b3afc24fcdab87e65d2e2184c7';
$currency = $_REQUEST['currency'];
$url = "https://openexchangerates.org/api/latest.json?app_id=" . $openExchangeRatesApiKey . '&symbols=' . $currency;

curl_setopt_array($ch, array(
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,   // Already included
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'GET',
    CURLOPT_SSL_VERIFYPEER => false,  // Added: disables SSL verification (for testing only)
));

$response = curl_exec($ch);

curl_close($ch);

// Decode the JSON response
$decode = json_decode($response, true);

// Prepare the output with status and data
$output = array(
    'status' => array(
        'code' => "200",
        'name' => "ok",
        'description' => "success",
        'returnedIn' => intval((microtime(true) - $executionStartTime) * 1000) . " ms"
    ),
    'data' => $decode
);

// Set content type to JSON
header('Content-Type: application/json; charset=UTF-8');

// Output the response as JSON
echo json_encode($output);
