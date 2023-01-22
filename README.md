# Redis_CRUD
Simple application with redis as in-memory database and made using nodejs/expressjs.
Used the nodejs image from the docker for making my own docker container. Dockerfile is included in the repo.
Used redis-stack-server:latest image from docker hub to include the redisJSON and redisSearch as well to make life easier with json !!
Unable to expose the redis db port to my server while in the docker container. However the port is exposed if I run the server on my localhost (outside docker)
