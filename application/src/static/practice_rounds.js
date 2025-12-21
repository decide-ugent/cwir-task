function showPracticeOptions(){
    
    $('#InstructionsCompleted').empty().hide()
    $('body').css('background-color', 'grey');
    $('#questionnaire').hide();
    $('#progressBar').empty().hide();
    $('#explanations').empty().hide();
    $('#timingInstructions').hide();
    
    dataPractice = {}

    choice = "None" 
    choiceMade = false
    missedDeadline = false

    if (practiceRound === totalPracticeRounds + 1) {

        //Remove event listener
        $(document).off('keydown', handleSpacebarPractice);

        $('body').css('background-color', 'white');
        
        getBonusPractice();

    } else {

        //console.log("Practice round number: ",practiceRound)
        
        // Retrieve the value of the options for this practice round
        var optionsVals = [practiceGamblesValues[practiceRound - 1][0],
                            practiceGamblesValues[practiceRound - 1][1]]

        // Retrieve the probabilities of the options for this practice round
        var optionsPercentages = [practiceGamblesPercentages[practiceRound - 1][0],
                                   practiceGamblesPercentages[practiceRound - 1][1]]

        // Retrieve the deadline for this practice round
        practiceRoundPresetDeadline = practiceGamblesDeadlines[practiceRound - 1]

        //console.log("Practice round preset deadline: ", practiceRoundPresetDeadline)                  

        //Build the subcontainer of the left option
        var subcontainerOptionLeft = $('<div class="option-subcontainer" id="subcontainerOptionLeft"></div>')
      	
        optionButtonLeft = $('<button>')
            .addClass('option-button-left')
            .attr('id', 'button-left')
            .attr('value', 'Left')
            .click(function () {

                if (!choiceMade) {

                    //Get reaction time
                    timePickGamble = performance.now() - roundStartTime

                    clearTimeout(noDecisionWarning);

                    deactivateSecondTimeLimit()

                    stopRecording()

                    //Save practice mouse coordinates
                    savePracticeMouseCoordinates()

    
                    //Change the flag so that it is known that choice has been made
                    choiceMade = true

                    $(this).css('border', '7px solid red')

                    choice = document.getElementById('button-left').value

                    $(this).blur();

                    if (missedDeadline) {

                        clearTimeout(decision_deadline)

                        
                        //Make secondary choices and times list empty again.
                        secondary_choices = [];
                        secondary_choices_times = [];

                    
                        //Record the practice lotteries chosen and 
                        // whether or not the deadline was missed
                        practice_lotteries_chosen.push(choice)
                        practice_lotteries_chosen_missed_deadline.push(true)

                        if (timePerceptionMeasureMethod === 'ReproTaskMethod1') {
                            //Show reproduction task or
                            practiceReproductionTaskMethod1();  
                        } else {
                            //Show questionnaire
                            showQuestions();
                        }
                    }
                    
                } else {
                    $(this).blur(); 
                    timePickSecondaryGamble = performance.now() - roundStartTime 
                    secondary_choices_times.push(timePickSecondaryGamble/1000) 
                    secondary_choice = document.getElementById('button-left').value 
                    secondary_choices.push(secondary_choice)
                }
        
            });


        var upSubcontainerLeft = $('<div class="option-subsubcontainer">'+
            '<h1 class="numbers">'+
            String(optionsPercentages[0])+
            '</h1>'+
            '<p class="symbol">%</p>'+
            '<p class="options-text">of</p>'+
            '</div>')

        var downSubcontainerLeft = $('<div class="option-subsubcontainer">'+
            '<p class="options-text">winning</p>'+
            '<h1 class="numbers">'+
            String(optionsVals[0])+
            '</h1>'+
            '<p class="symbol">$</p>'+
            '</div>')

        subcontainerOptionLeft.append(upSubcontainerLeft, downSubcontainerLeft)
        optionButtonLeft.append(subcontainerOptionLeft)

        //Build the subcontainer of the right option
        var subcontainerOptionRight = $('<div class="option-subcontainer" id="subcontainerOptionRight"></div>')
        
        optionButtonRight = $('<button>')
            .addClass('option-button-right')
            .attr('id', 'button-right')
            .attr('value', 'Right')
            .click(function () {

                if (!choiceMade) {

                    //Get reaction time
                    timePickGamble = performance.now() - roundStartTime

                    clearTimeout(noDecisionWarning);

                    deactivateSecondTimeLimit()

                    stopRecording()

                    //Save practice mouse coordinates
                    savePracticeMouseCoordinates()

                    //Change the flag so that it is known that choice has been made
                    choiceMade = true

                    choice = document.getElementById('button-right').value

                    $(this).css('border', '7px solid red')

                    $(this).blur();

                    if (missedDeadline) {

                        clearTimeout(decision_deadline)
                        
                        //Make secondary choices and times list empty again.
                        secondary_choices = [];
                        secondary_choices_times = [];

                    
                        //Record the practice lotteries chosen and 
                        // whether or not the deadline was missed
                        practice_lotteries_chosen.push(choice)
                        practice_lotteries_chosen_missed_deadline.push(true)

                        if (timePerceptionMeasureMethod === 'ReproTaskMethod1') {
                            //Show reproduction task or
                            practiceReproductionTaskMethod1();  
                        } else {
                            //Show questionnaire
                            showQuestions();
                        }
                    }

                } else {

                    $(this).blur();  
                    timePickSecondaryGamble = performance.now() - roundStartTime 
                    secondary_choices_times.push(timePickSecondaryGamble/1000)
                    secondary_choice = document.getElementById('button-right').value 
                    secondary_choices.push(secondary_choice)
                }
           
            });
          

        var upSubcontainerRight = $('<div class="option-subsubcontainer">'+
            '<h1 class="numbers">'+
            String(optionsPercentages[1])+
            '</h1>'+
            '<p class="symbol">%</p>'+
            '<p class="options-text">of</p>'+
            '</div>')

        var downSubcontainerRight = $('<div class="option-subsubcontainer">'+
            '<p class="options-text">winning</p>'+
            '<h1 class="numbers">'+
            String(optionsVals[1])+
            '</h1>'+
            '<p class="symbol">$</p>'+
            '</div>')

        subcontainerOptionRight.append(upSubcontainerRight, downSubcontainerRight)
        optionButtonRight.append(subcontainerOptionRight)
       
        // Build the options container and the start button container
        var optionButtonsContainer = $('<div class ="option-buttons-container">')

        startButton = $('<button>')
            .addClass('start-button')
            .text('START')
            .click(function () {

                clearTimeout(startDeadlineWarning);
                clearTimeout(timeLimitAfterWarning);
                clearTimeout(secondTimeLimitID);

                if (!roundStarted) {

                    roundStarted = true;

                    startRecording()

                    //Set initial time stamp:
                    roundStartTime = performance.now()

                    // The two options appear
                    optionButtonsContainer.append(optionButtonLeft.show(),optionButtonRight.show()).show()

                    //--------------Get measures of boxes------------//

                    const bigRect = bigContainer[0].getBoundingClientRect();
                    const rectLeftOption = optionButtonLeft[0].getBoundingClientRect();
                    const rectRightOption = optionButtonRight[0].getBoundingClientRect();
                    const rectStartButton = startButton[0].getBoundingClientRect();

                    // Compute the left subcontainer left x coord
                    rectLeftOptionLeftXCoord = rectLeftOption.left - bigRect.left
                    // Compute the left subcontainer right x coord
                    rectLeftOptionRightXCoord  = rectLeftOption.right - bigRect.left
                    // Compute the left subcontainer y top coord
                    rectLeftOptionTopYCoord = bigRect.height - (rectLeftOption.top - bigRect.top)
                    // Compute the left subcontainer y bottom coord
                    rectLeftOptionBottomYCoord = bigRect.height - (rectLeftOption.bottom - bigRect.top)

                    // Compute the right subcontainer left x coord
                    rectRightOptionLeftXCoord = rectRightOption.left - bigRect.left
                    // Compute the right subcontainer right x coord
                    rectRightOptionRightXCoord  = rectRightOption.right - bigRect.left
                    // Compute the right subcontainer y top coord
                    rectRightOptionTopYCoord = bigRect.height - (rectRightOption.top - bigRect.top)
                    // Compute the right subcontainer y bottom coord
                    rectRightOptionBottomYCoord = bigRect.height - (rectRightOption.bottom - bigRect.top)
      
                    // Compute the start button left x coord
                    rectStartButtonLeftXCoord = rectStartButton.left - bigRect.left
                    // Compute the start button right x coord
                    rectStartButtonRightXCoord  = rectStartButton.right - bigRect.left
                    // Compute the start button y top coord
                    rectStartButtonTopYCoord = bigRect.height - (rectStartButton.top - bigRect.top) 
                    // Compute the start button y bottom coord
                    rectStartButtonBottomYCoord = bigRect.height - (rectStartButton.bottom - bigRect.top) 
           
                    //---------------------------------------------//

                    //The start button disappears
                    startButtonContainer.empty()

                    decision_deadline = setTimeout(function() {    

                        if (!choiceMade) {
        
                            missedDeadline = true;
        
                        } else {
        
                            //Record the practice lotteries chosen and 
                            // whether or not the deadline was missed
                            practice_lotteries_chosen.push(choice)
                            practice_lotteries_chosen_missed_deadline.push(false)
                    
                            /*dataPractice['StudyID'] = studyID;
                            dataPractice['SessionID'] = sessionID;
                            dataPractice['ParticipantID'] = participantID;
                            dataPractice['PracticeGambleNumber'] = practiceRound;
                            dataPractice['GambleChoice'] = choice;
                            dataPractice['ResponseTimeGamble'] = timePickGamble/1000;
                            dataPractice['GambleSecondaryChoices'] = secondary_choices.join(', ');
                            dataPractice['GambleSecondaryChoicesTimes'] = secondary_choices_times.join(', ');
                            dataPractice['GambleDeadline'] = round_deadline
                            dataPractice['MissedDeadline'] = missedDeadline;*/

                            //console.log("Secondary choices: ",secondary_choices)
                            //console.log("Secondary choices times: ",secondary_choices_times)

                            //roundStarted = false; //Reset flag to know if round started to default
                            
                            //Make secondary choices and times list empty again.
                            secondary_choices = [];
                            secondary_choices_times = [];
            
                            if (timePerceptionMeasureMethod === 'ReproTaskMethod1') {
                                //Show reproduction task or
                                practiceReproductionTaskMethod1();  
                            } else {
                                //Show questionnaire
                                showQuestions();
                            }
                            

                        }
            
                    },practiceRoundPresetDeadline*1000)

                    noDecisionWarning = setTimeout(function() {    

                        if (!choiceMade) {
                            timeLimitWarning("no_decision",120)
                        }
            
                    },deciding_deadline*1000)                     

                }
                
            });

        var startButtonContainer = $('<div class ="start-button-container">')
            .append(startButton)

        bigContainer = $('<div class ="big-container">')
            .append(optionButtonsContainer,startButtonContainer)

        
        $('#mainContainer').empty().append(bigContainer).show();



        var startDeadlineWarning = setTimeout(function() {    

            if (!roundStarted) {
                timeLimitWarning("no_start_round",60)
            }

        },start_deadline*1000)
           
    }   
}


