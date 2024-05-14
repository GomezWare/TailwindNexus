# Tailwind Nexus

## About Tailwind Nexus

### What is tailwind nexus?
Tailwind Nexus aims to be a platform to upload [Tailwind](https://tailwindcss.com/) components along with their functionality.

Due to its nature it can be deployed locally, providing a secure space where your company, yourself or your friends can upload components. ﬁ

### Why does Tailwind Nexus exist?

Tailwind nexus is a final degree project which is under development, the objective was to demonstrate that you can create a platform without 
relying on PHP with the BFF (BackendForFrontend) pattern and with the help of the Astro framework [Astro](https://astro.new/latest)

## Installation

### Prerequisites
**Easy install**
The easy way
- Have [Docker](https://www.docker.com/get-started/) installed and configured.

**No Docker**
If you don`t want to use Docker
- Have [NodeJS](https://www.docker.com/get-started/) installed.
- Have [NPM](https://www.docker.com/get-started/) installed.
- A Database server runing [MySQL](https://dev.mysql.com/downloads/mysql/), [MariaDB](https://mariadb.org/) or [PHPMyAdmin](https://www.phpmyadmin.net/).

### Easy Installation
1. Clone the repository:
   ``` git clone GomezWare/TailwindNexus ```
   
2. Enter the docker folder
   ``` cd ./TailwindNexus/docker ```
   
3. Run the Scripts
   ``` bash createMySqlContainer.sh ```
   You will promted to enter the root password

   ``` createAppContainer.sh ```
   
4. Enter the website using navigator
   [localhost:4321](localhost:4321)

### No Docker Installation

1. Setting up your database server
   You will need a database, a user and an open port to be able to connect to the application-
   The model and Test data SQL files are in ``` docker/scripts ``` 

3. Installing dependencies with npm
   Go to the folder root:
   ``` cd ./TailwindNexus ```
   And run a npm i
   ``` npm install ```

4. Editing the .env
   Open ```.env``` file in the project and change the database options according to your server configuration.

5. Run the project
   Use ``` npm run dev ``` in the root directory

6. Enter the website using navigator
   [localhost:4321](localhost:4321)
