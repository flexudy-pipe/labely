#!/usr/bin/env bash

# Stage 1 : Build docker image
image_name=labely-app
echo INFO : Step 1 --- building docker image...
echo name of docker image : [ $image_name ]

echo "Build docker image from Dockerfile"
docker build -t $image_name .

# Stage 2 : Start a container with name license-app-container
echo INFO : Step 2 --- Starting docker container...
container_name=$image_name-container
echo name of docker container : [ $container_name ]

# 1. Stop container if one is alive
echo INFO : stop a container with name [ $container_name ] if exists
docker container stop $container_name

# 2. remove stopped container
echo INFO : remove stopped container [ $container_name ]
docker rm "$container_name"

# 3. Start a new conatiner with specified name
echo INFO : Create new container with name [ $container_name ]
docker run --name $container_name -d -p 4500:80 $image_name

# 4. go to http://localhost:4500 to see the app
echo "INFO : show the url to see app on the browser"
echo Please go to http://localhost:4500/ to see the app on the browser
