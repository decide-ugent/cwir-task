## CWIR task experiment appplication code
This directory contains the Flask application used to run the CWIR task experiment.

These instructions run the app using Flask’s development server (good for local testing). If you plan to deploy this as a behavioural experiment for participants, run it behind a production WSGI server instead and configure your database and hosting appropriately.

### Requirements
1) Create a virtual environment for python >=3.10 using your favourite tool. In this directory (`./application`), install packages and requirements doing:
  `pip install -r requirements_cwir_app.txt` 
2) Activate the environment

### Run the application locally
In this directory (`./application`), run the following command:
`python src/__init__.py`
Then open your browser (Firefox or Chrome) and copy paste the following link: `http://127.0.0.1:5000`

