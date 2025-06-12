<?php


// Enable comprehensive error reporting
ini_set('display_errors', 'On');
error_reporting(E_ALL);

// Record start time to calculate the response time
$executionStartTime = microtime(true);

$openWeatherMapApiKey = '745267ab8cb24cb1769dbb5962301b17';

// data by city not available for 3.0
$url = 'https://api.openweathermap.org/data/3.0/onecall?lat=' . $_REQUEST['lat'] . '&lon=' . $_REQUEST['lng'] . '&exclude=current,minutely,hourly,alerts&appid=' . $openWeatherMapApiKey;

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



// Close cURL session
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