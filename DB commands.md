CREATE USER airbnb_app WITH PASSWORD 'password' CREATEDB;

CREATE DATABASE airbnb_development WITH OWNER airbnb_app;

or

npx sequelize init
npx dotenv sequelize db:migrate
npx dotenv sequelize db:migrate:undo:all
npx dotenv sequelize db:seed:all
npx dotenv sequelize db:seed:undo:all

npx sequelize model:generate --name User --attributes username:string,email:string,hashedPassword:string

npx sequelize seed:generate --name demo-user


npx sequelize model:generate --name Spot --attributes userId:integer,address:string,city:string,state:string,country:string,series:string,description:string,name:string,price:decimal

npx sequelize seed:generate --name spots

npx sequelize model:generate --name Image --attributes spotId:integer,url:string

npx sequelize seed:generate --name images

npx sequelize model:generate --name Review --attributes userId:integer,spotId:integer,review:string,rating:integer

npx sequelize seed:generate --name reviews
