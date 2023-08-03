// // <!-- //update the absence -->
//     document.addEventListener('DOMContentLoaded', () => {
//       // Add event listeners to the attendance checkboxes
//       const attendanceCheckboxes = document.querySelectorAll('.attendance-checkbox');
//       attendanceCheckboxes.forEach(checkbox => {
//         checkbox.addEventListener('change', () => {
//           const studentId = checkbox.getAttribute('data-student-id');
//           const sessionNumber = checkbox.classList.contains('first-session-checkbox') ? 1 : 2;
//           const isChecked = checkbox.checked; // Get the updated checkbox value
  
//           updateAttendance(studentId, sessionNumber, isChecked); // Call the function with the updated value
//         });
//       });
//     });
  
//     async function updateAttendance(studentId, sessionNumber, isChecked) {
//       try {
//         // Make an AJAX request using the fetch API
//         const response = await fetch(`/absence/update/${studentId}`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             [`session${sessionNumber}_attendance`]: isChecked ? '1' : '0', // Convert the boolean to '1' or '0'
//           })
//         });
  
//         if (response.ok) {
//           console.log('Attendance updated successfully');
//           // Optionally, you can update the checkbox state based on the server's response
//           // const responseData = await response.json();
//           // console.log(responseData);
//         } else {
//           console.error('Failed to update attendance');
//           // Handle the error response here if needed
//         }
//       } catch (error) {
//         console.error('Error updating attendance:', error);
//         // Handle any other errors here
//       }
//     }
  




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
    