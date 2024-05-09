#!/bin/bash
# echo "Choose MySQL root password: "
# read -s pass1


# echo "Enter the password again: "
# read -s pass2

# if [ "$pass1" == "$pass2" ]; then
docker run --name tnexus-mysql \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_AUTHENTICATION_PLUGIN=mysql_native_password \
  -p 3306:3306 \
  -v ./scripts:/docker-entrypoint-initdb.d \
  -d mysql

# else
#   echo "Passwords do not match. Please try again."
#   exit 1
# fi

