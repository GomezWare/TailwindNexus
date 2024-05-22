#!/bin/bash
 echo "Do you set .env variables first? [y/n]: "
 read -s confirmation

 if [ $confirmation == 'y' || $confirmation == 'Y']; then
docker run --name tnexus-app \
  -p 4321:4321 \
  -v ./..:/usr/src/app \
  -d node:22 

 else
   echo "Passwords do not match. Please try again."
   exit 1
 fi