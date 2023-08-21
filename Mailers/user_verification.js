const nodemailer=require('../config/nodemailer');
const verification=require('../modals/forget-pass')
exports.verification=(token)=>{
    let userData=verification.findOne({token :token});
    userData.populate('user').then(data=>{
        nodemailer.transporter.sendMail({
            from:'lnanwal95@gmail.com',
            to:`${data.user.email}`,
            html:htmlString,
            subject:"Verify your Email Adress"
        },function(err,info){
            if(err){
                console.log('error in sending mail',err);
                return;
            }
            console.log("message delivered ",info)
            return ;
        })
      })
      .catch(err=>{
            if(err){
                console.log('error in populating forgot user',err)
            }
            })

        let htmlString=nodemailer.renderTemplate({link:`localhost:7000/users/verify_user/?accesstoken=${token}`},'./verifyUser/verifyUser.ejs')          
}

