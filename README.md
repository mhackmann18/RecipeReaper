# RecipeReaper

A web app for recipe scraping and management. 

## Setup

Clone this repository
```bash
git clone https://github.com/mhackmann18/RecipeReaper
```
cd into the project root directory
```bash
cd ./RecipeReaper
```
Create db_password.txt. This password will be used to make connections to the MySQL database
```bash
echo 'my-secure-db-password' >db_password.txt
```
Create jwt_secret.txt
```bash
echo 'my-32-character-ultra-secure-and-ultra-long-secret' >jwt_secret.txt
```
Build Docker images
```bash
docker compose build
```
Run the app
```bash
docker compose up -d
```
Open your browser and visit http://localhost:3000. The app should be up and running.
