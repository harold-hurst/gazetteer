<?php

// get country code from request
$countryCode = $_REQUEST['code'];


function fetchCities($countryCode)
{

    $apiUrl = 'http://api.geonames.org/searchJSON?featureCode=PPL&country=' . $countryCode . '&maxRows=10&username=haroldhurst';

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
    return json_decode($response, true);

    // Close the cURL session
    curl_close($curl);
}


function fetchFeatures($featureCode, $countryCode)
{

    $apiUrl = 'http://api.geonames.org/searchJSON?featureCode=' . $featureCode . '&country=' . $countryCode . '&maxRows=10&username=haroldhurst';

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
    return json_decode($response, true);

    // Close the cURL session
    curl_close($curl);
}

$cities = fetchCities($countryCode);
$airports = fetchFeatures('AIRP', $countryCode);
$universities = fetchFeatures('UNIV', $countryCode);
$castles = fetchFeatures('CSTL', $countryCode);
$stadiums = fetchFeatures('STDM', $countryCode);



// Combine into one JSON response
$result = [
    'cities' => $cities['geonames'] ?? [],
    'airports' => $airports['geonames'] ?? [],
    'universities' => $universities['geonames'] ?? [],
    'castles' => $castles['geonames'] ?? [],
    'stadiums' => $stadiums['geonames'] ?? []
];

// header('Content-Type: application/json');
echo json_encode($result);
