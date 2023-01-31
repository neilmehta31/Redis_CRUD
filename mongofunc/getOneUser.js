const { Employee }= require('../models/employee');


const getOneUser=async(req)=>{
    let res = {status : null, body : null};
    Employee.findOne({ employeeId: parseInt(req.params.id) }, function(err, data) {
        if(!err) {
                 res.status=200;
                 res.body=data;
                 //res.send(data);
             } else {
                res.status = 500;
                res.body = { error: 'Error' };
                console.log(err);
        
             }
         });
       



return res;

};

module.exports=getOneUser;