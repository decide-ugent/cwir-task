function saveExperimentMetaData() {

    metaDataArray['StudyID'] = studyID;
    metaDataArray['SessionID'] = sessionID;
    metaDataArray['ParticipantID'] = participantID;
    metaDataArray['TimePerceptionMeasureMethod'] = timePerceptionMeasureMethod;
    metaDataArray['QuestionnaireClass'] = questionnaireClass;
    metaDataArray['NumberOfRounds'] = totalRounds;
    metaDataArray['NumberOfRoundsPerBlock'] = totalRounds/totalBlocks;
    metaDataArray['Lot0Probabilities'] = gamblesPercentages[0].join(', ');
    metaDataArray['Lot1Probabilities'] = gamblesPercentages[1].join(', ');
    metaDataArray['Lot0Values'] = gamblesValues[0].join(', ');
    metaDataArray['Lot1Values'] = gamblesValues[1].join(', ');
    metaDataArray['ObjectiveTimeIntervals'] = gamblesDeadlines.join(', '); 

    // Send the data to the Flask application
    $.ajax({
        url: urlPath+'save-experiment-metadata',
        type: 'POST',
        data: JSON.stringify(metaDataArray),
        contentType: 'application/json',
        success: function(response) {
            //console.log("Experiment metadata sent")
            console.log("");
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
            }
    });
}


function savePracticeMouseCoordinates() {

    dataPracticeMouseTracking['StudyID'] = studyID;
    dataPracticeMouseTracking['SessionID'] = sessionID;
    dataPracticeMouseTracking['ParticipantID'] = participantID;
    dataPracticeMouseTracking['PracticeGambleNumber'] = practiceRound;
    dataPracticeMouseTracking['PracticeMouseXCoordinates'] = mouseTrackingXcor.join(', ');
    dataPracticeMouseTracking['PracticeMouseYCoordinates'] = mouseTrackingYcor.join(', ');
    dataPracticeMouseTracking['RectLeftOptionLeftXCoord'] = rectLeftOptionLeftXCoord;
    dataPracticeMouseTracking['RectLeftOptionRightXCoord'] = rectLeftOptionRightXCoord;
    dataPracticeMouseTracking['RectLeftOptionTopYCoord'] = rectLeftOptionTopYCoord; 
    dataPracticeMouseTracking['RectLeftOptionBottomYCoord'] = rectLeftOptionBottomYCoord; 
    dataPracticeMouseTracking['RectRightOptionLeftXCoord'] = rectRightOptionLeftXCoord; 
    dataPracticeMouseTracking['RectRightOptionRightXCoord'] = rectRightOptionRightXCoord; 
    dataPracticeMouseTracking['RectRightOptionTopYCoord'] = rectRightOptionTopYCoord; 
    dataPracticeMouseTracking['RectRightOptionBottomYCoord'] = rectRightOptionBottomYCoord;
    dataPracticeMouseTracking['RectStartButtonLeftXCoord'] = rectStartButtonLeftXCoord; 
    dataPracticeMouseTracking['RectStartButtonRightXCoord'] = rectStartButtonRightXCoord; 
    dataPracticeMouseTracking['RectStartButtonTopYCoord'] = rectStartButtonTopYCoord; 
    dataPracticeMouseTracking['RectStartButtonBottomYCoord'] = rectStartButtonBottomYCoord; 
    dataPracticeMouseTracking['BigRectTopYCoord'] = bigRectTopYCoord; 
    dataPracticeMouseTracking['BigRectBottomYCoord'] = bigRectBottomYCoord; 
    dataPracticeMouseTracking['BigRectLeftXCoord'] = bigRectLeftXCoord; 
    dataPracticeMouseTracking['BigRectRightXCoord'] = bigRectRightXCoord; 

    // Send the data to the Flask application
    $.ajax({
        url: urlPath+'save-practice-mouse-coordinates',
        type: 'POST',
        data: JSON.stringify(dataPracticeMouseTracking),
        contentType: 'application/json',
        success: function(response) {
            console.log("");
            //console.log("Practice mouse tracking data sent")
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
            }
    });
}

