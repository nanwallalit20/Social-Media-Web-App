
//    export function createCommment(postId){
//         console.log(postId);
//         let commentForm=$(`#post-comment-${postId}`);
       
//         console.log(commentForm)
//         commentForm.submit(function(e){
//             e.preventDefault();
//             $.ajax({
//                 type:'post',
//                 url:'/comment/create',
//                 data:commentForm.serialize(),
//                 success:function(data){
//                      console.log('data is:', data)
//                     $.ajax({
//                         type:'get',
//                         url:`/users/userDetail/${data.data.comment.user}`,
//                         data:commentForm.serialize(),
//                         success:function(user){
                            
//                             let newCommentElement = newCommentDom(data.data.comment,user.data.user) 
//                             $('.post-comments-list>ul').prepend(newCommentElement );
                            
//                             // displayFlashMessage(data.message);
//                                deleteComment($(' .delete-comment-button', newCommentElement))
//                         },
//                         error:function(err){
//                             console.log(err.responseText);
//                         }
//                     })
//                 },
//                 error:function(err){
//                     console.log(err.responseText);
//                 }
//             })
//         })
//     }

//     let newCommentDom=function(comment,user){
//         return $(`<li id="comment-${comment._id}>
       
//            <small>
//            <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
//             </small>
        
//                ${comment.content}
//                 <br>
//             <small>
//                ${user.name}
//             </small>
//    </li>`)
//     }

//     let deleteComment=function (deleteLink){
       
//       let newDeleteLink=deleteLink;
//         console.log("link",newDeleteLink);
//         $(newDeleteLink).click(function(e){
           
//             e.preventDefault();
//             $.ajax({
//                 type:'get',
//                 url:$(newDeleteLink).prop('href'),
//                 success:function(data){
                    
//                     $(`#comment-${data.data.comment_id}`).remove();
//                     // displayFlashMessage(data.message);
//                 },
//                 error: function (error) {
//                     console.log(error.responseText);
//                 }

//             })
//         })
//     }



 

 // Let's implement this via classes

// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX
import { ToggleLike } from "./like.mjs";
export class PostComments{
    // constructor is used to initialize the instance of the class whenever a new instance is created
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        let self = this;
        // call for all the existing comments
        $(' .delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }


    createComment(postId){
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'post',
                url: '/comment/create',
                data: $(self).serialize(),
                success: function(data){
                    console.log(data);
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-list>ul`).prepend(newComment);
                    pSelf.deleteComment($(' .delete-comment-button', newComment));
                    new ToggleLike($(' .toggle-like-button',newComment)) 

                    new Noty({
                        text: 'comment Created!!!',
                        theme: 'sunset', // Replace with your preferred Noty theme
                        type: 'success', // Replace with 'success', 'error', 'warning', or 'info' as needed
                        timeout: 3000, // Set the duration for the message display (in milliseconds)
                        layout: 'topCenter',
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });


        });
    }


    newCommentDom(comment){
        // I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
        return $(`<li id="comment-${ comment._id }">
                        <p>
                            
                            <small>
                                <a class="delete-comment-button" href="/comment/destroy/${comment._id}">X</a>
                            </small>
                            
                            ${comment.content}
                            <br>
                            <small>
                                ${comment.user.name}
                            </small>
                            <small>
                            <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&amp;type=Post"> Likes-0 </a>
                             </small>
                        </p>    

                </li>`);
    }


    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        text: "comment Deleteted!!!!",
                        theme: 'sunset', // Replace with your preferred Noty theme
                        type: 'success', // Replace with 'success', 'error', 'warning', or 'info' as needed
                        timeout: 3000, // Set the duration for the message display (in milliseconds)
                        layout: 'topCenter',
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }
}