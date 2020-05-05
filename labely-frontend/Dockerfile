### STAGE 1: Build ###
# base image to build a app
FROM node:latest AS builder

# set working directory
WORKDIR /app

# Copy all projects file
COPY . ./

# Install all dependecies with npm
RUN npm install

# add `/app/node_modules/.bin` to $PATH
ENV PATH="./node_modules/.bin:$PATH"

# Build app with ng cli
RUN ng build --prod

### STAGE 2: Run ###
# Run in nginx server
FROM nginx:alpine

VOLUME /var/cache/nginx

# copy build output in nginx directory
COPY --from=builder /app/dist/labely  /usr/share/nginx/html
