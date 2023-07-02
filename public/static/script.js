


fetch('/GetUsers')
  .then((response) => response.json())
  .then((data) => {
    const usersContainer = document.getElementById('usersContainer');
    usersContainer.innerHTML = ''; // Clear existing content

    // Loop through the user data and create user cards
    data.forEach((user) => {
      const userCard = document.createElement('div');
      userCard.className = 'col';

      // Determine the badge class based on the user's role
      let badgeClass = '';
      if (user.role === 'Admin') {
        badgeClass = 'badge bg-red-lt';
      } else if (user.role === 'Doctor') {
        badgeClass = 'badge bg-blue-lt';
      } else if (user.role === 'Patient') {
        badgeClass = 'badge bg-green-lt';
      } else if (user.role === 'Assistant') {
        badgeClass = 'badge bg-yellow-lt';
      }

      const cardContent = `
        <div class="card">
          <div class="card-body p-4 text-center">
            <span class="avatar avatar-xl mb-3 rounded" style="background-image: url('${user.avatar}')"></span>
            <h3 class="m-0 mb-1"><a href="#">${user.username}</a></h3>
            <div class="mt-3">
              <span class="${badgeClass}">${user.role}</span>
            </div>
          </div>
          <div>
         
        </div>
          <div class="d-flex">
          
            <a href="#" class="card-btn" onclick="">
            <input type="checkbox" class="form-switch-input" id="isActiveSwitch" ${user.isActive ? 'checked' : ''} onchange="toggleUserActivation(${user.id}, this.checked)">
            <i class="form-switch-icon"></i>
            </a>
            <a href="#" class="card-btn" onclick="getUserDetails(${user.id})">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon me-2 text-muted" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17.788 7.152l.06 -.06a2 2 0 0 1 2.92 2.72l-.058 .066l-3.5 3.5a1 1 0 0 1 -.543 .28l-.137 .014h-6a1 1 0 0 1 -.117 -.007l-.137 -.014a1 1 0 0 1 -.543 -.28l-3.5 -3.5a2 2 0 0 1 2.72 -2.92l.06 .06l2.793 2.793h3.826l-.793 -.793a2 2 0 0 1 0 -2.828l.06 -.058z" /></svg>
            
            </a>
            <a href="#" class="card-btn delete-btn" data-userid="${user.id}" onclick="deleteUser(event)">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon me-2 text-muted" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="4" y1="7" x2="20" y2="7" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                
            </a>          
          </div>
        </div>
      `;

      userCard.innerHTML = cardContent;

      // Append the user card to the users container
      usersContainer.appendChild(userCard);
    });
  })
  .catch((error) => {
    console.error('Error fetching user data:', error);
  });

  //toggele of activation account
  function toggleUserActivation(userId, isActive) {
    $.ajax({
      url: '/update-user-activation',
      method: 'POST',
      data: JSON.stringify({
        userId: userId,
        isActive: isActive
      }),
      contentType: 'application/json',
      success: function(response) {
        // Handle the success response here
        console.log('User activation status updated successfully');
      },
      error: function(error) {
        // Handle the error response here
        console.error('Error updating user activation status:', error);
      }
    });
  }
  
  ///deleting users

