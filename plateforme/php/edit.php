<?php

require 'connexion.php';

if($_SERVER["REQUEST_METHOD"] == "POST"){
    $idMateriel = $_POST['data_id'];
    $nom = $_POST['data_nom'];
    $prenom = $_POST['data_prenom'];
    $email = $_POST['data_email'];
    $tel = $_POST['data_tel'];
    $preocupation = $_POST['data_preocupation'];


    $sql = "UPDATE hard SET nom = ?, prenom = ?, email = ? , tel = ?, preocupation = ? WHERE id = ?";
    $exec = $conn->prepare($sql);

    if($exec->execute([$nom, $prenom, $email, $tel, $preocupation, $idMateriel]))
    {

        $message =  "Modification avec success";
        echo json_encode([
            "error" => false,
            "message" => $message
        ]);

    }else
    {
        $message = "Modification échouer";

        echo json_encode([
            "error" => true,
            "message" => $message
        ]);
        
    }
}
