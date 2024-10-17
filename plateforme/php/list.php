<?php

require 'connexion.php';

if($_SERVER["REQUEST_METHOD"] == "POST"){
    $sql = "SELECT * FROM hard ORDER BY id DESC";
    $exec = $conn->prepare($sql);
    $exec->execute();
    $enum = 1;
    while ($materiel = $exec->fetch()) {
        echo "
        <tr>
            <th>$enum</th>
            <td>".$materiel['nom']."</td>
            <td>".$materiel['prenom']."</td>
            <td>".$materiel['email']."</td>
              <td>".$materiel['tel']."</td> 
               <td>".$materiel['preocupation']."</td>
            <td>
            <button  class='btn btn-sm btn-danger sweet-deleted' id-materiel='".$materiel['id']."'>Supprimer</button>
            <button  class='btn btn-sm btn-success edit' id-materiel='".$materiel['id']."'>Modifier</button>
            </td>
        </tr>
        ";
        $enum++;
    }
}
?>