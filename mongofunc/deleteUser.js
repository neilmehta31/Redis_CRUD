const { Employee }= require('../models/employee');


const deleteUser=async(req)=>{
    let res = {status : null, body : null};
    Employee.findOneAndRemove({ employeeId: parseInt(req.params.id) }, function(err, data) {
        if(!err) {
            // res.send(data);
            res.status = 200;
            res.body = {message: 'Employee deleted', deleteEmployee: data}
        } else {
            res.status = 500;
            res.body = { error: 'Error' };
            console.log(err);
        }
    });



return res;



};


module.exports=deleteUser;