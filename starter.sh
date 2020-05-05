#!/usr/bin/env bash

# Stage 1 : Build labely app
echo "INFO : Build labely app from docker image"
cd ./labely-frontend || exit
./deploy.sh

