$(document).ready(function () {
    let listServices = function () { 
        $.ajax({
            type: "POST",
            url: "php/liste.php",
            success: function (response) {
             $("#LesServices").html(response);   
            }
        });
     }
     listServices();

    $("#ajouter").on('click', function () {
        let message = "Veuillez saisir: ";

        let nom = $("#nom").val();
        let prix = $("#prix").val();
        let description = $("#description").val();

        if(!nom)
        {
            message += "le nom, "
        }
        
        
        
        if(!prix)
        {
            message += "le prix, "
        }

         
        if(!description)
        {
            message += "la description, "
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
            url: "php/service.php",
            data: {
                data_nom: nom,
                data_prix: prix,
                data_description: description
            },
            success: function (response) {
                response = JSON.parse(response);
                if (response.error == false) {
                    $("#error").html(`<div class="text-white fw-semibold bg-success p-2 text-center rounded mb-2">`+response.message+`</div>`);
                    $(".info").val("");
                    listServices();
                }else{
                    $("#error").html(`<div class="text-white fw-semibold bg-danger p-2 text-center rounded mb-2">`+response.message+`</div>`);
                }
            }
        });
    });

    $(document).on('click', ".deleted", function () {
        let idService = $(this).attr("id-services");
        if(confirm("Voulez-vous vraiment supprimer cet services ?")){
            $.ajax({
                type: "POST",
                url: "php/delet.php",
                data: {
                    id_service : idService
                },
                success: function (response) {
                    response = JSON.parse(response);
                    if (response.error == false) {
                        $("#error").html(`<div class="text-white fw-semibold bg-success p-2 text-center rounded mb-2">`+response.message+`</div>`);
                        $(".info").val("");
                        listServices();
                        
                    }else{
                        $("#error").html(`<div class="text-white fw-semibold bg-danger p-2 text-center rounded mb-2">`+response.message+`</div>`);
                    }
                }
            });
        }
    });

    $(document).on('click', ".sweet-deleted", function () {
        let idService = $(this).attr("id-services");
        Swal.fire({
            title: "Voulez-vous vraiment supprimer cet services ?",
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
                    url: "php/delet.php",
                    data: {
                        id_service : idService
                    },
                    success: function (response) {
                        response = JSON.parse(response);
                        if (response.error == false) {
                            $(".info").val("");
                            listServices();
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
        let idService = $(this).attr("id-services");
        let description = $(this).parent().prev().text();
        let prix = $(this).parent().prev().prev().text();
        let nom = $(this).parent().prev().prev().prev().text();

        $("#nom").val(nom);
        $("#prix").val(prix);
        $("#description").val(description);

        $("#ajouter").attr("hidden", "");
        $("#modifier").removeAttr("hidden");
        $("#modifier").attr("id-services", idService);
        
    });

    $(document).on('click', "#modifier", function () {
        let idService = $(this).attr("id-services");
        let message = "Veuillez saisir: ";
        let nom = $("#nom").val();
        let prix = $("#prix").val();
        let description = $("#description").val();

        if(!nom)
        {
            message += "le nom, "
        }
        
        
        if(!prix)
        {
            message += "le prix, "
        }

        if(!description)
        {
            message += "la description, "
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
            url: "php/edict.php",
            data: {
                data_id_s: idService,
                data_nom: nom,
                data_prix: prix,
                data_description: description
            },
            success: function (response) {
                response = JSON.parse(response);
                if (response.error == false) {
                    $("#error").html(`<div class="text-white fw-semibold bg-success p-2 text-center rounded mb-2">`+response.message+`</div>`);
                    $(".info").val("");
                    $("#modifier").attr("hidden", "");
                    $("#ajouter").removeAttr("hidden");
                    listServices();
                }else{
                    $("#error").html(`<div class="text-white fw-semibold bg-danger p-2 text-center rounded mb-2">`+response.message+`</div>`);
                }
            }
        });
    });
});