<?php

require 'cURL-connection.php';

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');

// Enable comprehensive error reporting
ini_set('display_errors', 'On');
error_reporting(E_ALL);

$opencageApiKey = '97c5aef6bcad493193632e6a456e4d3f';

$url = 'https://api.opencagedata.com/geocode/v1/json?key=' . $opencageApiKey . '&q=' . $_REQUEST['lat'] . '%2C+' . $_REQUEST['lng'] . '&pretty=1&no_annotations=1';

$output = makeApiCall($url);

echo json_encode($output, JSON_NUMERIC_CHECK);