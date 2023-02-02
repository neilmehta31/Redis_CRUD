# Redis_CRUD
Simple application with redis as in-memory database and made using nodejs/expressjs.
Used the nodejs image from the docker for making my own docker container. Dockerfile is included in the repo.
Used redis-stack-server:latest image from docker hub to include the redisJSON and redisSearch as well to make life easier with json !!
Unable to expose the redis db port to my server while in the docker container. However the port is exposed if I run the server on my localhost (outside docker)

# Description
This is a Node.js server code that implements a REST API to interact with a PostgreSQL and MongoDB database. The code uses an express router to define several endpoints for handling user operations, such as adding a new user, retrieving all users, and retrieving a user by ID.

The code uses Redis as a caching layer to store the data. Whenever a new user is added, the data is stored in Redis with a specified expiration time. When retrieving all users, Redis is not used due to the changing nature of the data.

The code also uses several other modules to perform specific tasks, such as keygen for generating keys and redis for connecting to the Redis database. All the required environment variables are stored in a configs file.

In case of any errors or exceptions, the code returns an appropriate HTTP status code and an error message to the client.

The code contains the following API endpoints:

`/newUser` - This endpoint is used to add a new user to the system. It posts the data to both MongoDB and PostgreSQL, and the response is stored in Redis cache.

`/getAllUsers` - This endpoint is used to retrieve all users from the system. It fetches the data from PostgreSQL and returns the response.

`/getUser:id` - This endpoint is used to retrieve a specific user based on the provided ID. It checks for the data in the Redis cache, and if not found, it fetches the data from PostgreSQL and stores it in the cache.

`/updateUser` - This endpoint is used to update a user in the system. It updates the user information in both MongoDB and PostgreSQL.

`/deleteUser` - This endpoint is used to delete a user from the system. It deletes the user information from both MongoDB and PostgreSQL.





The application is further dockerised with the `redis/redis-stack-server` and `postgresql server` from the dockerhub, and our own docker file which builds the express server and communicates with the other two through the docker internal network. The application image is created from the given Dockerfile. Requests and response can be generated from the ports mentioned in the `docker-compose` from the host docker user.
The application listens on port `5000`.


