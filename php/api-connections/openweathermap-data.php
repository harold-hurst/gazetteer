<?php

require 'cURL-connection.php';

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');

// Enable comprehensive error reporting
ini_set('display_errors', 'On');
error_reporting(E_ALL);

$openWeatherMapApiKey = '745267ab8cb24cb1769dbb5962301b17';

// data by city not available for 3.0
$url = 'https://api.openweathermap.org/data/3.0/onecall?lat=' . $_REQUEST['lat'] . '&lon=' . $_REQUEST['lng'] . '&exclude=current,minutely,hourly,alerts&appid=' . $openWeatherMapApiKey;

$output = makeApiCall($url);
$output = $output['data'];

echo json_encode($output);