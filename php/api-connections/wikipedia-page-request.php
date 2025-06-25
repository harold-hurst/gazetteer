<?php

require 'cURL-connection.php';

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');

$countryName = $_REQUEST['countryName'];
$modifiedCountryName = str_replace(' ', '_', $countryName);

$apiUrl = 'https://en.wikipedia.org/w/api.php?action=query&titles=' . $modifiedCountryName . '&prop=extracts&exintro&format=json';

$output = makeApiCall($apiUrl);
$output = $output['data'];

echo json_encode($output);