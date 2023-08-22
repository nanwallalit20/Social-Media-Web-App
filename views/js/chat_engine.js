class ChatEngine{
    constructor(chatboxId,userEmail){
        console.log(chatboxId,"  " ,userEmail)
        this.chatBox=$(`#${chatboxId}`);
        this.userEmail=userEmail

        this.socket=io.connect('http://localhost:3000')
        if(this.userEmail){
            this.connectionHandler();
        }
    }
    connectionHandler(){
        let self=this;
        this.socket.on('connect',function(e){
            if(e){
                console.log('error in connecttin',e);
            }
            console.log('connection esablished using socket')
            self.socket.emit('join_room',{
                user_email:self.userEmail,
                chatroom:'friends'
            })
            self.socket.on('user_joined',function(data){
                console.log('a user joined',data);
            })
        })

        $('.send-button').click(function(){
            let msg =$('.input-field').val();

            if(msg !=''){
                self.socket.emit('send_message',{
                    message:msg,
                    user_email:self.userEmail,
                    chatroom:'friends'
                })
            }
        })
        self.socket.on('receive_message',function(data){
            console.log('message received',data.message);

            let newMessage=$('<li>');
            let messageType='other-message';
            if(data.user_email== self.userEmail){
                messageType='self-message'
            }
            newMessage.append($('<span>',{
                'html':data.message
            }))
            newMessage.addClass(messageType);
            $('#chat-message-list').append(newMessage);

        })
    }
}
