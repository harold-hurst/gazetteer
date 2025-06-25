<?php

require 'cURL-connection.php';

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');

// Enable comprehensive error reporting
ini_set('display_errors', 'On');
error_reporting(E_ALL);

$url = 'https://restcountries.com/v3.1/alpha/' . $_REQUEST['code'];

$output = makeApiCall($url);

echo json_encode($output, JSON_NUMERIC_CHECK);