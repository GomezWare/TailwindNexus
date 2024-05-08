#!/bin/bash
echo "Choose MySQL root password: "
read -s pass1


echo "Enter the password again: "
read -s pass2

if [ "$pass1" == "$pass2" ]; then
docker run --name tnexus-mysql -e MYSQL_ROOT_PASSWORD=password -v ./init.sql:/docker-entrypoint-initdb.d/init.sql -d mysql
else
    echo "Passwords do not match. Please try again."
    exit 1
fi

