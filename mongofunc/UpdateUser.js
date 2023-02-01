const { Employee }= require('../models/employee');


const UpdateUser=async(req)=>{

    let res = {status : null, body : null};
    const emp = {
        name: req.body.name,
        email: req.body.email,
       
       // salary: req.body.salary
    };
    try{
    const data=await Employee.findOneAndUpdate({ employeeId: parseInt(req.params.id) }, { $set: emp }, { new: true });
    res.status=200;    
    res.body=data;
    
    }    //Employee.findOne({ employeeId: parseInt(req.params.id) }, function(err, data) {  
    catch(err) {
                res.status = 500;
                res.body = { error: 'Error' };
                console.log(err);
        
         //   res.status(200).json({code: 200, message: 'Employee Updated Successfully', updateEmployee: data})
        }
        finally{
            return res;
        }
    
};

module.exports=UpdateUser;
