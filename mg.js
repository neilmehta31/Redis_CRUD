const getAllMg = async (req) => { 
    let res;
    Employee.find({}, (err, data) => {
        if(!err) {
            //res.send(data);
            res.body = data
        } else {
            console.log(err);
            res.body= { error: 'Error' };
        }
    });
    return res;
};

const getIdMg = async (req) => {
    let res;
    Employee.findById(req.params.id, (err, data) => {
        if(!err) {
            //res.send(data);
            res.body=data;
        } else {
            res.body= { error: 'Error' };
           console.log(err);
        }
    });

  return res;


};

const postMg = async (req) => {
    let res;
    const emp = new Employee({
        name: req.body.name,
        email: req.body.email,
        //salary: req.body.salary
    });
    emp.save((err, data) => {
        if(!err) {
            // res.send(data);
            res.body=data;
            res.status(200).json({code: 200, message: 'Employee Added Successfully', addEmployee: data})
        } else {
           res.body= { error: 'Error' };
           console.log(err);
        }
    });

    return res;
};

const deleteMg = async (req) => {
    let res;
    Employee.findByIdAndRemove(req.params.id, (err, data) => {
        if(!err) {
            res.body=send(data);
            res.status(200).json({code: 200, message: 'Employee deleted', deleteEmployee: data})
        } else {
            console.log(err);
            res.body= { error: 'Error' };
            
        }
    });
 return res;

};

module.exports = {getAllMg, getIdMg, postMg, deleteMg};

