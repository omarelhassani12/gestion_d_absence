     $(document).ready(function () { 
        // Insert User
        $('#create-user-button').on('click', function () {
            var form = $('#create-user-form');
            var formData = form.serialize();

            // Get the full name value from the input field
            var fullName = $('[name="nom_complete"]').val();

            // Set the password field with the full name value
            $('[name="password"]').val(fullName);

            $.ajax({
                url: '/user',
                type: 'POST',
                data: formData,
                success: function (response) {
                    console.log('Utilisateur créé avec succès');

                    // Show success alert
                    $('#success-alert').fadeIn();

                    // Hide the alert after 3 seconds
                    setTimeout(function () {
                        $('#success-alert').fadeOut();
                    }, 3000);

                    // Fermer la fenêtre modale
                    $('#modal-report').modal('hide');

                    // Recharger la page pour afficher le nouvel utilisateur
                    location.reload();
                },
                error: function (xhr, status, error) {
                    console.error('Une erreur est survenue lors de la création de l\'utilisateur :', error);
                }
            });
        });
    });

    /* // Supprimer l'utilisateur */
    function confirmDelete(event, userId) {
        event.preventDefault(); // Empêcher la soumission du formulaire

        // Récupérer l'élément modal
        var modal = document.getElementById('exampleModalCenter');

        // Récupérer les boutons dans la modal
        var confirmButton = modal.querySelector('#confirm-delete-button');
        var closeButton = modal.querySelector('.btn-secondary');

        // Mettre à jour l'événement click du bouton de confirmation
        confirmButton.onclick = function() {
            // Effectuer l'opération de suppression
            fetch(`/user/${userId}`, {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Utilisateur supprimé avec succès
                        $('#delete-success-alert').removeClass('d-none'); // Show success alert for delete
                        setTimeout(function () {
                            $('#delete-success-alert').addClass('d-none'); // Hide the delete success alert after 3 seconds
                        }, 3000);
                        location.href = location.href; // Redirect to the same page to refresh it after successful deletion
                    } else {
                        // Erreur lors de la suppression de l'utilisateur
                        console.error('Une erreur est survenue lors de la suppression de l\'utilisateur : ' + data.error);
                    }
                })
                .catch(error => {
                    console.error(error);
                    console.error('Une erreur est survenue lors de la suppression de l\'utilisateur');
                });

            // Fermer la modal
            $(modal).modal('hide');
        };

        // Afficher la modal
        $(modal).modal('show');

        // Mettre à jour l'événement click du bouton de fermeture
        closeButton.onclick = function() {
            // Fermer la modal
            $(modal).modal('hide');
        };
    }


/* // Mettre à jour l'utilisateur */
function goToUpdatePage(userId) {
    window.location.href = `/user/update/${userId}`;
}
