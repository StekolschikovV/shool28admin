<?php

include './connection.php';

header('Content-type: application/json');
if (isset($_GET['user_key'])) {
    $user_key = htmlspecialchars($_GET["user_key"]);
    $statement = $pdo->prepare("SELECT * FROM estimates WHERE user_id =" . $user_key);
    $statement->execute();
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($results);
    echo $json;
}
?>