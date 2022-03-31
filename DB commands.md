CREATE USER airbnb_app WITH PASSWORD 'password' CREATEDB;

CREATE DATABASE airbnb_development WITH OWNER airbnb_app;

or

npx sequelize init
npx dotenv sequelize db:migrate
npx dotenv sequelize db:migrate:undo:all
npx dotenv sequelize db:seed:all
npx dotenv sequelize db:seed:undo:all

npx sequelize model:generate --name User --attributes username:string,email:string,hashedPassword:string
