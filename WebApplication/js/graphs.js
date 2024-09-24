$(document).ready(function () {
  // Initialize the line chart
  const ctxLine = document.getElementById('tasks-chart').getContext('2d');
  const tasksChart = new Chart(ctxLine, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: 'New Requests',
          data: [],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
        },
        {
          label: 'New Offers',
          data: [],
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
        },
        {
          label: 'Processed Requests',
          data: [],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
        {
          label: 'Processed Offers',
          data: [],
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
        },
      ],
    },
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Number of Tasks',
          },
        },
      },
    },
  });

  // Initialize the bar chart
  const ctxBar = document.getElementById('tasks-bar-chart').getContext('2d');
  const tasksBarChart = new Chart(ctxBar, {
    type: 'bar',
    data: {
      labels: [],
      datasets: [
        {
          label: 'New Requests',
          data: [],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
        {
          label: 'New Offers',
          data: [],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
        {
          label: 'Processed Requests',
          data: [],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'Processed Offers',
          data: [],
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Number of Tasks',
          },
        },
      },
    },
  });

  // Function to fetch and update the chart data
  function fetchData(period) {
    if (!period) return; // If no period is selected, do nothing

    $.ajax({
      url: '../../php/administrator/misc/getGraphData.php',
      method: 'GET',
      data: { period },
      success: function (data) {
        const response = JSON.parse(data);
        console.log(response); // Log the parsed response to the console

        // Update line chart
        tasksChart.data.labels = response.labels;
        tasksChart.data.datasets[0].data = response.newRequests;
        tasksChart.data.datasets[1].data = response.newOffers;
        tasksChart.data.datasets[2].data = response.processedRequests;
        tasksChart.data.datasets[3].data = response.processedOffers;
        tasksChart.update();

        // Update bar chart
        tasksBarChart.data.labels = response.labels;
        tasksBarChart.data.datasets[0].data = response.newRequests;
        tasksBarChart.data.datasets[1].data = response.newOffers;
        tasksBarChart.data.datasets[2].data = response.processedRequests;
        tasksBarChart.data.datasets[3].data = response.processedOffers;
        tasksBarChart.update();
      },
      error: function (xhr, status, error) {
        console.error('Error fetching data:', status, error);
      },
    });
  }

  // Event listener for time period selection
  $('#time-period').on('change', function () {
    const period = $(this).val();
    fetchData(period);
  });

  // Event listener for graph style selection
  $('#graph-style').on('change', function () {
    const style = $(this).val();
    if (style === 'side-by-side') {
      $('#line-chart-container').show().css('width', '50%');
      $('#bar-chart-container').show().css('width', '50%');
    } else if (style === 'line-only') {
      $('#line-chart-container').show().css('width', '100%');
      $('#bar-chart-container').hide();
    } else if (style === 'bar-only') {
      $('#line-chart-container').hide();
      $('#bar-chart-container').show().css('width', '100%');
    }
  });

  // Initial setup for graph style
  $('#graph-style').trigger('change');
});
