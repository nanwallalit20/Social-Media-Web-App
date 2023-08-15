const nodemailer=require('../config/nodemailer');

//this is the another way of exporting a method
exports.newComment=(comment)=>{
    console.log('inside new comment mailer',comment);
    let htmlString=nodemailer.renderTemplate({comment:comment},'./comments/comment_template.ejs')
    nodemailer.transporter.sendMail({
        from:'lnanwal95@gmail.com',
        to:comment.user.email,
        html:htmlString,
        subject:"New Comment"
    },function(err,info){
        if(err){
            console.log('error in sending mail',err);
            return;
        }
        console.log("message delivered ",info)
        return ;
    })
}