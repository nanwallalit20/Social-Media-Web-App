const TaskList=require('../modals/To-do_list');


module.exports.home= function(req,res){
    console.log(req.cookies);
    res.cookie('field','blah');
    TaskList.find({})
    .then(Tasks => {
        return res.render('homePage',{
            title:"To-Do List App",
            Task_list:Tasks
        })

    })
    .catch(err => {
        console.log("error in fetching contact", err);
        res.status(500).send("Internal Server Error");
      });

}
