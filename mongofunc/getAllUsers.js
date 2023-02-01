const { Employee }= require('../models/employee');


const getAllUsers=async(req)=>{
let res = {status : null, body : null};
/*Employee.find({}, (err, data) => {
    if(!err) {
       // res.send(data);
        res.status = 200;
        res.body = data;
    } else {
        res.status = 500;
        res.body = { error: 'Error' };
        console.log(err);
    }
});
return res;
*/
    
    try {
    const data=await Employee.find({});
    //Employee.find({}, (err, data) =>{ 
    res.status = 200;
    res.body = data;
}

    catch (err) {
    console.error(err);
    res.status = 500;
    res.body = { error: 'Error fetching users' };
} finally {
    return res;
}


};

module.exports=getAllUsers;
