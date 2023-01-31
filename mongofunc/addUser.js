const { Employee }= require('../models/employee');


const addUser = async (req) => {

    const emp = new Employee({
        name: req.body.name,
        email: req.body.email,
        //salary: req.body.salary
    });
    emp.save((err, data) => {
        if(!err) {
            // res.send(data);

            
            return res.status(200).json({ message: 'Employee Added Successfully', addEmployee: data})
        } else {

        res.status = 500;
        res.body = { error: 'Error' };
        console.log(err);
        }
    });

   return res;


};

module.exports=addUser;