function saveMouseCoordinates() {

    dataMouseTracking['StudyID'] = studyID;
    dataMouseTracking['SessionID'] = sessionID;
    dataMouseTracking['ParticipantID'] = participantID;
    dataMouseTracking['ExperimentGambleNumber'] =  gamblesPresentationOrder[roundNumber-1]+1;
    dataMouseTracking['ExperimentRoundNumber'] = roundNumber;
    dataMouseTracking['MouseXCoordinates'] = mouseTrackingXcor.join(', ');
    dataMouseTracking['MouseYCoordinates'] = mouseTrackingYcor.join(', ');
    dataMouseTracking['RectLeftOptionLeftXCoord'] = rectLeftOptionLeftXCoord;
    dataMouseTracking['RectLeftOptionRightXCoord'] = rectLeftOptionRightXCoord;
    dataMouseTracking['RectLeftOptionTopYCoord'] = rectLeftOptionTopYCoord; 
    dataMouseTracking['RectLeftOptionBottomYCoord'] = rectLeftOptionBottomYCoord; 
    dataMouseTracking['RectRightOptionLeftXCoord'] = rectRightOptionLeftXCoord; 
    dataMouseTracking['RectRightOptionRightXCoord'] = rectRightOptionRightXCoord; 
    dataMouseTracking['RectRightOptionTopYCoord'] = rectRightOptionTopYCoord; 
    dataMouseTracking['RectRightOptionBottomYCoord'] = rectRightOptionBottomYCoord;
    dataMouseTracking['RectStartButtonLeftXCoord'] = rectStartButtonLeftXCoord; 
    dataMouseTracking['RectStartButtonRightXCoord'] = rectStartButtonRightXCoord; 
    dataMouseTracking['RectStartButtonTopYCoord'] = rectStartButtonTopYCoord; 
    dataMouseTracking['RectStartButtonBottomYCoord'] = rectStartButtonBottomYCoord; 
    dataMouseTracking['BigRectTopYCoord'] = bigRectTopYCoord; 
    dataMouseTracking['BigRectBottomYCoord'] = bigRectBottomYCoord; 
    dataMouseTracking['BigRectLeftXCoord'] = bigRectLeftXCoord; 
    dataMouseTracking['BigRectRightXCoord'] = bigRectRightXCoord;
    

    // Send the data to the Flask application
    $.ajax({
        url: urlPath+'save-mouse-coordinates',
        type: 'POST',
        data: JSON.stringify(dataMouseTracking),
        contentType: 'application/json',
        success: function(response) {
            //console.log("Mouse tracking data saved")
            console.log("");
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
            }
    });
}

function saveInstructionsCompletionTimes() {

    dataInstructionsCompletionTimes['StudyID'] = studyID;
    dataInstructionsCompletionTimes['SessionID'] = sessionID;
    dataInstructionsCompletionTimes['ParticipantID'] = participantID;

    dataInstructionsCompletionTimes['CompletionTimeConsentForm'] = completionTimeConsentForm/1000;
    dataInstructionsCompletionTimes['CompletionTimeIntroduction'] = completionTimeIntroduction/1000;
    dataInstructionsCompletionTimes['CompletionTimeInstruction1'] = completionTimeInstruction1/1000;
    dataInstructionsCompletionTimes['CompletionTimeInstruction2'] = completionTimeInstruction2/1000;
    dataInstructionsCompletionTimes['CompletionTimeInstruction3'] = completionTimeInstruction3/1000;
    dataInstructionsCompletionTimes['CompletionTimeInstruction4'] = completionTimeInstruction4/1000;
    dataInstructionsCompletionTimes['CompletionTimeInstruction5'] = completionTimeInstruction5/1000;
    dataInstructionsCompletionTimes['CompletionTimeInstruction6'] = completionTimeInstruction6/1000;
    dataInstructionsCompletionTimes['CompletionTimeInstructionsCompleted'] = completionTimeInstructionsCompleted/1000;
    dataInstructionsCompletionTimes['CompletionTimeTimingInstructions'] = completionTimeTimingInstructions/1000;
    dataInstructionsCompletionTimes['CompletionTimeAllInstructions'] = completionTimeAllInstructions/1000;

    dataInstructionsCompletionTimes['CompletionTimeComprehensionCheck1'] = completionTimeComprehensionCheck1/1000;
    dataInstructionsCompletionTimes['CompletionTimeComprehensionCheck2'] = completionTimeComprehensionCheck2/1000;
    dataInstructionsCompletionTimes['CompletionTimeComprehensionCheck3'] = completionTimeComprehensionCheck3/1000;
    dataInstructionsCompletionTimes['CompletionTimeComprehensionCheck4'] = completionTimeComprehensionCheck4/1000;
  
    dataInstructionsCompletionTimes['AttemptsLeftComprehensionCheck1'] = attemptsLeftQuiz1;
    dataInstructionsCompletionTimes['AttemptsLeftComprehensionCheck2'] = attemptsLeftQuiz2;
    dataInstructionsCompletionTimes['AttemptsLeftComprehensionCheck3'] = attemptsLeftQuiz3;
    dataInstructionsCompletionTimes['AttemptsLeftComprehensionCheck4'] = attemptsLeftQuiz4;

    dataInstructionsCompletionTimes['VisitsConsentForm'] = visitsConsentForm;
    dataInstructionsCompletionTimes['VisitsInstruction1'] = visitsInstruction1;
    dataInstructionsCompletionTimes['VisitsInstruction2'] = visitsInstruction2;
    dataInstructionsCompletionTimes['VisitsInstruction3'] = visitsInstruction3;
    dataInstructionsCompletionTimes['VisitsInstruction4'] = visitsInstruction4;
    dataInstructionsCompletionTimes['VisitsInstruction5'] = visitsInstruction5;
    dataInstructionsCompletionTimes['VisitsInstruction6'] = visitsInstruction6;
   

    $.ajax({
        url: urlPath +'save-instructions-completion-times',
        type: 'POST',
        data: JSON.stringify(dataInstructionsCompletionTimes),
        contentType: 'application/json',
        success: function(response) {
            console.log("");
            //console.log("Instructions completion times sent");
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
        }

    });

}