function deleteUser(event) {
    event.preventDefault();
  
    const deleteBtn = event.target.closest('.delete-btn');
    const userId = deleteBtn.getAttribute('data-userid');
  
    fetch(`/DeleteUser?id=${userId}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.ok) {
          // Display a success message as a modal
          const modalElement = document.createElement('div');
          modalElement.classList.add('modal', 'fade');
          modalElement.setAttribute('tabindex', '-1');
          modalElement.setAttribute('role', 'dialog');
          modalElement.innerHTML = `
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <div class="alert alert-success" role="alert">
                    User deleted successfully.
                  </div>
                </div>
              </div>
            </div>
          `;
          document.body.appendChild(modalElement);
  
          // Show the modal
          const modal = new bootstrap.Modal(modalElement);
          modal.show();
  
          // Hide the modal after 2 seconds
          setTimeout(() => {
            modal.hide();
            document.body.removeChild(modalElement);
          }, 2000);
  
          // Refresh the user list after successful deletion
          fetch('/GetUsers')
            .then((response) => response.json())
            .then((data) => {
              const usersContainer = document.getElementById('usersContainer');
              usersContainer.innerHTML = ''; // Clear existing content
  
              // Loop through the user data and create user cards
              data.forEach((user) => {
                const userCard = document.createElement('div');
                userCard.className = 'col';
  
                // Determine the badge class based on the user's role
                let badgeClass = '';
                if (user.role === 'Admin') {
                  badgeClass = 'badge bg-red-lt';
                } else if (user.role === 'Doctor') {
                  badgeClass = 'badge bg-blue-lt';
                } else if (user.role === 'Patient') {
                  badgeClass = 'badge bg-green-lt';
                } else if (user.role === 'Assistant') {
                  badgeClass = 'badge bg-yellow-lt';
                }
  
                const cardContent = `
                  <div class="card">
                    <div class="card-body p-4 text-center">
                      <span class="avatar avatar-xl mb-3 rounded" style="background-image: url('${user.avatar}')"></span>
                      <h3 class="m-0 mb-1"><a href="#">${user.username}</a></h3>
                      <div class="mt-3">
                        <span class="${badgeClass}">${user.role}</span>
                      </div>
                    </div>
                    <div class="d-flex">
                    <a href="#" class="card-btn" onclick="getUserDetails(${user.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon me-2 text-muted" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17.788 7.152l.06 -.06a2 2 0 0 1 2.92 2.72l-.058 .066l-3.5 3.5a1 1 0 0 1 -.543 .28l-.137 .014h-6a1 1 0 0 1 -.117 -.007l-.137 -.014a1 1 0 0 1 -.543 -.28l-3.5 -3.5a2 2 0 0 1 2.72 -2.92l.06 .06l2.793 2.793h3.826l-.793 -.793a2 2 0 0 1 0 -2.828l.06 -.058z" /></svg>
                    Details
                    </a>
                      <button class="card-btn delete-btn" data-userid="${user.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon me-2 text-muted" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="4" y1="7" x2="20" y2="7" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                        Delete
                      </button>
                    </div>
                  </div>
                `;
  
                userCard.innerHTML = cardContent;
                usersContainer.appendChild(userCard);
              });
            })
            .catch((error) => {
              console.error('Error fetching user data:', error);
            });
        } else {
          console.error('Failed to delete user:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  }
  

  ///details user  
let userDetailsModal = null; // Variable to store the user details modal element

function getUserDetails(userId) {
  fetch(`/GetUserDetails?id=${userId}`)
    .then((response) => response.json())
    .then((user) => {
      if (userDetailsModal) {
        // If there is an existing modal, remove it from the DOM
        userDetailsModal.remove();
      }

      // Create the modal element
      userDetailsModal = document.createElement('div');
      userDetailsModal.innerHTML = `
    <div class="modal fade" id="userDetailsModal" tabindex="-1" role="dialog" aria-labelledby="userDetailsModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="userDetailsModalLabel">${user.username} Details</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="text-center">
            ${user.avatar ? `<img src="${user.avatar}" alt="User Image" class="img-fluid rounded-circle mb-3" style="width: 150px;">` : ''}
            </div>
            ${user.role ? `<h6><strong>Role:</strong> <span id="userDetailsRole">${user.role}</span></h6>` : ''}
            ${user.username ? `<p><strong>Username:</strong> <span id="userDetailsUsername">${user.username}</span></p>` : ''}
            ${user.email ? `<p><strong>Email:</strong> <span id="userDetailsEmail">${user.email}</span></p>` : ''}
            ${user.cni ? `<p><strong>CNI:</strong> <span id="userDetailsCNI">${user.cni ? user.cni : ''}</span></p>` : ''}
            ${user.phone ? `<p><strong>Phone:</strong> <span id="userDetailsPhone">${user.phone ? user.phone : ''}</span></p>` : ''}
            ${user.urgence ? `<p><strong>Urgence:</strong> <span id="userDetailsUrgence">${user.urgence ? user.urgence : ''}</span></p>` : ''}
            ${user.sexe ? `<p><strong>Sexe:</strong> <span id="userDetailsSexe">${user.sexe ? user.sexe : ''}</span></p>` : ''}
            ${user.age ? `<p><strong>Age:</strong> <span id="userDetailsAge">${user.age ? user.age : ''}</span></p>` : ''}
            ${user.speciality ? `<p><strong>Speciality:</strong> <span id="userDetailsSpeciality">${user.speciality ? user.speciality : ''}</span></p>` : ''}
          </div>
        </div>
      </div>
    </div>
`;


      document.body.appendChild(userDetailsModal);

      const modal = new bootstrap.Modal(document.getElementById('userDetailsModal'));
      modal.show();

      modal.addEventListener('hidden.bs.modal', () => {
        userDetailsModal.remove(); // Remove the modal from the DOM
        userDetailsModal = null; // Reset the variable
      });
    })
    .catch((error) => {
      console.error('Error fetching user details:', error);
    });
}
