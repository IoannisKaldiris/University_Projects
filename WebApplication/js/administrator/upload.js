$(document).ready(function() {
    // Open modal
    $("#open-modal-btn").click(function() {
      $("#upload-modal").modal();
    });

    // Close modal
    $(".modal-close-btn").click(function() {
      $.modal.close();
    });
  $("#upload-btn").on("click", function() {
    const fileInput = $("#file-input")[0];
    if (fileInput.files.length === 0) {
      generateAlert("Error", "Please select a file to upload.", "error");
      return;
    }

    const file = fileInput.files[0];
    if (file.type !== "application/json" && file.type !== "text/csv") {
      generateAlert("Error", "Please upload a JSON or CSV file.", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      const fileContent = e.target.result;
      let jsonData;

      if (file.type === "application/json") {
        try {
          jsonData = JSON.parse(fileContent);
        } catch (error) {
          generateAlert("Error", "Invalid JSON file.", "error");
          return;
        }
      } else if (file.type === "text/csv") {
        const lines = fileContent.split("\n");
        const headers = lines[0].split(",");
        jsonData = lines.slice(1).map(line => {
          const values = line.split(",");
          let obj = {};
          headers.forEach((header, index) => {
            obj[header.trim()] = values[index].trim();
          });
          return obj;
        });
      }

      $.ajax({
        url: '../../php/administrator/misc/upload.php',
        type: 'POST',
        data: JSON.stringify(jsonData),
        contentType: 'application/json',
        success: function(response) {
          const result = JSON.parse(response);
          if (result.message === 'success') {
            generateAlert("Success", "Products uploaded successfully.", "success");
          } else {
            generateAlert("Error", "Failed to upload products. Server response: " + result.message, "error");
          }
        },
        error: function(err) {
          console.error("Error uploading products", err);
          generateAlert("Error", "Failed to upload products. Server error: " + err.statusText, "error");
        }
      });
    };
    reader.readAsText(file);
  });
});
