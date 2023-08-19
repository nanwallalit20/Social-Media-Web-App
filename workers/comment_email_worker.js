const queue=require('../config/kue');
const commentsMailer=require('../Mailers/newComment_mailer');


queue.process("emails",function(job,done){
    console.log("job data is,",job.data);
    commentsMailer.newComment(job.data);

    done();
})