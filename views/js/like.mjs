
export class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }


    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;

            // this is a new way of writing ajax which you might've studied, it looks like the same as promises
            $.ajax({
                type: 'POST',
                url: $(self).attr('href'),
            })
            .done(function(data) {
                let likesCount = parseInt($(self).attr('data-likes'));
                console.log(likesCount);
                if (data.data.deleted == true){
                    likesCount -= 1;
                    
                }else{
                    likesCount += 1;
                }


                $(self).attr('data-likes', likesCount);
                $(self).html(`<i class="fas fa-heart"></i> ${likesCount}`);
                new Noty({
                   
                    text: data.data.deleted? 'disliked !!!':'liked!!!',
                    theme: 'sunset', // Replace with your preferred Noty theme
                    type: 'success', // Replace with 'success', 'error', 'warning', or 'info' as needed
                    timeout: 3000, // Set the duration for the message display (in milliseconds)
                    layout: 'topCenter',
                    
                }).show();

            })
            .fail(function(errData) {
                console.log('error in completing the request');
            });
            

        });
    }
}
