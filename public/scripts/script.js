document.addEventListener('DOMContentLoaded', () => {
  const dateSelect = document.getElementById('dateSelect');
  const startDate = new Date('2023-07-28');
  const currentDate = new Date();

  while (startDate <= currentDate) {
    const option = document.createElement('option');
    option.value = formatDate(startDate);
    option.textContent = formatDate(startDate);
    dateSelect.appendChild(option);

    if (startDate.toDateString() === currentDate.toDateString()) {
      option.selected = true; // Set the default value to today's date
    }

    startDate.setDate(startDate.getDate() + 1);
  }
});

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


//for the preiod"""

document.addEventListener('DOMContentLoaded', () => {
  const periodSelect = document.getElementById('periodSelect');

  // Event listener for the period select element
  periodSelect.addEventListener('change', () => {
    const selectedPeriod = periodSelect.value;
    console.log(`Selected period: ${selectedPeriod}`);
    // You can perform any actions here based on the selected period (AM or PM)
  });
});
