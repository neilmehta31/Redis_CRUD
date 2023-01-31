const { Employee }= require('../models/employee');

const addUser = async (req) => {
    let res = {status : null, body : null};
    const emp = new Employee({
        name: req.body.name,
        email: req.body.email,
    });
    try{
        const data = await emp.save();
        res.status = 200;
        res.body = data;
    }
    catch(err){
        res.status = 500;
        res.body = { error: 'Error' };
        console.log(err);
    }
    finally{
        return res;
    }
};

module.exports=addUser;