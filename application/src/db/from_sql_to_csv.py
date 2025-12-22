import pandas as pd
from sqlalchemy import create_engine
import requests
from requests.auth import HTTPBasicAuth


# Database connection configuration
user = 'your_username'
password = 'your_password'
host = 'localhost'
database = 'your_database_name'

# Create SQLAlchemy engine
engine = create_engine(f'mysql+mysqlconnector://{user}:{password}@{host}/{database}')

#---------------------------------------------#
# Define the query to select the specific columns
query = "SELECT * FROM practiceMouseCoordinates"

# Fetch the data using pandas
df = pd.read_sql(query, engine)

# Save to CSV file
csv_file_path = 'practice_mouse_coordinates.csv'
df.to_csv(csv_file_path, index=False)

#---------------------------------------------#

# Define the query to select the specific columns
query = "SELECT * FROM mouseCoordinates"

# Fetch the data using pandas
df = pd.read_sql(query, engine)

# Save to CSV file
csv_file_path = 'mouse_coordinates.csv'
df.to_csv(csv_file_path, index=False)

#---------------------------------------------#


# Define the query to select the specific columns
query = "SELECT * FROM experimentReproTaskMethod1Quest1Answers"

# Fetch the data using pandas
df = pd.read_sql(query, engine)

# Save to CSV file
csv_file_path = 'experiment_reprotaskmethod1quest1_answers.csv'
df.to_csv(csv_file_path, index=False)

#---------------------------------------------#

# Define the query to select the specific columns
query = "SELECT * FROM practiceReproTaskMethod1Quest1Answers"

# Fetch the data using pandas
df = pd.read_sql(query, engine)

# Save to CSV file
csv_file_path = 'practice_reprotaskmethod1quest1_answers.csv'
df.to_csv(csv_file_path, index=False)

#---------------------------------------------#

# Define the query to select the specific columns
query = "SELECT * FROM blockEndQuestionnaireAnswers"

# Fetch the data using pandas
df = pd.read_sql(query, engine)

# Save to CSV file
csv_file_path = 'block_end_questionnaire_answers.csv'
df.to_csv(csv_file_path, index=False)

#---------------------------------------------#

# Define the query to select the specific columns
query = "SELECT * FROM finalQuestionnaireAnswers"

# Fetch the data using pandas 
df = pd.read_sql(query, engine) 

# Save to CSV file
csv_file_path = 'final_questionnaire_answers.csv'
df.to_csv(csv_file_path, index=False)

#---------------------------------------------#

# Define the query to select the specific columns
query = "SELECT * FROM instructionsCompletionTimes"
# Fetch the data using pandas
df = pd.read_sql(query, engine)
# Save to CSV file
csv_file_path = 'instructions_completion_times.csv'
df.to_csv(csv_file_path, index=False)

#---------------------------------------------#

# Define the query to select the specific columns
query = "SELECT * FROM breaksData"
# Fetch the data using pandas
df = pd.read_sql(query, engine)
# Save to CSV file
csv_file_path = 'breaks_data.csv'
df.to_csv(csv_file_path, index=False)

#---------------------------------------------#

# Define the query to select the specific columns
query = "SELECT * FROM fullScreenMessages"
# Fetch the data using pandas
df = pd.read_sql(query, engine)
# Save to CSV file
csv_file_path = 'full_screen_messages.csv'
df.to_csv(csv_file_path, index=False)

#---------------------------------------------#

'''
# Define the URL for the upload
#upload_url = 'https://cloud.ilabt.imec.be/remote.php/dav/files/af741990-37f9-103d-9441-9bec5c4808a7/ExperimentsData/risky_dm_0/practice_mouse_coordinates.csv/'

# Define your username and password for authentication
username = 'algarrid'
password = 'faunistico'

# Upload the file using requests
with open(csv_file_path, 'rb') as file:
    response = requests.put(
        upload_url,
        data=file,
        auth=HTTPBasicAuth(username, password)
    )

# Check the response
if response.status_code == 201:
    print('File uploaded successfully!')
else:
    print(f'Failed to upload file. Status code: {response.status_code}, Response: {response.text}')
'''
