const { Employee }= require('../models/employee');


const deleteUser=async(req)=>{
    let res = {status : null, body : null};

    try{
    const data=await Employee.findOneAndRemove({ employeeId: parseInt(req.params.id) });
    res.status=200;
    res.body=data;    

    }  
           
    catch {
            res.status = 500;
            res.body = { error: 'Error' };
            console.log(err);
        }
    


finally{
return res;
}


};


module.exports=deleteUser;
