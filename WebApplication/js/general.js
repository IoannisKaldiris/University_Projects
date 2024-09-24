// general helper functions
function jsDateToMySqlDate(date) {
  return date.toISOString().slice(0, 19).replace("T", " ");
}

function getDateWithInterval(date, interval) {
  // interval (days) * 24 (hours) * 60 (minutes) * 60 (seconds) * 1000 (milliseconds )
  return new Date(date.getTime() + interval * 24 * 60 * 60 * 1000);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/* General Ajax Get Call */
function callAjaxGetRequestFunc(url, callback, errorCallback) {
  $.ajax({
    type: "GET",
    url: url,
    success: function (response) {
      callback(response);
    },
    error: function (error) {
      if (typeof errorCallback == "undefined") {
        console.log(error);
        generateAlert("Error", "We have trouble connecting with database. Please try again later.", "error");
      } else {
        errorCallback(error);
      }
    },
  });
}

/* General Ajax POST Call */
function callAjaxPostRequestFunc(url, data, callback, errorCallback) {
  $.ajax({
    type: "POST",
    url: url,
    data: data,
    success: function (response) {
      callback(response);
    },
    error: function (error) {
      if (typeof errorCallback == "undefined") {
        console.log(error);
        generateAlert("Error", "We have trouble connecting with database. Please try again later.", "error");
      } else {
        errorCallback(error);
      }
    },
  });
}

/* General Multiple Ajax POST Call */
function callMultipleAjaxPostRequestsFunc(allData, url, callback, errorCallback) {
  var promises = [];
  for (d in allData) {
    var request = $.ajax({
      type: "POST",
      url: url,
      data: allData[d],
    });
    promises.push(request);
  }
  Promise.all(promises).then((responseList) => {
    callback(responseList);
  });
}

/* General Alert Call */
function generateAlert(title, message, icon, button) {
  if (typeof button == "undefined") {
    button = "OK";
  }

  if (typeof title == "undefined" || typeof message == "undefined") {
    throw new Error("title and message must be specified on alerts");
  }

  swal({
    title: title,
    text: message,
    icon: icon,
    button: button,
    padding: '2rem',
    background: '#1f2937',
    color: '#ffffff',
    confirmButtonColor: '#d97706',
  });
}

/* General Confirm Call */
function generateConfirm(title, message, onTrueCallback, onFalseCallback) {
  if (typeof title == "undefined" || typeof message == "undefined") {
    throw new Error("title and message must be specified on alerts");
  }
  swal({
    title: title,
    text: message,
    icon: "info",
    buttons: true,
    dangerMode: true,
  }).then((buttonPressed) => {
    if (buttonPressed) {
      onTrueCallback();
    } else {
      if (typeof onFalseCallback != "undefined") {
        onFalseCallback();
      }
    }
  });
}

/* Fetch and display announcements */
function fetchAndDisplayAnnouncements() {
  $.ajax({
    url: './misc/getAnnouncements.php',
    type: 'GET',
    dataType: 'json',
    success: function (response) {
      const announcementsBody = $('#announcements-body');
      announcementsBody.empty(); // Clear any existing data

      $.each(response, function (key, announcement) {
        $.each(announcement.products, function (productId, product) {
          const row = $('<tr>').append(
            $('<td>').addClass('py-2').text(announcement.created),
            $('<td>').addClass('py-2').text(product.name),
            $('<td>').addClass('py-2').text(product.quantity)
          );
          announcementsBody.append(row);
        });
      });

      $('#announcements-modal').removeClass('hidden').modal({ fadeDuration: 100 });
    },
    error: function (xhr, status, error) {
      console.error('Error fetching announcements:', error);
    }
  });
}

$(document).ready(function () {
  $('#announcements-link').on('click', function (event) {
    event.preventDefault();
    fetchAndDisplayAnnouncements();
  });

  $('#close-announcements').on('click', function () {
    $('#announcements-modal').addClass('hidden').modal('hide');
  });
});
