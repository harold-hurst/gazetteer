<?php

require 'cURL-connection.php';

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');

$countryName = $_REQUEST['countryName'];
$encodedCountryName = urlencode($countryName);

$pixabayApiKey = '1292047-f205a9798a320ae757901c5f6';

$apiUrl = 'https://pixabay.com/api/?key=' . $pixabayApiKey . '&category=places&q=' . $encodedCountryName . '&image_type=photo';

$output = makeApiCall($apiUrl);
$output = $output['data'];

echo json_encode($output);