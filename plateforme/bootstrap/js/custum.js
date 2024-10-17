$(document).ready(function () {
    let listmateriels = function () { 
        $.ajax({
            type: "POST",
            url: "php/list.php",
            success: function (response) {
             $("#Maintenances").html(response);   
            }
        });
     }
     listmateriels();

    $("#ajouter").on('click', function () {
        let message = "Veuillez saisir: ";

        let nom = $("#nom").val();
        let prenom = $("#prenom").val();
         let email = $("#email").val();
          let tel = $("#tel").val();
        let preocupation = $("#preocupation").val();

        if(!nom)
        {
            message += "le nom, "
        }
        
        if(!prenom)
        {
            message += "le prenom, "
        }
        
        if(!email)
        {
            message += "l'email, "
        }

         
        if(!tel)
        {
            message += "le telephone, "
        }

          
        if(!preocupation)
            {
                message += "les preocupations, "
            }

        if(message != "Veuillez saisir: ")
        {
            $("#error").html(`<div class="text-white fw-semibold bg-danger p-2 text-center rounded mb-2">`+message+`</div>`);
            return 0;
        
        }else
        {
            $("#error").html();
            
        }

        $.ajax({
            type: "POST",
            url: "php/new.php",
            data: {
                data_nom: nom,
                data_prenom: prenom,
                data_email: email,
                data_tel: tel,
                data_preocupation: preocupation

            },
            success: function (response) {
                response = JSON.parse(response);
                if (response.error == false) {
                    $("#error").html(`<div class="text-white fw-semibold bg-success p-2 text-center rounded mb-2">`+response.message+`</div>`);
                    $(".info").val("");
                    listmateriels();
                }else{
                    $("#error").html(`<div class="text-white fw-semibold bg-danger p-2 text-center rounded mb-2">`+response.message+`</div>`);
                }
            }
        });
    });

    $(document).on('click', ".deleted", function () {
        let idMateriel = $(this).attr("id-materiel");
        if(confirm("Voulez-vous vraiment supprimer votre messages ?")){
            $.ajax({
                type: "POST",
                url: "php/delete.php",
                data: {
                    id_materiel : idMateriel
                },
                success: function (response) {
                    response = JSON.parse(response);
                    if (response.error == false) {
                        $("#error").html(`<div class="text-white fw-semibold bg-success p-2 text-center rounded mb-2">`+response.message+`</div>`);
                        $(".info").val("");
                        listmateriels();
                        
                    }else{
                        $("#error").html(`<div class="text-white fw-semibold bg-danger p-2 text-center rounded mb-2">`+response.message+`</div>`);
                    }
                }
            });
        }
    });

    $(document).on('click', ".sweet-deleted", function () {
        let idMateriel = $(this).attr("id-materiel");
        Swal.fire({
            title: "Voulez-vous vraiment supprimer cet messages ?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    type: "POST",
                    url: "php/delete.php",
                    data: {
                        id_materiel : idMateriel
                    },
                    success: function (response) {
                        response = JSON.parse(response);
                        if (response.error == false) {
                            $(".info").val("");
                            listmateriels();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                              });
                        }else{
                            $("#error").html(`<div class="text-white fw-semibold bg-danger p-2 text-center rounded mb-2">`+response.message+`</div>`);
                        }
                    }
                });
              
            }
          });
    
    });

    $(document).on('click', ".edit", function () {
        let idMateriel = $(this).attr("id-materiel");
        let preocupation = $(this).parent().prev().text();
        let tel= $(this).parent().prev().text();
        let email = $(this).parent().prev().prev().text();
        let prenom = $(this).parent().prev().prev().text();
        let nom = $(this).parent().prev().prev().prev().text();
        $("#nom").val(nom);
        $("#prenom").val(prenom);
        $("#email").val(email);
        $("#tel").val(tel);
        $("#preocupation").val(preocupation);
        $("#ajouter").attr("hidden", "");
        $("#modifier").removeAttr("hidden");
        $("#modifier").attr("id-materiel", idMateriel);
        
    });

    $(document).on('click', "#modifier", function () {
        let idMateriel = $(this).attr("id-materiel");
        let message = "Veuillez saisir: ";

        let nom = $("#nom").val();
        let prenom = $("#prenom").val();
        let email = $("#email").val();
        let tel = $("#tel").val();
        let preocupation = $("#preocupation").val();

        if(!nom)
        {
            message += "le nom, "
        }
        
        if(!prenom)
        {
            message += "le prenom, "
        }
        
        if(!email)
        {
            message += "l'email, "
        }

        if(!tel)
        {
            message += "le telephone, "
        }

        if(!preocupation)
            {
                message += "les preocupations, "
            }
    
        if(message != "Veuillez saisir: ")
        {
            $("#error").html(`<div class="text-white fw-semibold bg-danger p-2 text-center rounded mb-2">`+message+`</div>`);
            return 0;
        
        }else
        {
            $("#error").html();
            
        }

        $.ajax({
            type: "POST",
            url: "php/edit.php",
            data: {
                data_id: idMateriel,
                data_nom: nom,
                data_prenom: prenom,
                data_email: email,
                data_tel: tel,
                data_preocupation: preocupation

            },
            success: function (response) {
                response = JSON.parse(response);
                if (response.error == false) {
                    $("#error").html(`<div class="text-white fw-semibold bg-success p-2 text-center rounded mb-2">`+response.message+`</div>`);
                    $(".info").val("");
                    $("#modifier").attr("hidden", "");
                    $("#ajouter").removeAttr("hidden");
                    listmateriels();
                }else{
                    $("#error").html(`<div class="text-white fw-semibold bg-danger p-2 text-center rounded mb-2">`+response.message+`</div>`);
                }
            }
        });
    });
});


