import mysql.connector
import numpy as np
import pandas as pd


connection = mysql.connector.connect(
    host="localhost",
    user="algarrid",
    password="faunistico",
    database="risky_dm_0"
)

cursor = connection.cursor()


# Define the query to select the specific columns
query = "SELECT PracticeMouseXCoordinates, PracticeMouseYCoordinates FROM practiceMouseCoordinates"

# Execute the query
cursor.execute(query)

# Fetch all rows from the executed query
#rows = cursor.fetchall()

# Print the columns
#for row in rows:
#    print(f"PracticeMouseXCoordinates: {row[0]}, PracticeMouseYCoordinates: {row[1]}")


# Fetch the data using pandas
df = pd.read_sql(query, connection)

# Save to CSV file
csv_file_path = 'practice_mouse_coordinates.csv'
df.to_csv(csv_file_path, index=False)
