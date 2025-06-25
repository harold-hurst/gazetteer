<?php

function makeApiCall($url)
{
    $executionStartTime = microtime(true);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, $url);

    curl_setopt($ch, CURLOPT_ENCODING, '');
    curl_setopt($ch, CURLOPT_MAXREDIRS, 10);
    curl_setopt($ch, CURLOPT_TIMEOUT, 0);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');

    $result = curl_exec($ch);
    $cURLERROR = curl_errno($ch);
    curl_close($ch);

    if ($cURLERROR) {
        return [
            'status' => [
                'code' => $cURLERROR,
                'name' => "Failure - cURL",
                'description' => curl_strerror($cURLERROR),
                'seconds' => number_format((microtime(true) - $executionStartTime), 3)
            ],
            'data' => null
        ];
    }

    $response = json_decode($result, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        return [
            'status' => [
                'code' => json_last_error(),
                'name' => "Failure - JSON",
                'description' => json_last_error_msg(),
                'seconds' => number_format((microtime(true) - $executionStartTime), 3)
            ],
            'data' => null
        ];
    }

    if (isset($response['error'])) {
        return [
            'status' => [
                'code' => $response['error']['code'],
                'name' => "Failure - API",
                'description' => $response['error']['message'],
                'seconds' => number_format((microtime(true) - $executionStartTime), 3)
            ],
            'data' => null
        ];
    }

    return [
        'status' => [
            'code' => 200,
            'name' => "success",
            'description' => "all ok",
            'seconds' => number_format((microtime(true) - $executionStartTime), 3)
        ],
        'data' => $response
    ];
}
