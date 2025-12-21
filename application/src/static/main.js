//Obtaine participant, session and study ID from prolific
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const participantID = urlParams.get('PROLIFIC_PID')
const studyID = urlParams.get('STUDY_ID') 
const sessionID = urlParams.get('SESSION_ID')

//const participantID = Math.floor(Math.random() * 900) + 100;
//const studyID = Math.floor(Math.random() * 900) + 100;
//const sessionID = Math.floor(Math.random() * 900) + 100;

loadGambles()

showConsentForm()


//trainingCompleted()
//finalQuestionnaire()
//takeBreak(1)





    

