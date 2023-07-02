let urganceDetailsModal = null; // Variable to store the urgance details modal element

function getUrganceDetails(urganceId) {
  fetch(`/GetUrganceDetails?id=${urganceId}`)
    .then((response) => response.json())
    .then((urgance) => {
      if (urganceDetailsModal) {
        // If there is an existing modal, remove it from the DOM
        urganceDetailsModal.remove();
      }

      // Create the modal element
      urganceDetailsModal = document.createElement('div');
      urganceDetailsModal.innerHTML = `
        <div class="modal fade" id="urganceDetailsModal" tabindex="-1" role="dialog" aria-labelledby="urganceDetailsModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="urganceDetailsModalLabel">${urgance.name} Details</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="text-center">
                  <img src="${urgance.image}" alt="Urgance Image" class="img-fluid rounded-circle mb-3" style="width: 150px;">
                </div>
                <p><strong>Title:</strong> <span id="urganceDetailsTitle">${urgance.name}</span></p>
                <p><strong>Description:</strong> <span id="urganceDetailsDescription">${urgance.description}</span></p>
                <p><strong>Date:</strong> <span id="urganceDetailsDate">${urgance.date}</span></p>
                <p><strong>Location:</strong> <span id="urganceDetailsLocation">${urgance.location}</span></p>
                <p><strong>Status:</strong> <span id="urganceDetailsStatus">${urgance.status}</span></p>
              </div>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(urganceDetailsModal);

      const modal = new bootstrap.Modal(document.getElementById('urganceDetailsModal'));
      modal.show();

      modal.addEventListener('hidden.bs.modal', () => {
        urganceDetailsModal.remove(); // Remove the modal from the DOM
        urganceDetailsModal = null; // Reset the variable
      });
    })
    .catch((error) => {
      console.error('Error fetching urgance details:', error);
    });
}

