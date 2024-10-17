<?php
$host = "localhost";
$username = "root";
$password = "";
$dbname = "maintenance";

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Erreur de cnnexion: ".$e->getMessage();
}
