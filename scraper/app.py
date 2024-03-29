"""Web app for scraping recipe data"""

from flask import Flask, request
from flask_cors import CORS
from recipe_scrapers import scrape_me
import recipe_scrapers._exceptions
import validators
import requests.exceptions

app = Flask(__name__)
CORS(app)


@app.route('/')
def greeting():
    return 'Welcome to recipe scraper.\n\nStart by making \
	    a get request to /recipe-data?url=recipe-url.'


@app.route('/recipe-data')
def get_recipe_data():
    # Get url parameter from client's query
    url = request.args.get('url', '')

    # Check that client provided a url parameter
    if url == '':
        print('Client failed to provide a url parameter')
        return 'Please provide a url', 400

    # Check for invalid urls
    if not validators.url(url):
        print('Client provided an invalid url')
        return 'Please provide a valid url', 400

    try:
        # Recipe scraping library courtesy of: https://github.com/hhursev/recipe-scrapers
        scraper = scrape_me(url, wild_mode=True)
    except requests.exceptions.MissingSchema:
        print('Invalid url')
        return 'Please provide a valid url', 400
    except recipe_scrapers._exceptions.NoSchemaFoundInWildMode:  
        print('Failed to scrape the provided url')
        return 'Unable to find recipe from url', 400
    except Exception as ex:
        print(type(ex))
        return 'An unexpected error occurred', 500

    # Successful request
    print('Successful request')
    return scraper.to_json()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port = 8000)
