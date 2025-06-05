<?php
// Enable comprehensive error reporting
ini_set('display_errors', 'On');
error_reporting(E_ALL);

// Record start time to calculate the response time
$executionStartTime = microtime(true);
        
        // $url = 'http://api.geonames.org/' . $_REQUEST['api'] . 'JSON?lat=' . $_REQUEST['lat'] . '&lng=' . $_REQUEST['lng'] . '&username=haroldhurst';
        $url = 'https://api.opencagedata.com/geocode/v1/json?key=97c5aef6bcad493193632e6a456e4d3f&q=' . $_REQUEST['lat'] . '%2C+' . $_REQUEST['lng'] . '&pretty=1&no_annotations=1';

        // Initialize cURL
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Disable SSL verification (only for testing)
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);  // Get response instead of printing directly
        curl_setopt($ch, CURLOPT_URL, $url);  // Set the URL for cURL

        // Execute the cURL request and capture the response
        $result = curl_exec($ch);
        curl_close($ch);

        // Decode the JSON response
        $decode = json_decode($result, true);

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
?>