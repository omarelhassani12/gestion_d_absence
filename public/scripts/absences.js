
// <!-- //inscre les absence justifie and disply the model of them -->
  // Event listener for the specific justified checkbox
  const justifiedCheckboxes = document.querySelectorAll('[data-justified-checkbox]');
  justifiedCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', function () {
      if (this.checked) {
        // Show the modal when the checkbox is checked
        const stagiaireId = this.getAttribute('data-stagiaire-id'); // Use data-stagiaire-id attribute instead of data-absence-id
        showJustifiedAbsenceModal(stagiaireId); // Pass stagiaireId instead of absenceId
      }
    });
  });

  // Function to show the justified absence modal
  function showJustifiedAbsenceModal(stagiaireId) { // Use stagiaireId instead of absenceId
    document.getElementById('justifiedAbsenceModal').setAttribute('data-stagiaire-id', stagiaireId); // Use data-stagiaire-id attribute instead of data-absence-id
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
    $('#justifiedAbsenceModal').modal('show');
  }

  // Function to handle the form submission and create the justified absence record
  function saveJustifiedAbsence() {
    const stagiaireId = document.getElementById('justifiedAbsenceModal').getAttribute('data-stagiaire-id'); // Use data-stagiaire-id attribute instead of data-absence-id
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    // Perform any validation if needed (e.g., check if the dates are valid)

    // Send the form data to the server using fetch or any other method
    const formData = {
      stagiaireId, // Use stagiaireId instead of absenceId
      startDate,
      endDate,
    };

    // Make a POST request to your server to create the justified absence
    fetch('/justified-absences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server (e.g., show a success message)
        console.log(data);
        // Optionally, you can hide the modal after creating the justified absence
        $('#justifiedAbsenceModal').modal('hide');
      })
      .catch((error) => {
        // Handle any error that occurred during the POST request
        console.error('Error creating justified absence:', error);
      });
  }




document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners to the attendance checkboxes
    const attendanceCheckboxes = document.querySelectorAll('.attendance-checkbox');
    attendanceCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const studentId = checkbox.getAttribute('data-student-id');
        const sessionNumber = checkbox.classList.contains('first-session-checkbox') ? 1 : 2;
        const isChecked = checkbox.checked;
        updateAttendance(studentId, sessionNumber, isChecked);
      });
    });
  
    // Add event listeners to the is-justified checkboxes
    const justifiedCheckboxes = document.querySelectorAll('.is-justified-checkbox');
    justifiedCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const absenceId = checkbox.getAttribute('data-absence-id'); // Get the correct absenceId
        const isChecked = checkbox.checked;
        updateJustifiedAbsence(absenceId, isChecked);
      });
    });
  });
  
  
  async function updateAttendance(studentId, sessionNumber, isChecked) {
    try {
      // Make an AJAX request using the fetch API
      const response = await fetch(`/absence/update/${studentId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          [`session${sessionNumber}_attendance`]: isChecked ? '1' : '0', // Convert the boolean to '1' or '0'
          isChecked: isChecked // Include the isChecked value in the request
        })
      });
  
      if (response.ok) {
        console.log('Attendance updated successfully');
        // Optionally, you can update the checkbox state based on the server's response
        // const responseData = await response.json();
        // console.log(responseData);
      } else {
        console.error('Failed to update attendance');
        // Handle the error response here if needed
      }
    } catch (error) {
      console.error('Error updating attendance:', error);
      // Handle any other errors here
    }
  }
  
  async function updateJustifiedAbsence(absenceId, isChecked) {
    try {
      // Make an AJAX request using the fetch API
      const response = await fetch(`/absence/update/${absenceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          is_justified: isChecked ? '1' : '0' // Include the updated is_justified value in the request
        })
      });
  
      if (response.ok) {
        console.log('Justified absence updated successfully');
        // Optionally, you can update the checkbox state based on the server's response
        // const responseData = await response.json();
        // console.log(responseData);
      } else {
        console.error('Failed to update justified absence');
        // Handle the error response here if needed
      }
    } catch (error) {
      console.error('Error updating justified absence:', error);
      // Handle any other errors here
    }
  }
  























// {/* <!-- //filter data by period --> */}
    function filterByPeriod(period) {
      const rows = document.querySelectorAll('#tableBody tr');
  
      // Hide all rows
      rows.forEach(row => (row.style.display = 'none'));
  
      // Show rows with the matching period
      rows.forEach(row => {
        const periodCell = row.querySelector('.text-center[data-period]');
        if (periodCell.dataset.period === period) {
          row.style.display = 'table-row';
        }
      });
    }
    