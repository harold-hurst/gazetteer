<?php

// set header
header('Content-Type: application/json');

$json = file_get_contents('../../data/countryBorders.geo.json');

// decode JSON into a PHP associative array
$array = json_decode($json, true);

if (isset($array['features'])) {
    foreach ($array['features'] as $feature) {
        $name = $feature['properties']['name'] ?? 'Unknown';
        $iso = $feature['properties']['iso_a2'] ?? 'N/A';

        // create associative array of 'country names' => 'country codes'
        $countryNames[$name] = $iso;
    }
    echo json_encode($countryNames);
} else {
    echo "Invalid JSON structure.";
}
