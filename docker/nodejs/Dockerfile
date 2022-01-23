#Dockerfile
FROM node:latest

# Fix debconf warnings upon build
ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update;
RUN apt-get install nodejs -y;
RUN apt-get install npm -y;

# Copy "package.json" and "package-lock.json" before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
# notes to copy

# Expose the listening port
EXPOSE 4000

CMD ["npm", "run", "dev"]

# pm2 start "npm run start"
#end of Dockerfile
