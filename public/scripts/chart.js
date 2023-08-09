
  // Fetch chart data from the server
  async function fetchChartData() {
    try {
      const response = await fetch('/chart-data');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching chart data:', error);
      throw error;
    }
  }


  // Function to create the absence chart
  async function createAbsenceChart() {
    const chartData = await fetchChartData();
    const ctx = document.getElementById('absenceChart').getContext('2d');
    
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chartData.map(item => item.date),
        datasets: [
          {
            label: 'Total d\'absences par jour',
            data: chartData.map(item => item.totalAbsences),
            // backgroundColor: 'rgba(10, 100, 100, 0.5)',
            // backgroundColor: 'rgba(54, 162, 235, 0.5)',
            backgroundColor: 'rgba(75, 192, 0, 0.5)',
            // backgroundColor: 'rgba(153, 102, 255, 0.5)',
            // backgroundColor: 'rgba(255, 159, 64, 0.5)',
          },
        ],
      },
    });
  }


  // Fetch chart data by month from the server
  async function fetchChartDataByMonth() {
    try {
      const response = await fetch('/chart-data-by-month');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching chart data by month:', error);
      throw error;
    }
  }

  // Function to create the absence chart by month
  async function createAbsenceChartByMonth() {
    const chartData = await fetchChartDataByMonth();
    const ctx = document.getElementById('absenceMonthChart').getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chartData.map(item => item.monthYear),
        datasets: [
          {
            label: 'Total d\'Absences par Mois',
            data: chartData.map(item => item.totalAbsences),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
          },
        ],
      },
      options: {
        // Add any chart options you need here
      },
    });
  }
    // Wait for the DOM to be ready before creating the chart
    document.addEventListener('DOMContentLoaded', () => {
    createAbsenceChart();
    createAbsenceChartByMonth();
  });



