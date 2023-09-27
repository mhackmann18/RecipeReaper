# RecipeReaper

A web app for recipe scraping and management - <a href="https://www.markdownguide.org" target="_blank">recipereaper.com</a>

## Setup and Run in Dev Environment

Make sure that you have Docker Desktop installed and that ports 3000, 8080, 8000, and 3306 are not in use on your local machine.

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
Build Docker images and run app containers
```bash
docker compose -f compose.dev.yaml up -d
```
Open your browser and visit http://localhost:3000 to view the app. The /site/src, /api/app, and /scraper directories are mounted into the containers. Changes in these directories will be reflected in the running app without having to rebuild the Docker images. 
