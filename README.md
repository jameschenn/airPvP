# AirPvP
This is AirPvP, an [AirBnB](https://www.airbnb.com/) clone. </br></br>
In the gaming world, PvP stands for Player vs Player. AirPvP is the place to go for players to rent locations from various video game worlds to go and duke it out!!

# Live Site
[AirPvP](https://airpvp.herokuapp.com/)

# Index
| [Backend Routes](https://github.com/jameschenn/airPvP/wiki/Backend-Routes) | [Database Schema](https://github.com/jameschenn/airPvP/wiki/Database-Schema) | [Features](https://github.com/jameschenn/airPvP/wiki/Features) | [Frontend Routes](https://github.com/jameschenn/airPvP/wiki/Frontend-Routes) | 

# Technologies Used
<img src="https://camo.githubusercontent.com/442c452cb73752bb1914ce03fce2017056d651a2099696b8594ddf5ccc74825e/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f6a6176617363726970742f6a6176617363726970742d6f726967696e616c2e737667" height=40><img src="https://camo.githubusercontent.com/27d0b117da00485c56d69aef0fa310a3f8a07abecc8aa15fa38c8b78526c60ac/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f72656163742f72656163742d6f726967696e616c2e737667" height=40>
<img src="https://camo.githubusercontent.com/2b6b50702c658cdfcf440cef1eb88c7e0e5a16ce0eb6ab8bc933da7697c12213/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f72656475782f72656475782d6f726967696e616c2e737667" height=40>
<img src="https://camo.githubusercontent.com/900baefb89e187c8b32cdbb3b440d1502fe8f30a1a335cc5dc5868af0142f8b1/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f6e6f64656a732f6e6f64656a732d6f726967696e616c2e737667" height=40>
<img src="https://camo.githubusercontent.com/da7acacadecf91d6dc02efcd2be086bb6d78ddff19a1b7a0ab2755a6fda8b1e9/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f68746d6c352f68746d6c352d6f726967696e616c2e737667" height=40>
<img src="https://camo.githubusercontent.com/2e496d4bfc6f753ddca87b521ce95c88219f77800212ffa6d4401ad368c82170/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f637373332f637373332d6f726967696e616c2e737667" height=40>
<img src="https://camo.githubusercontent.com/d536b9cc0c533324368535ece721f5424f28eae3ec0e6f3847408948ecacfce6/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f706f737467726573716c2f706f737467726573716c2d6f726967696e616c2e737667" height=40>
<img src="https://camo.githubusercontent.com/a2ef2bb116ae565bb254cbb11194dae357eb7582a8babeab337bd3932687d63d/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f73657175656c697a652f73657175656c697a652d6f726967696e616c2e737667" height=40>
<img src="https://camo.githubusercontent.com/66a47251fab3236cff187214ff8215c1df71b46739b8b1803ac4cebdfe5c7918/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f657870726573732f657870726573732d6f726967696e616c2d776f72646d61726b2e737667" height=40>
<img src="https://camo.githubusercontent.com/dc9e7e657b4cd5ba7d819d1a9ce61434bd0ddbb94287d7476b186bd783b62279/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f6769742f6769742d6f726967696e616c2e737667" height=40>
<img src="https://camo.githubusercontent.com/39ddd51193b851f304bd6c335bc25a837ec7cafbbc4876fa78b994f5e95094ac/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f76697375616c73747564696f2f76697375616c73747564696f2d706c61696e2e737667" height=40>

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
