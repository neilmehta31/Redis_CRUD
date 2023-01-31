const mongoose = require('mongoose');



// Employee Schema
const Employee = mongoose.model('employee', {
    name: {
        type: String,
        required:true
    }, 
    email: {
        type:String,
        required:true
    },
    /*salary: {
        type:String,
        required:true
    }*/
});



module.exports = {Employee}