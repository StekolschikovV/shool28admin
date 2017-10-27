<?php

include './key.php';

header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');  

if (isset($_GET['login']) && isset($_GET['password'])) {
    $answear = array();
    if ($_GET['login'] == 'admin' && $_GET['password'] == 'admin') {
        array_push($answear, "key", $key);
    }
    else {
        array_push($answear, "key", "");
    }
    echo json_encode($answear);
}



