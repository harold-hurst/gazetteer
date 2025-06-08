<?php

$curl = curl_init();

// 'https://api.countrylayer.com/v2/alpha/' . $_REQUEST['code'] . '?access_key=335e6a96ee740178ffcb4a3209bdfaa1&FullText=true',

curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://restcountries.com/v3.1/alpha/' . $_REQUEST['code'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'GET',
));

$response = curl_exec($curl);

curl_close($curl);

echo $response;