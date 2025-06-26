<?php

require 'cURL-connection.php';

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');

// get country code from request
$countryCode = $_REQUEST['code'];


function fetchCities($countryCode)
{

    $apiUrl = 'http://api.geonames.org/searchJSON?featureCode=PPL&country=' . $countryCode . '&maxRows=10&username=haroldhurst';

    $output = makeApiCall($apiUrl);
    return $output;

}


function fetchFeatures($featureCode, $countryCode)
{

    $apiUrl = 'http://api.geonames.org/searchJSON?featureCode=' . $featureCode . '&country=' . $countryCode . '&maxRows=10&username=haroldhurst';

    $output = makeApiCall($apiUrl);
    return $output;
}

$cities = fetchCities($countryCode);
$airports = fetchFeatures('AIRP', $countryCode);
$universities = fetchFeatures('UNIV', $countryCode);
$castles = fetchFeatures('CSTL', $countryCode);
$stadiums = fetchFeatures('STDM', $countryCode);



// Combine into one JSON response
$result = [
    'cities' => $cities['data']['geonames'] ?? [],
    'airports' => $airports['data']['geonames'] ?? [],
    'universities' => $universities['data']['geonames'] ?? [],
    'castles' => $castles['data']['geonames'] ?? [],
    'stadiums' => $stadiums['data']['geonames'] ?? []
];

// header('Content-Type: application/json');
echo json_encode($result);
