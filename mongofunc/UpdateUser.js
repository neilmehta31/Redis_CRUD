const { Employee }= require('../models/employee');


const UpdateUser=async(req)=>{

    let res = {status : null, body : null};
    const emp = {
        name: req.body.name,
        email: req.body.email,
       
       // salary: req.body.salary
    };
    Employee.findOneAndUpdate({ employeeId: parseInt(req.params.id) }, { $set: emp }, { new: true }, (err, data) => {
        //Employee.findOne({ employeeId: parseInt(req.params.id) }, function(err, data) {  
    if(!err) {
            res.status(200).json({code: 200, message: 'Employee Updated Successfully', updateEmployee: data})
        } else {
            res.status = 500;
        res.body = { error: 'Error' };
        }
    });

return res;


};

module.exports=UpdateUser;