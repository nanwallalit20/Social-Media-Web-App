const nodemailer=require('../config/nodemailer');
const forgot=require('../modals/forget-pass')
exports. newPassword= async function(token){
       let UserDetails= await forgot.findOne({token:token});
     
      UserDetails.populate('user').then(populatedUser=>{
        console.log('email is',populatedUser.user.email)
        nodemailer.transporter.sendMail({
            from:'lnanwal95@gmail.com',
            to:`${populatedUser.user.email}`,
            html:htmlString,
            subject:"Forgot-password"
        },function(err,info){
            if(err){
                console.log('error in sending mail',err);
                return;
            }
            console.log("message delivered ",info)
            return ;
        })
      }).catch(err=>{
        if(err){
            console.log('error in populating forgot user',err)
        }
      })
      
       
    let htmlString=nodemailer.renderTemplate({link:`localhost:7000/users/resetPassword/?accesstoken=${token}`},'./forgot-password/forgot_password.ejs')
    
}