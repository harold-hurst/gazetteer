<?php

// set header
header('Content-Type: application/json');

$json = file_get_contents('../../data/countryBorders.geo.json');

// decode JSON into a PHP associative array
$array = json_decode($json, true);

echo json_encode($array);
