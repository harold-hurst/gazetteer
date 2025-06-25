<?php

require 'cURL-connection.php';

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');

$countryCode = $_REQUEST['countryCode'];

$newsApiKey = 'xd9Mpv7ILLnyEM6xEFAEJhC1GfPle35I72rnecLv';

$apiUrl = 'https://api.thenewsapi.com/v1/news/top?api_token=' . $newsApiKey . '&locale=' . $countryCode . '&limit=25';


$output = makeApiCall($apiUrl);
$output = $output['data'];

echo json_encode($output, JSON_NUMERIC_CHECK);

?>
