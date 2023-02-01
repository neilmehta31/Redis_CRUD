const { Employee }= require('../models/employee');


const getOneUser=async(req)=>{
    let res = {status : null, body : null};
    
    try{
    
    const data=await Employee.findOne({ employeeId: parseInt(req.params.id) });
    res.status=200;    
    res.body=data;    
    
}    
    catch(err)
      {
                res.status = 500;
                res.body = { error: 'Error' };
                console.log(err);
        
      }
     
      finally{
        return res;
     }
         
       
};

module.exports=getOneUser;
