import { PostComments } from "./comment.mjs";
    let createPost=function(){
        let newPostFeed=$('#new-post-feed');
       
        newPostFeed.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/post/create',
                data:newPostFeed.serialize(),
                success:function(data){
                    // console.log('data is:', data)
                    $.ajax({
                        type:'get',
                        url:`/users/userDetail/${data.data.post.user}`,
                        success:function(user){
                            
                            let newPost= newPostDOM(data.data.post,user.data.user) 
                            $('#post-list-container>ul').prepend(newPost);
                            displayFlashMessage(data.message);
                            new PostComments(data.data.post._id);
                                let link=$(' .delete-post-button',newPost)
                             deletePost(link)
                        },
                        error:function(err){
                            console.log(err.responseText);
                        }
                    })
                  
                   

                },
                error:function(err){
                    console.log(err.responseText);
                }
            })
        })
    }
    let newPostDOM=function(post,user){
        
       
        return $(`<li class="list" id="post-${post._id}" >
        <div id="container">
           
           <small>
              <a class="delete-post-button"  href="/post/destroy/${post._id}">X</a>
           </small>
       
           <p>${user.name}</p>
           <p>${post.post}</p>
        </div>
        <div>
           <div>
              <form action="/comment/create" method="post">
              <textarea name="comment" id="comment"  placeholder="write comments"> </textarea>
              <input type="hidden" name="post" value="${post._id}">
              <button type="submit" value="submit"> Comment</button>
              </form>
           <div>
         <div id='post-comment-container'>
            <ul id='post-comments-${post.id}'>
            
            </ul>
          </div
        </div>
        
     </li>`)
    }

    //function for deleting post using dom 
    


    let deletePost=function(deleteLInk){
         console.log(deleteLInk);
        
        $(deleteLInk).click(function(e){
           
            e.preventDefault();
            $.ajax({
                type:'get',
                url:$(deleteLInk).prop('href'),
                success:function(data){
                    console.log(data);
                    
                    $(`#post-${data.data.post_id}`).remove();
                    //displayFlashMessage(data.message);
                },
                error: function (error) {
                    console.log(error.responseText);
                }

            })
        })
    }


  
    createPost();

let posts=$('.delete-post-button');
for(let post of posts){
  let newLink=$(' .delete-post-button',post)
  deletePost(newLink.prevObject);
  let postId = newLink.prevObject.prop('id')

  new PostComments(postId);
}
function displayFlashMessage(message) {
    new Noty({
      text: message,
      theme: 'sunset', // Replace with your preferred Noty theme
      type: 'success', // Replace with 'success', 'error', 'warning', or 'info' as needed
      timeout: 3000, // Set the duration for the message display (in milliseconds)
      layout: 'topCenter', 
    }).show();
  }





  