function saveBlockEndQuestionnaire() {

    dataBlockEndQ['StudyID'] = studyID;
    dataBlockEndQ['SessionID'] = sessionID;
    dataBlockEndQ['ParticipantID'] = participantID;
    dataBlockEndQ['BlockNumber'] = blockNumber;
    dataBlockEndQ['BlockEndAnswer1'] = blockEndAnswer1;
    dataBlockEndQ['TimeToAnswerBlockEndQ1'] = timeToAnswerBlockEndQuestion1/1000;
    dataBlockEndQ['FirstTimeToAnswerBlockEndQ1'] = firstTimeToAnswerBlockEndQuestion1/1000;
    dataBlockEndQ['AttemptsSubjectiveBlockTime'] = attemptsAnswerBlockEndQuestion1;
    dataBlockEndQ['BlockEndAnswer2'] = blockEndAnswer2;
    dataBlockEndQ['TimeToAnswerBlockEndQ2'] = timeToAnswerBlockEndQuestion2/1000;
    dataBlockEndQ['BlockEndAnswer3'] = blockEndAnswer2;
    dataBlockEndQ['TimeToAnswerBlockEndQ3'] = timeToAnswerBlockEndQuestion3/1000;
    dataBlockEndQ['TotalTimeBlock'] = totalTimeBlock/1000;

    $.ajax({
        url: urlPath +'save-block-end-questionnaire',
        type: 'POST',
        data: JSON.stringify(dataBlockEndQ),
        contentType: 'application/json',
        success: function(response) {
            console.log("");
            //console.log("Block end questionnaire sent");
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
        }

    });

}

function saveBreakData(dataBreak) {

    $.ajax({
        //url: '/cognitive_load/save-break-data',
        url: urlPath+'save-break-data',
        type: 'POST',
        data: JSON.stringify(dataBreak),
        contentType: 'application/json',
        success: function(response) {
            console.log("");
            //console.log("Data break sent");
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
        }

    });
}

/*function saveExperimentQuestion(dataExperiment) {


    // Send the data to the Flask application
    $.ajax({
        url: '/cognitive_load/save-experiment-question',
        type: 'POST',
        data: JSON.stringify(dataExperiment),
        contentType: 'application/json',
        success: function(response) {
            console.log("Experiment question data saved")
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
            }
    });
}*/


