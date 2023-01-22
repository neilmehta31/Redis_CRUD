const { Client } = require('redis-om');
const client = new Client()
client.open('db://localhost:6379')

const router = require('express').Router();
const axios = require('axios');

const userSchema = require('../models/userSchema');

const userRepository = client.fetchRepository(userSchema)


router.route('/newUser').post(async (req, res, next) => {

    // const aString = await client.execute(['PING'])
    // console.log(aString);
    // return res.status(200).json({aString:aString})
    let { uname, message } = req.body;
    // console.log(uname, message);
    const user = await userRepository.createEntity({
        uname: uname,
        message: message
    })

    const id = await userRepository.save(user)
    console.log(id);
    return res.status(200).json({
        entityId: id,
        data: user
    })
});


// router.route('/getAllUsers').get(async (req, res, next) => {

//     // client.execute('JSON.GET', ['*'], (err, response) => {
//     //     if (err) throw err;
//     //     console.log(response);
//     // });
//     client.execute('keys *', (err,keys)=>{
//         if (err) return console.log(err);

//         for(var i = 0, len = keys.length; i < len; i++) {
//             console.log(keys[i]);
//         }

//     })
//     // const allUsers = await userRepository.search().all()
//     // console.log("2");
//     // console.log(allUsers);
//     // res.send(allUsers)



//     // const allusers = await userRepository.search().all();
//     // console.log(allusers);
//     // return res.status(200).json({ data: allusers });
// });


router.route('/getUser:id').get(async (req, res, next) => {
    // console.log("get here! hello");
    let id = req.params.id.slice(1,);
    const userdetails = await userRepository.fetch(id);
    // console.log(userdetails);
    // console.log("get user details here!");
    return res.status(200).json({ userdetails: userdetails });
});


router.route('/update:id').post(async (req, res, next) => {
    let id = req.params.id.slice(1,);
    const user = await userRepository.fetch(id)
    let { uname, message } = req.body;

    user.uname = uname ?? null
    user.message = message ?? null

    const entid = await userRepository.save(user)
    if (entid == id) {
        console.log("both the id after updation is same!!");
    }
    console.log(entid);
    return res.status(200).json({
        entityId: entid,
        updated_data: user
    })
});


router.route('/deleteUser:id').delete(async (req, res, next) => {
    let id = req.params.id.slice(1,);

    const entid = await userRepository.remove(id)
    // res.send({ entityId: req.params.id })
    return res.status(200).json({ entityId: entid, status: "DELETED" })
});



module.exports = router;