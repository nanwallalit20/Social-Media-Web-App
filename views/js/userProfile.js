$(document).ready(function() {
    $('#imageInput').on('change', function(event) {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
  
        reader.onload = function(e) {
          $('#imagePreview').attr('src', e.target.result);
          $('#imagePreviewBox').css('display', 'inline');
        };
  
        reader.readAsDataURL(event.target.files[0]);
      }
    });
  });
  
