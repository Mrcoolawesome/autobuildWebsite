# 2610 Django + Vite Starting Point
This project serves as a starting point you to use as a starting point for Django applications that use Vite as the asset server for development. You are welcome to us this project for all of your assignments beginning with Module 5.

## Strategy
This application is a hybrid MPA and SPA. It reuses all of the login stuff that we did at the end of module 3 - there is a separate page for signup/signin. Once a user is logged in they are redirected to the / view which then renders the SPA application created using React and Vite.

## Initial Setup

1. In the root directory, install the python dependencies `poetry install`
3. In the `client` directory, install the javascript dependencies `npm install`
7. In the `_server` directory, create a new file called `.env`
8. Copy the contents of `_server/.env.example` into the newly created `.env` file.
9. Activate the poetry env `poetry shell`
10. In the `_server` directory, run the migrations `python manage.py migrate`

## Running the appliction
1. In the `client` directory run `npm run dev`
2. In the `_server` directory (with your poetry env activated) run `python manage.py runserver`
3. Visit your application at `http://localhost:8000`
