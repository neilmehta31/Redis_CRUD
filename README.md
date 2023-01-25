# Redis_CRUD
Simple application with redis as in-memory database and made using nodejs/expressjs.
Used the nodejs image from the docker for making my own docker container. Dockerfile is included in the repo.
Used redis-stack-server:latest image from docker hub to include the redisJSON and redisSearch as well to make life easier with json !!
Unable to expose the redis db port to my server while in the docker container. However the port is exposed if I run the server on my localhost (outside docker)

# Description
This is a Node.js application with Express Router. The router handles various routes for creating, reading, updating, and deleting a user. The router uses the Redis-OM library to interact with a Redis database. It also uses the Axios library to handle HTTP requests and the express module to handle routing.
It uses a userSchema model inside `/models/userSchema.js` to create and interact with the user data.
It creates an instance of the Redis client, opens it, and uses it to fetch the userRepository.

It has four routes:
`/newUser` is a post route that creates a new user and saves it to the Redis database.
`/getUser:id` is a get route that retrieves a user by its id from the Redis database.
`/update:id` is a put route that updates a user by its id in the Redis database.
`/deleteUser:id` is a delete route that deletes a user by its id from the Redis database.
It exports the router so it can be used in other parts of the application.

The application is further dockerised with the redis server form the dockerhub. The application image is created from the given Dockerfile. The redis server exposes the port `6397` and my application exposes port `5000` to the host. Requests and response can be generated from the above mentioned ports from the host docker user.



