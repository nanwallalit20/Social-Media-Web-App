$(document).ready(function() {
    $('#imageInput').on('change', function(event) {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
  
        reader.onload = function(e) {
          $('#imagePreview').attr('src', e.target.result);
          $('#imagePreviewBox').css('display', 'block');
        };
  
        reader.readAsDataURL(event.target.files[0]);
      }
    });
  });


  $(document).ready(function () {
    $("#toggleButton").click(function (event) {
        event.preventDefault();
        $("#popup-update").slideToggle(300);
     });
  });


export class ToggleFriendship{

    constructor(toggleElement){
      this.toggler = toggleElement;
      this.toggleFriend();
  }
  toggleFriend(){
    $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;

            // this is a new way of writing ajax which you might've studied, it looks like the same as promises
            $.ajax({
                type: 'POST',
                url: $(self).attr('href'),
            })
            .done(function(data) {
                
                if (data.data.friends == true){
                  $(self).html(`Remove Friend`);
                    
                }else{
                  $(self).html(`Add Friend`);
                }
            })
            .fail(function(errData) {
                console.log('error in completing the request');
            });
            

        });
    }
}
  

  
