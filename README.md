# AirPvP
This is AirPvP, an [AirBnB](https://www.airbnb.com/) clone. </br></br>
In the gaming world, PvP stands for Player vs Player. AirPvP is the place to go for players to rent locations from various video game worlds to go and duke it out!!

# Live Site
[AirPvP](https://airpvp.onrender.com/)

# Index
| [Backend Routes](https://github.com/jameschenn/airPvP/wiki/Backend-Routes) | [Database Schema](https://github.com/jameschenn/airPvP/wiki/Database-Schema) | [Features](https://github.com/jameschenn/airPvP/wiki/Features) | [Frontend Routes](https://github.com/jameschenn/airPvP/wiki/Frontend-Routes) | 

# Technologies Used
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)

# Getting Started
Clone the Repo

`https://github.com/jameschenn/airPvP.git`

Install dependencies for the root, backend, and frontend directories

`npm install`

Add an .env file containing the variables from the .env.example file

Create your POSTGRESQL user with CREATEDB and PASSWORD

`CREATE USER airbnb_app WITH PASSWORD 'password' CREATEDB;`

and database based on what you put in your .env file

`CREATE DATABASE airbnb_development WITH OWNER airbnb_app;`

Use the Sequelize CLI to apply the provided database migrations and seeder.

`npx dotenv sequelize db:migrate`

`npx dotenv sequelize db:seed:all`

You can now run the application by starting both the frontend and backend using

`npm start`

You can use the Demo user or create an account to being using AirPvP

# Features

## Spots

Users can view a feed of listings to choose from, or upload a listings of their own for other users to rent

![airpvpgithub1](https://user-images.githubusercontent.com/73676915/178092540-879ae40b-7225-4c0e-9396-9e37d968a804.PNG)

## Booking

In each spot's individual listing, users can use the date picker and book a location for a certain amount of days

![airpvpgithub2](https://user-images.githubusercontent.com/73676915/178092603-338c8638-c64d-4610-a347-81de05bc8d34.PNG)

## Reviews

Also in each spot's individual listing, users can leave a review about their stay 

![airpvpgithub3](https://user-images.githubusercontent.com/73676915/178092628-08aeccc1-cc6d-4f68-a3e3-f7895ee51b5d.PNG)

## Search

Users can search from the nav bar to filter out results based on the name of the location

![airpvpgithub4](https://user-images.githubusercontent.com/73676915/178092647-3165e6c7-b2ac-42cd-b4ea-08cea1522ad8.PNG)


