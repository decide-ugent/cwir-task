import mysql.connector
import numpy as np

numTrials = 40 #Number of experiment rounds

#Get best choices files
#path_to_file = r'/var/www/cognitive_load/pilot-risky-DM/src/gamble_generation/best_choices.csv'  
#best_choices = np.genfromtxt(path_to_file, delimiter=',')

#Connect to the database
connection = mysql.connector.connect(
    host="localhost",
    user="user",
    password="password",
    database="SecondPilotRiskyDM"
)
cursor = connection.cursor()

#Get Primary keys for final questionnaire
table_name_finalQ = "finalQuestionnaireAnswers"
primary_key_column_finalQ = "ParticipantID"
query = f"SELECT {primary_key_column_finalQ} FROM {table_name_finalQ}"
cursor.execute(query)
primary_key_values_finalQ = [row[0] for row in cursor.fetchall()]

#Get primary keys for fullScreenMessages
table_name_full_screen = "fullScreenMessages"
primary_key_full_screen = "ParticipantID_timestamp"
query = f"SELECT {primary_key_full_screen} FROM {table_name_full_screen}"
cursor.execute(query)
primary_key_values_full_screen = [row[0] for row in cursor.fetchall()]

#Make list of all participants IDs (only those who completed instructions)
query = "SELECT * FROM instructionsCompletionTimes"
cursor.execute(query)
rows = cursor.fetchall()
participant_IDs = []

for i in range(len(rows)):
    participant_IDs.append(rows[i][2])

#Start analysis of each participant
for i in range(len(participant_IDs)):
    participantID = participant_IDs[i]

    num_correct_answers = 0
    
    trials_affected_full_screen = []

    #Check in which trials the participant was not in full screen
    length_participant_ID_string = len(participantID)
    instances_non_full_screen = []
    for k in range(len(primary_key_values_full_screen)):
        if primary_key_values_full_screen[k][:length_participant_ID_string] == participantID:
            instances_non_full_screen.append(primary_key_values_full_screen[k])

    for m in range(len(instances_non_full_screen)):
        column_name = "ExperimentRoundNumber"
        query = f"SELECT {column_name} FROM {table_name_full_screen} WHERE {primary_key_full_screen} = %s"
        cursor.execute(query, (instances_non_full_screen[m],))
        trials_affected_full_screen.append(cursor.fetchone()[0])

    print("For participant: " +participantID+". The trials affected by the full screen issue are: "+str(trials_affected_full_screen))

    #Check if participant finalised experiment and how much time it took in total
    if participantID in primary_key_values_finalQ:
         
        #Output the total number of points collected:
        column_name = "TotalEarned"

        # Build and execute the SQL query to retrieve the value
        query = f"SELECT {column_name} FROM {table_name_finalQ} WHERE {primary_key_column_finalQ} = %s"
        cursor.execute(query, (participantID,))

        # Fetch the value
        totalEarned = cursor.fetchone()[0]  # Assuming there's only one result

        print("Participant "+participantID+", earned " + totalEarned + " points")        


        column_name = "TotalObjectiveStudyTime"

        # Build and execute the SQL query to retrieve the value
        query = f"SELECT {column_name} FROM {table_name_finalQ} WHERE {primary_key_column_finalQ} = %s"
        cursor.execute(query, (participantID,))

        # Fetch the value
        totalObjectiveStudyTime = cursor.fetchone()[0]  # Assuming there's only one result
        
        print("Participant "+participantID+", completed the experiment in " + totalObjectiveStudyTime + " seconds")
        
        #check if participant failed attention check 1.
        column_name = "FirstAttentionCheckAnswer"
        query = f"SELECT {column_name} FROM {table_name_finalQ} WHERE {primary_key_column_finalQ} = %s"
        cursor.execute(query, (participantID,))
        firstAttentionCheckAnswer = cursor.fetchone()[0]

        if firstAttentionCheckAnswer != "3":
            print("Participant "+participantID+", failed attention check 1")

        
        #check if participant failed attention check 2.
        column_name = "SecondAttentionCheckAnswer"
        query = f"SELECT {column_name} FROM {table_name_finalQ} WHERE {primary_key_column_finalQ} = %s"
        cursor.execute(query, (participantID,))
        secondAttentionCheckAnswer = cursor.fetchone()[0]

        if secondAttentionCheckAnswer != "4":
            print("Participant "+participantID+", failed attention check 2")
        
        primary_keys_experimentRounds = [str(participantID)+"_" + str(i) + "_experiment" for i in range(1, 41)]

        """
        #Check the number of correct answers 
        for j in range(numTrials):
            #fetch the lottery chosen for each trial
            table_name_experimentRounds = "experimentRoundsAnswers"
            primary_key_column_experimentRounds = "ExperimentRoundID"
            column_name = "GambleChoice"
            query = f"SELECT {column_name} FROM {table_name_experimentRounds} WHERE {primary_key_column_experimentRounds} = %s"
            cursor.execute(query, (primary_keys_experimentRounds[j],))
            gamble_chosen_word = cursor.fetchone()[0]            

            if gamble_chosen_word == "Left":
                column_name = "LotteryLeft"
            if gamble_chosen_word == "Centre":
                column_name = "LotteryCentre"
            if gamble_chosen_word == "Right":
                column_name = "LotteryRight"

            query = f"SELECT {column_name} FROM {table_name_experimentRounds} WHERE {primary_key_column_experimentRounds} = %s"
            cursor.execute(query, (primary_keys_experimentRounds[j],))
            gamble_chosen = cursor.fetchone()[0]

            column_name ="ExperimentGambleNumber"
            query = f"SELECT {column_name} FROM {table_name_experimentRounds} WHERE {primary_key_column_experimentRounds} = %s"
            cursor.execute(query, (primary_keys_experimentRounds[j],))
            gamble_number = cursor.fetchone()[0]

            if gamble_chosen == str(int(best_choices[int(gamble_number)-1])):
                num_correct_answers += 1

        print("Participant "+participantID+", made "+str(num_correct_answers)+" correct choices")
    else:
        print("Participant "+participantID+", did not complete the experiment")

"""
# Close the cursor and connection
cursor.close()
connection.close()
