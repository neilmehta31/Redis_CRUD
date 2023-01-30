const redis = require('redis');
const pg = require('../pg');
const mongo = require('../mg');
const keygen = require('../utility/keygen')
const { MONGO_PASSWORD, MONGO_IP, MONGO_PORT, MONGO_USER, REDIS_URL, REDIS_PORT } = require("./config/config");
const DEFAULT_EXPIRATION = 600;
let redisClient = redis.createClient({
    legacyMode: true,
    socket: {
        port: REDIS_PORT,
        host: REDIS_URL
    }
});

redisClient.connect().catch(console.error)

// client.open('redis://localhost:6379')
const router = require('express').Router();


router.route('/newUser').post(async (req, res, next) => {

    // POST into postgresql and mongodb
    try {
        const res_pg = await pg.postPg(req);
        const res_mg = await mongo.postMg(req);
        if (res_pg.status == 200 && res_mg.status == 200) {
            const keygen_user = keygen;

            // Added into redis cache 
            redisClient.setEx(keygen_user, DEFAULT_EXPIRATION, JSON.stringify(res_pg.body));

            return res.status(200).json({
                cache_id : keygen_user,
                name: req.body.name,
                email: req.body.email,
                message: "User added into Mongo and PG!! and cached"
            });
        } else if (res_pg.status == 200) {
            return res.status(200).json({
                cache_id : keygen_user,
                name: req.body.name,
                email: req.body.email,
                message: "UNABLE TO ADD USER INTO MONGO"
            });
        } else if (res_mg.status == 200) {
            return res.status(200).json({
                cache_id : keygen_user,
                name: req.body.name,
                email: req.body.email,
                message: "UNABLE TO ADD USER INTO POSTGRESQL"
            });
        } else {
            return res.status(500).json({
                ERROR: "UNABLE TO ADD USER; Please try again later!"
            })
        }
    } catch (err) {
        console.log(err);
        res.status = 500;
        res.body = { error: 'Error adding user to database :(' };
    } finally {
        return res;
    }
});


router.route('/getAllUsers').get(async (req, res, next) => {

    redisClient.get('allusers', (err, allusrs) => {
        if (err) console.error(err);
        if (allusrs != null) {
            return res.status(200).json({ message: "CACHE HIT", data: JSON.parse(allusrs) });
        }
    });

    const res_pg = await pg.getAllPg(req);
    if (res_pg.status == 200) {
        redisClient.setEx('allusers', DEFAULT_EXPIRATION, JSON.stringify(res_pg.body))
        return res.status(200).json({message: "CACHE MISS", cache_id: 'allusers', data : res_pg});
    }

});


router.route('/getUser:id').get(async (req, res, next) => {
    // console.log("get here! hello");

    let cache_id = req.params.id.slice(1,);
    redisClient.get(`${cache_id}`, (err, usr) => {
        if (err) console.error(err);
        if (usr != null) {
            return res.status(200).json({ message: "CACHE HIT", data: JSON.parse(usr) });
        }
    });

    // const userdetails = await userRepository.fetch(id);
    // // console.log(userdetails);
    // // console.log("get user details here!");
    // return res.status(200).json({ userdetails: userdetails });
    
    // !INFO use getIdPg and getIdMg in request body!!!! 
    
    const res_pg = await pg.getIdPg(req);
    const res_mg = await mongo.getIdMg(req);
        if (res_pg.status == 200 && res_mg.status == 200) {
            const keygen_user = keygen;

            // Added into redis cache 
            redisClient.setEx(keygen_user, DEFAULT_EXPIRATION, JSON.stringify(res_pg.body));

            return res.status(200).json({message: "CACHE MISS", cache_id: keygen_user, data : res_pg});
        } else {
            return res.status(500).json({
                ERROR: "UNABLE TO GET USER; Please try again later!"
            });
        }


});


router.route('/update:id').put(async (req, res, next) => {
    let cache_id = req.params.id.slice(1,);

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