<?php
// Simulate a POST request to api.php with EXTRA FIELDS to test failure
$url = 'http://localhost/Vertex/public/api/api.php?entity=contacts';
$data = [
    'name' => 'Test API Failure',
    'email' => 'fail@test.com',
    'phone' => '1234567890',
    'service' => 'Informative Website',
    'message' => 'Testing failure with extra fields',
    'status' => 'New',
    'subject' => 'This field does not exist',
    'type' => 'message'
];

$options = [
    'http' => [
        'header'  => "Content-type: application/json\r\n",
        'method'  => 'POST',
        'content' => json_encode($data),
        'ignore_errors' => true
    ]
];

$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);
$status_line = $http_response_header[0];

echo "Status: $status_line\n";
echo "Response: $result\n";
?>
