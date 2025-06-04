<?php

$json = file_get_contents('../data/countryBorders.geo.json');



$data = json_encode($json);

echo $json;

// Decode JSON into a PHP associative array
// $data = json_decode($json, true);

// Check if decoding worked and features exist
// if (isset($data['features'])) {
//     foreach ($data['features'] as $feature) {
//         $name = $feature['properties']['name'] ?? 'Unknown';
//         $iso_a2 = $feature['properties']['iso_a2'] ?? 'N/A';
//         echo "Country: $name, ISO Code: $iso_a2\n";
        
//     }
// } else {
//     echo "Invalid JSON structure.\n";
// }

// echo json_encode($data);