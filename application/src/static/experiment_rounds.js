function Countdown() {

    completionTimeAllInstructions = performance.now() - startTimeStudy

    saveInstructionsCompletionTimes()

    $('#bonusFeedback').empty().hide()
    
    $('#CountdownText').show();

    var number3 = $('<h2>3</h2>')
    var number2 = $('<h2>2</h2>')
    var number1 = $('<h2>1</h2>')
    var go = $('<h2>Go!</h2>')

    setTimeout(function() {
        $('#Countdown').append(number3).show();
    }, 1000);

    setTimeout(function() {
        $('#Countdown').empty().append(number2).show();
    }, 2000);

    setTimeout(function() {
        $('#Countdown').empty().append(number1).show();
    }, 3000);

    setTimeout(function() {
        $('#CountdownText').hide().empty();
        $('#Countdown').hide().empty();
        $('#Countdown-centre').append(go).show();
    }, 4000);

    setTimeout(function() {
        $('#Countdown-centre').hide();
        showOptions();
        startTimeBlock = performance.now()
    }, 5000);

}

function showOptions() {

    $('#explanations').empty().hide()
    $('#consentForm').empty().hide()
    $('#questionnaire').hide();
    $('#takeBreak').empty().hide()
    $('#blockEndQuestionnaire').empty().hide()
    $('#progressBar').empty().hide();

    dataExperiment = {}

    //choice = "None"    //In the case no option is chosen 
    choiceMade = false
    missedDeadline = false;
    missedMaxDeadline = false;

    const trial_with_attention_check = attention_checks.includes(roundNumber);
    const trial_with_break = rounds_starting_block.includes(roundNumber);

    //console.log("TRIAL: ", roundNumber)

    //console.log("Trial with break?", trial_with_break)
    //console.log("Trial with attention check?", trial_with_attention_check)    

    //if (trial_with_break && breakHappened == 0) {
    if (trial_with_break && !breakHappened) {
        //console.log("Next Block")
        blockEndQuestionnaire() 
    
    } else {    

        //if (trial_with_attention_check && attention_check_happened == 0) {
        if (trial_with_attention_check && !attentionCheckHappened) {
	        showAttentionCheck(roundNumber)
        } else { 
	    
	        if (roundNumber === totalRounds + 1) {
	            
                blockEndQuestionnaire() 
	    
	        } else {

		        $('body').css('background-color', 'grey');

                // Retrieve the value of the options for this practice round
                var optionsVals = [gamblesValues[gamblesPresentationOrder[roundNumber - 1]][0],
                                    gamblesValues[gamblesPresentationOrder[roundNumber - 1]][1]]

              
                // Retrieve the probabilities of the options for this practice round
                var optionsPercentages = [gamblesPercentages[gamblesPresentationOrder[roundNumber - 1]][0],
                                           gamblesPercentages[gamblesPresentationOrder[roundNumber - 1]][1]]

                // Retrieve the preset deadline for this experiment round
                roundPresetDeadline = gamblesDeadlines[gamblesPresentationOrder[roundNumber - 1]]

                roundFinalDeadline = roundPresetDeadline

                //console.log("Preset round deadline", roundPresetDeadline)     

                //Build the subcontainer of the left option
                var subcontainerOptionLeft = $('<div class="option-subcontainer" id="subcontainerOptionLeft"></div>')

                optionButtonLeft = $('<button>')
                    .addClass('option-button-left')
                    .attr('id', 'button-left')
                    .attr('value', 'Left')
                    .click(function () {

                        if (!choiceMade) {

                            deactivateSecondTimeLimit()

                            clearTimeout(noDecisionWarning);

                            stopRecording()


                            //Save practice mouse coordinates
                            saveMouseCoordinates()


                            choiceMade = true

                            lookingOutcome = true;
                            

                            $(this).css('border', '7px solid red')

                            choice = document.getElementById('button-left').value
                            timePickGamble = performance.now() - roundStartTime

                            $(this).blur();

                            if (missedMaxDeadline) {

                                clearTimeout(presetDeadlineTimer)

                                //Record the lotteries chosen for the lottery
                                lotteriesChosen.push(choice)
                                lotteriesChosenMissedDeadline.push(true) 


                                if (timePerceptionMeasureMethod === 'ReproTaskMethod1') {
                                    //Show reproduction task or
                                    reproductionTaskMethod1();  
                                } else {
                                    //Show questionnaire
                                    showQuestions();
                                }

                            }
                            
                        } else {
                            $(this).blur();  
                            timePickSecondaryGamble = performance.now() - roundStartTime 
                            secondaryChoicesTimes.push(timePickSecondaryGamble/1000) 
                            secondaryChoice = document.getElementById('button-left').value 
                            secondaryChoices.push(secondaryChoice)
                        }

                    });


                var upSubcontainerLeft = $('<div class="option-subsubcontainer">'+
                    '<h1 class="numbers">'+
                    String(optionsPercentages[lotteriesPresentationOrder[roundNumber -1]["Left"]])+
                    '</h1>'+
                    '<p class="symbol">%</p>'+
                    '<p class="options-text">of</p>'+
                    '</div>')

                var downSubcontainerLeft = $('<div class="option-subsubcontainer">'+
                    '<p class="options-text">winning</p>'+
                    '<h1 class="numbers">'+
                    String(optionsVals[lotteriesPresentationOrder[roundNumber -1]["Left"]])+
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

                            deactivateSecondTimeLimit()

                            clearTimeout(noDecisionWarning);

                            stopRecording()


                            //Save practice mouse coordinates
                            saveMouseCoordinates()


                            choiceMade = true
                            
                            lookingOutcome = true;

                            choice = document.getElementById('button-right').value

                            timePickGamble = performance.now() - roundStartTime

                            $(this).css('border', '7px solid red')

                            $(this).blur();

                            if (missedMaxDeadline) {

                                clearTimeout(presetDeadlineTimer)

                                //Record the lotteries chosen for the lottery
                                lotteriesChosen.push(choice)
                                lotteriesChosenMissedDeadline.push(true) 


                                if (timePerceptionMeasureMethod === 'ReproTaskMethod1') {
                                    //Show reproduction task or
                                    reproductionTaskMethod1();  
                                } else {
                                    //Show questionnaire
                                    showQuestions();
                                }
                            }
                            
                        } else {

                            $(this).blur(); 
                            timePickSecondaryGamble = performance.now() - roundStartTime 
                            secondaryChoicesTimes.push(timePickSecondaryGamble/1000) 
                            secondaryChoice = document.getElementById('button-right').value 
                            secondaryChoices.push(secondaryChoice) 
                        }

                    });


                var upSubcontainerRight = $('<div class="option-subsubcontainer">'+
                    '<h1 class="numbers">'+
                    String(optionsPercentages[lotteriesPresentationOrder[roundNumber -1]["Right"]])+
                    '</h1>'+
                    '<p class="symbol">%</p>'+
                    '<p class="options-text">of</p>'+
                    '</div>')

                var downSubcontainerRight = $('<div class=option-subsubcontainer>'+
                    '<p class="options-text">winning</p>'+
                    '<h1 class="numbers">'+
                    String(optionsVals[lotteriesPresentationOrder[roundNumber -1]["Right"]])+
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

                            presetDeadlineTimer = setTimeout(function() {    
                                
                                if (!choiceMade) {
        
                                    missedDeadline = true;

                                    if (roundPresetDeadline < maxDeadline) {

                                        roundFinalDeadline += 2
                                        
                                        extraDeadlineTimer = setTimeout(function() {
                                            
                                            if (!choiceMade) {
                                                if (roundFinalDeadline < maxDeadline) {
                                                    secondExtraDeadlineTimer = setTimeout(function() {
                                                        roundFinalDeadline += 2
                                                        
                                                        if (!choiceMade) {
                                                            missedMaxDeadline = true;
                                                        } else {
                                                            //Record the chosen lottery in the 
                                                            //list of chosen lotteries 
                                                            lotteriesChosen.push(choice)
                                                            lotteriesChosenMissedDeadline.push(false)

                                                            if (timePerceptionMeasureMethod === 'ReproTaskMethod1') {
                                                                //Show reproduction task or
                                                                reproductionTaskMethod1();  
                                                            } else {
                                                                //Show questionnaire
                                                                showQuestions();
                                                            }
                                                        }
                                                    }, 2000)

                                                } else {
                                                    missedMaxDeadline = true;
                                                }

                                            } else {
                                                //Record the lotteries chosen for the lottery
                                                lotteriesChosen.push(choice)
                                                lotteriesChosenMissedDeadline.push(false)
                                           
                                                if (timePerceptionMeasureMethod === 'ReproTaskMethod1') {
                                                    //Show reproduction task or
                                                    reproductionTaskMethod1();  
                                                } else {
                                                    //Show questionnaire
                                                    showQuestions();
                                                }
                                            }
                                        
                                        },2000)

                                    } else {
                                        missedMaxDeadline = true;
                                    }

                                    clearInterval(presetDeadlineTimer)

                                    //var startDeadlineWarning = setTimeout(function() {    

                                    //    if (!roundStarted ) {
                                    //        timeLimitWarning("no_start_round",120)
                                    //    }
                            
                                    //},start_deadline*1000)
        
                                } else {
        
                                    //Record the lotteries chosen for the lottery
                                    lotteriesChosen.push(choice)
                                    lotteriesChosenMissedDeadline.push(false)
        
                        
                                    if (timePerceptionMeasureMethod === 'ReproTaskMethod1') {
                                        //Show reproduction task or
                                        reproductionTaskMethod1();  
                                    } else {
                                        //Show questionnaire
                                        showQuestions();
                                    }
        
                                }
        
                            },roundPresetDeadline*1000)
                

                            noDecisionWarning = setTimeout(function() {    
                                if (!choiceMade) {
                                    timeLimitWarning("no_decision", 120)
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

                    if (!roundStarted ) {
                        timeLimitWarning("no_start_round",120)
                    }
        
                },start_deadline*1000)
            
	        }  
        }
    }
}


