<?php

require 'cURL-connection.php';

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');

// Enable comprehensive error reporting
ini_set('display_errors', 'On');
error_reporting(E_ALL);

$opencageApiKey = '97c5aef6bcad493193632e6a456e4d3f';
$capital = $_REQUEST['capital'];
$capitalUrlEncoded = urlencode($capital);

$url = 'https://api.opencagedata.com/geocode/v1/json?q=' . $capitalUrlEncoded . '&countrycode=' . $_REQUEST['countryCode'] . '&key=' . $opencageApiKey;

$output = makeApiCall($url);

echo json_encode($output, JSON_NUMERIC_CHECK);
