<?php

// pass in iso code of selected country
function getCountryCoordinates($isoCode, $filePath = '../../data/countryBorders.geo.json') {
    // Load the JSON file
    if (!file_exists($filePath)) {
        return "File not found.";
    }

    $json = file_get_contents($filePath);
    $data = json_decode($json, true);

    // Validate structure
    if (!isset($data['features'])) {
        return "Invalid JSON structure.";
    }

    // Search for the country by ISO A2 code
    foreach ($data['features'] as $feature) {
        if (
            isset($feature['properties']['iso_a2']) &&
            strtoupper($feature['properties']['iso_a2']) === strtoupper($isoCode)
        ) {
            return $feature['geometry']['coordinates'];
        }
    }

    return "Country with ISO code '$isoCode' not found.";
}

// Example usage:
$isoCode = $_REQUEST['isoCode']; // Try 'HN' for Honduras
$coordinates = json_encode(getCountryCoordinates($isoCode));

// Display result
if (is_array($coordinates)) {
    echo "Coordinates for $isoCode:\n";
    print_r($coordinates);
} else {
    echo $coordinates; // Error or message
}
