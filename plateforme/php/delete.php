<?php

require 'connexion.php';

if($_SERVER["REQUEST_METHOD"] == "POST"){
    $idMateriel = $_POST['id_materiel'];
    


    $sql = "DELETE FROM hard WHERE id = ?";
    $exec = $conn->prepare($sql);

    if($exec->execute([$idMateriel]))
    {

        $message =  "Suppression avec success";
        echo json_encode([
            "error" => false,
            "message" => $message
        ]);

    }else
    {
        $message = "Suppression échouer";

        echo json_encode([
            "error" => true,
            "message" => $message
        ]);
        
    }
}
