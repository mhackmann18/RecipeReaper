# Recipe Scraper

A simple web application for scraping recipe data from websites. 

## Usage

If you followed the setup instructions below, the application will be running on port 8000 on your local network. Make get requests to http://localhost:8000/recipe-data?url=recipe-url

The response will be a JSON object with data relevant to the given recipe-url.

## Setup

Clone this repository
```bash
git clone https://github.com/mhackmann18/recipe-scraper
```
cd into the project root directory
```bash
cd ./recipe-scraper
```

### With Docker

Install Docker: https://docs.docker.com/get-docker/

Build the Docker image
```bash
docker build --tag recipe-scraper .
```
Run the image as a container mapped to port 8000 on your local network
```bash
docker run -dp 8000:5000 recipe-scraper
```

### Without Docker

Install python 3.7+: https://www.python.org/downloads/

Install pip
```bash
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py 
```
```bash
python3 get-pip.py
```
Install pipreqs 
```bash
pip install pipreqs
```
Install dependencies
```bash
pip install -r requirements.txt
```
Run application on port 8000 of your local network
```bash
python3 app.py
```