function saveExperimentReproTaskMethod1Quest1() {
    
    // Record data of the current round number
    dataExperiment['StudyID'] = studyID;
    dataExperiment['SessionID'] = sessionID;
    dataExperiment['ParticipantID'] = participantID;
    dataExperiment['BlockNumber'] = blockNumber;
    dataExperiment['ExperimentRoundNumber'] = roundNumber;
    dataExperiment['ExperimentGambleNumber'] = gamblesPresentationOrder[roundNumber-1]+1;
    dataExperiment['LotteryLeft'] = lotteriesPresentationOrder[roundNumber-1]["Left"];
    dataExperiment['LotteryRight'] = lotteriesPresentationOrder[roundNumber-1]["Right"];
    dataExperiment['GambleChoice'] = choice;
    dataExperiment['ResponseTimeGamble'] = timePickGamble/1000;
    dataExperiment['GambleSecondaryChoices'] = secondaryChoices.join(', ');
    dataExperiment['GambleSecondaryChoicesTimes'] = secondaryChoicesTimes.join(', ');
    dataExperiment['GamblePresetDeadline'] = roundPresetDeadline;
    dataExperiment['GambleFinalDeadline'] = roundFinalDeadline;
    dataExperiment['MissedMaxDeadline'] = missedMaxDeadline;
    dataExperiment['FullScreenExited'] = fullScreenExitedWhileInRound;
    dataExperiment['ReproducedTime'] = reproducedTime/1000;
    dataExperiment['SubjectiveDifficulty'] = answerSubjDiff;
    dataExperiment['ResponseTimeSubjectiveDifficulty'] = timeToAnswerSubjDiff/1000;
    dataExperiment['ResponseTimeSubmitAnswersQuestionnaire'] = timeToAnswerQuestionnaireClass1/1000;

    // Send the data to the Flask application
    $.ajax({
        //url: '/cognitive_load/save-experimentdata-reprotaskmethod1-quest1',
        url: urlPath +'save-experimentdata-reprotaskmethod1-quest1',
        type: 'POST',
        data: JSON.stringify(dataExperiment),
        contentType: 'application/json',
        success: function(response) {
            console.log("");
            //console.log("Experiment trial data sent")
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
            }
    });
}

function savePracticeReproTaskMethod1Quest1() {

    // Record data of the current practice round
    dataPractice['StudyID'] = studyID;
    dataPractice['SessionID'] = sessionID;
    dataPractice['ParticipantID'] = participantID;
    dataPractice['PracticeGambleNumber'] = practiceRound;
    dataPractice['GambleChoice'] = choice;
    dataPractice['ResponseTimeGamble'] = timePickGamble/1000;
    dataPractice['GambleSecondaryChoices'] = secondary_choices.join(', ');
    dataPractice['GambleSecondaryChoicesTimes'] = secondary_choices_times.join(', ');
    dataPractice['GamblePresetDeadline'] = practiceRoundPresetDeadline;
    dataPractice['MissedDeadline'] = missedDeadline;
    dataPractice['FullScreenExited'] = fullScreenExitedWhileInRound;
    dataPractice['ReproducedTime'] = reproducedTime;
    dataPractice['SubjectiveDifficulty'] = answerSubjDiff;
    dataPractice['ResponseTimeSubjectiveDifficulty'] = timeToAnswerSubjDiff/1000;
    dataPractice['ResponseTimeSubmitAnswersQuestionnaire'] = timeToAnswerQuestionnaireClass1/1000;

    // Send the data to the Flask application
    $.ajax({
        //url: '/cognitive_load/save-practicedata-reprotaskmethod1-quest1',
        url: urlPath + 'save-practicedata-reprotaskmethod1-quest1',
        type: 'POST',
        data: JSON.stringify(dataPractice),
        contentType: 'application/json',
        success: function(response) {
            //console.log("Practice trial data sent")
            console.log("");
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
            }
    });

}

function saveFullScreenMessage(dataFullScreenMessage) {

    $.ajax({
        //url: '/cognitive_load/save-full-screen-message',
        url: urlPath + 'save-full-screen-message',
        type: 'POST',
        data: JSON.stringify(dataFullScreenMessage),
        contentType: 'application/json',
        success: function(response) {
            //console.log("Data full screen message sent");
            console.log("");
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
        }

    });
}

function saveFinalQuestionnaire(dataFinalQ) {
     
    $.ajax({
        //url: '/cognitive_load/save-final-questionnaire',
        url: urlPath + 'save-final-questionnaire',
        type: 'POST',
        data: JSON.stringify(dataFinalQ),
        contentType: 'application/json',
        success: function(response) {
            console.log("");
            //console.log("Final questionnaire sent");
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
        }

    });
    
    thankYouMessage()
                
}
   