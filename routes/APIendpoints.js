const redis = require('redis');
const keygen = require('../utility/keygen')

// PostGreSQL functions
const PGgetUser = require('../postgres/queries/getUser');
const PGgetAllUsers = require('../postgres/queries/getAllUsers');
const PGaddUser = require('../postgres/queries/addUser');
const PGupdateUser = require('../postgres/queries/updateUser');
const PGdeleteUser = require('../postgres/queries/deleteUser');


// MongoDB function
const MGgetOneUser = require('../mongofunc/getOneUser');
const MGgetAllUsers = require('../mongofunc/getAllUsers'); // Using the postgresql function for it due to mongo being on the cloud
const MGaddUser = require('../mongofunc/addUser');
const MGUpdateUser = require('../mongofunc/UpdateUser');
const MGdeleteUser = require('../mongofunc/deleteUser');


const { MONGO_PASSWORD, MONGO_IP, MONGO_PORT, MONGO_USER, REDIS_URL, REDIS_PORT } = require('../configs');
const DEFAULT_EXPIRATION = 600;
let redisClient = redis.createClient({
    socket: {
        port: REDIS_PORT,
        host: 'redis'
    }
});

redisClient.connect().then(console.log("redis connected")).catch(console.error);

const router = require('express').Router();


router.route('/newUser').post(async (req, res, next) => {

    // POST into postgresql and mongodb
    try {
        const res_pg = await PGaddUser(req);
        const res_mg = await MGaddUser(req);
        console.log(res_mg,"\n",res_pg);
        if (res_pg.status == 200 && res_mg.status == 200) {
            const keygen_user = keygen();

            // Added into redis cache 
            redisClient.setEx(keygen_user, DEFAULT_EXPIRATION, JSON.stringify(res_pg.body));

            return res.status(200).json({
                cache_id : keygen_user,
                name: req.body.name,
                email: req.body.email,
                message: "User added into Mongo and PG!! and cached"
            });
        } else if (res_pg.status == 200) {
            const keygen_user = keygen();

            return res.status(200).json({
                cache_id : keygen_user,
                name: req.body.name,
                email: req.body.email,
                message: "UNABLE TO ADD USER INTO MONGO"
            });
        } else if (res_mg.status == 200) {
            const keygen_user = keygen();
            
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

    const res_pg = await PGgetAllUsers(req);
    console.log(res_pg,"\n");

    if (res_pg.status == 200) {
        redisClient.setEx('allusers', DEFAULT_EXPIRATION, JSON.stringify(res_pg.body))
        return res.status(200).json({message: "CACHE MISS", cache_id: 'allusers', data : res_pg});
    } else {
        return res.status(404).json({message: "ERROR", cache_id: 'allusers'});
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
    
    // !INFO use IdPg and IdMg in request body!!!! 
    const res_pg = await PGgetUser(req);
    const res_mg = await MGgetOneUser(req);
    console.log(res_mg,"\n",res_pg);

        if (res_pg.status == 200 && res_mg.status == 200) {
            const keygen_user = keygen();

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
    if (req.body.IdPg ==null || req.body.IdMg ==null) {
        console.error("Error due to no mongoId or PostgreSQLId");
        return res.status(400).json({error:"Error due to no mongoId or PostgreSQLId"})
    }
    const res_pg = await PGupdateUser(req);
    const res_mg = await MGUpdateUser(req);
    console.log(res_mg,"\n",res_pg);

    if (res_pg.status == 200 && res_mg.status == 200) {
        const keygen_user = cache_id;
        // Remove the previous cached values from the redis cache
        redisClient.del(keygen_user); 
        // Added into redis cache 
        redisClient.setEx(keygen_user, DEFAULT_EXPIRATION, JSON.stringify(res_pg.body));

        return res.status(200).json({
            cache_id : keygen_user,
            name: req.body.name,
            email: req.body.email,
            message: "User updated into Mongo and PG!! and cached"
        });
    } else {
        return res.status(500).json({
            ERROR: "UNABLE TO UPDATE USER; Please try again later!"
        })
    }
});


router.route('/deleteUser:id').delete(async (req, res, next) => {
    let cache_id = req.params.id.slice(1,);

    redisClient.del(cache_id);
    const res_pg = await PGdeleteUser(req);
    const res_mg = await MGdeleteUser(req);
    console.log(res_mg,"\n",res_pg);

    if (res_pg.status == 200 && res_mg.status == 200) {

        return res.status(200).json({
            message: "User Deleted from Mongo and PG!! and redis"
        });
    } else {
        return res.status(500).json({
            ERROR: "UNABLE TO DELETE USER; Please try again later!"
        })
    }
});



module.exports = router;