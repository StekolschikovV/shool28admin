<?php
header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');  
// https://shool28.000webhostapp.com/getSet.php?key=XfASDcvv656erg&schoolchildren=add
// https://shool28.000webhostapp.com/getSet.php?key=XfASDcvv656erg&schoolchildren=add&firstName=XXX&lastName=XXX&birthday=XXX&phone=XXX&email=XXX&address=XXX&class=XXX

include './key.php';
include './connection.php'; // $pdo

$answear = array();

if (isset($_GET['key'])) {
    if ($_GET['key'] == $key) {
        if (isset($_GET['schoolchildren'])) {
            if ($_GET['schoolchildren'] == 'add') {
                $firstName = $_GET['firstName'];
                $lastName = $_GET['lastName'];
                $birthday = $_GET['birthday'];
                $phone = $_GET['phone'];
                $email = $_GET['email'];
                $address = $_GET['address'];
                $class = $_GET['class'];
                $loginKey = $_GET['loginKey'];
                $stmt = $pdo->prepare("INSERT INTO schoolchildren (	firstName, lastName, birthday, phone, email, address, class, loginKey) VALUES (:firstName, :lastName, :birthday, :phone, :email, :address, :class, :loginKey)");
                $stmt->bindParam(':firstName', $firstName);
                $stmt->bindParam(':lastName', $lastName);
                $stmt->bindParam(':birthday', $birthday);
                $stmt->bindParam(':phone', $phone);
                $stmt->bindParam(':email', $email);
                $stmt->bindParam(':address', $address);
                $stmt->bindParam(':class', $class);
                $stmt->bindParam(':loginKey', $loginKey);
                $stmt->execute();
                array_push($answear, true);
                echo json_encode(true);
            }
            else if ($_GET['schoolchildren'] == 'getAll') {
                $sql = 'SELECT * FROM schoolchildren';
                $stmt = $pdo->query($sql);
                $teams = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($teams);
            }
            else if ($_GET['schoolchildren'] == 'delete') {
                $count = $pdo->exec("DELETE FROM schoolchildren WHERE id = " . $_GET['id']);
                echo json_encode($count);
            }
            else if ($_GET['schoolchildren'] == 'update') {
                $firstName = $_GET['firstName'];
                $lastName = $_GET['lastName'];
                $birthday = $_GET['birthday'];
                $phone = $_GET['phone'];
                $email = $_GET['email'];
                $address = $_GET['address'];
                $class = $_GET['class'];
                $loginKey = $_GET['loginKey'];
                $count = $pdo->exec("UPDATE schoolchildren SET firstName='$firstName', lastName='$lastName', birthday='$birthday', phone='$phone', email='$email', address='$address', class='$class', loginKey='$loginKey'  WHERE id=" . $_GET['id']);
                echo json_encode($count);
            }
        }
        else if (isset($_GET['classes'])) {
            if ($_GET['classes'] == 'getAll') {
                $sql = 'SELECT * FROM classes';
                $stmt = $pdo->query($sql);
                $teams = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($teams);
            }
            else if ($_GET['classes'] == 'add') {
                $className = $_GET['className'];
                $stmt = $pdo->prepare("INSERT INTO classes (className) VALUES (:className)");
                $stmt->bindParam(':className', $className);
                $stmt->execute();
                array_push($answear, true);
                echo json_encode(true);
            }
            else if ($_GET['classes'] == 'delete') {
                $count = $pdo->exec("DELETE FROM classes WHERE id = " . $_GET['id']);
                echo json_encode($count);
            }
            else if ($_GET['classes'] == 'update') {
                $className = $_GET['className'];
                $count = $pdo->exec("UPDATE classes SET className='$className'  WHERE id=" . $_GET['id']);
                echo json_encode($count);
            }
        }
        else if (isset($_GET['teachers'])) {
            if ($_GET['teachers'] == 'getAll') {
                $sql = 'SELECT * FROM teachers';
                $stmt = $pdo->query($sql);
                $teams = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($teams);
            }
            else if ($_GET['teachers'] == 'add') {
                $lastName = $_GET['lastName'];
                $name = $_GET['name'];
                $surname = $_GET['surname'];
                $phone = $_GET['phone'];
                $email = $_GET['email'];

                $stmt = $pdo->prepare("INSERT INTO teachers (lastName, name, surname, phone, email) VALUES (:lastName, :name, :surname, :phone, :email)");

                $stmt->bindParam(':lastName', $lastName);
                $stmt->bindParam(':name', $name);
                $stmt->bindParam(':surname', $surname);
                $stmt->bindParam(':phone', $phone);
                $stmt->bindParam(':email', $email);
                
                $stmt->execute();
                array_push($answear, true);
                echo json_encode(true);
            }
        }
    }
    else {
        // array_push($answear, "status", "Wrong key!");

    }
}
else {
    // array_push($answear, "status", "No key");

}
// echo json_encode($answear);