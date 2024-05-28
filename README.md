# 2esystem - Simple CRUD aviation system
This is a responsive CRUD web application for managing airports using Vue.JS, Boostrap, PostgreSQL, Axios and Express.JS

View the deployed version on Render: https://twoesystem-fe.onrender.com

## Project setup
#### Install dependencies
```
npm install
```
#### Required tables
```
CREATE TABLE countries_table (name text, country_code text);
CREATE TABLE airlines_table (id serial NOT NULL PRIMARY KEY,name text NOT NULL, country json NOT NULL);
CREATE TABLE airports_table (id serial NOT NULL PRIMARY KEY,name text NOT NULL, country json NOT NULL, location json NOT NULL, airlines json);
```
#### Static data
```
INSERT INTO countries_table (name, country_code) VALUES ('United States', 'US/USA'),('China', 'CN/CHN'),('Japan', 'JP/JPN'),('Germany', 'DE/DEU'),('Brazil', 'BR/BRA'),('France', 'FR/FRA'),('Italy', 'IT/ITA'),('Russia', 'RU/RUS'),('United Kingdom', 'GB/GBR'),('Australia', 'AU/AUS');
```
#### .ENV file format
```
VUE_APP_GOOGLE_API = yourApiKey
VUE_APP_DATABASE_URL = yourPostgresqlDatabase
```

## Compiles and hot-reloads for Frontend development
```
npm run serve
```

## Compiles for Backend development
```
npm run dev
```
