<?php

require 'connexion.php';

if($_SERVER["REQUEST_METHOD"] == "POST"){
    $nom = $_POST['data_nom'];
    $prenom = $_POST['data_prenom'];
    $email = $_POST['data_email'];
    $tel = $_POST['data_tel'];
    $preocupation = $_POST['data_preocupation'];



    $sql = "INSERT INTO hard (nom, prenom, email,tel,preocupation) VALUES(?,?,?,?,?)";
    $exec = $conn->prepare($sql);

    if($exec->execute([$nom, $prenom, $email , $tel ,$preocupation ]))
    {

        $message =  "Insertion avec success";
        echo json_encode([
            "error" => false,
            "message" => $message
        ]);

    }else
    {
        $message = "Insertion échouer";

        echo json_encode([
            "error" => true,
            "message" => $message
        ]);
        
    }
}
?>