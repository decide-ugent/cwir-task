function checkFullscreenStatus() {

    if (!document.fullscreenElement && 
        !document.mozFullScreenElement && 
        !document.webkitFullscreenElement && 
        !document.msFullscreenElement)
        {

        // The user is not in full-screen mode
        
        $('.button').prop('disabled', true);
        $('.start-button').prop('disabled', true);
        $('.next-block-button').prop('disabled', true);
        $('.option-button-left').prop('disabled', true);
        $('.option-button-right').prop('disabled', true);
        $('.submit-answers-button').prop('disabled', true);
        $('.missed-deadline-button').prop('disabled', true); 
        $('.screen-size-top-left-button').prop('disabled', true); 
        $('.screen-size-top-right-button').prop('disabled', true); 
        $('.screen-size-bottom-left-button').prop('disabled', true); 
        $('.screen-size-bottom-right-button').prop('disabled', true); 

        //console.log("full_screen_exited", full_screen_exited)
        

        if (!fullscreenMessageShown) {

            fullscreenMessageShown = true; // Set the flag to true

            if (full_screen_exited === 4) {
                fullScreenRedirectToProlific()  
            } else {
                showFullScreenMessage()
            }     
        }   

    } else if (!document.hasFocus()){

        hideFullScreenMessage()

        // The user is not in focused
        
        $('.button').prop('disabled', true);
        $('.start-button').prop('disabled', true);
        $('.next-block-button').prop('disabled', true);
        $('.option-button-left').prop('disabled', true);
        $('.option-button-right').prop('disabled', true);
        $('.submit-answers-button').prop('disabled', true);
        $('.missed-deadline-button').prop('disabled', true); 
        $('.screen-size-top-left-button').prop('disabled', true); 
        $('.screen-size-top-right-button').prop('disabled', true); 
        $('.screen-size-bottom-left-button').prop('disabled', true); 
        $('.screen-size-bottom-right-button').prop('disabled', true); 

        //console.log("full_screen_exited", full_screen_exited)
        

        if (!switchWindowMessageShown) {

            switchWindowMessageShown = true; // Set the flag to true

            if (full_screen_exited === 4) {
                fullScreenRedirectToProlific() 
            } else {
                showSwitchWindowMessage()
            }
        } 
    
    } else {
        if (messageSwitchedWindowClicked) {
            hideSwitchWindowMessage()
        }

        hideFullScreenMessage()

     }
        
}

function hideSwitchWindowMessage() {
    // The user is in full-screen mode
    $('#switchWindowMessage').empty().hide();
    //fullscreenMessageShown = false; // Reset the flag when entering full-screen
    messageSwitchedWindowClicked = false;

    if (timePerceptionMeasureMethod === 'ReproTaskMethod1') {
        if (reproTaskOn) {
            hideCursor()
        }
    }

    if (!missedDeadlineMessageShown){
        $('.submit-answers-button').prop('disabled', false); 
    }
    if (!timeLimitMessageShown){
        $('.start-button').prop('disabled', false);
        $('.option-button-left').prop('disabled', false);
        $('.option-button-right').prop('disabled', false);
    } 
    
    if (minRestHappened){
        $('.next-block-button').prop('disabled', false);
    }
    
    $('.button').prop('disabled', false);
    $('.missed-deadline-button').prop('disabled', false); 
    $('.screen-size-top-left-button').prop('disabled', false); 
    $('.screen-size-top-right-button').prop('disabled', false); 
    $('.screen-size-bottom-left-button').prop('disabled', false); 
    $('.screen-size-bottom-right-button').prop('disabled', false); 
}



function hideFullScreenMessage() {
    // The user is in full-screen mode
    $('#fullscreenMessage').empty().hide();
    fullscreenMessageShown = false; // Reset the flag when entering full-screen
    //messageSwitchedWindowClicked = false;
    
    if (timePerceptionMeasureMethod === 'ReproTaskMethod1') {
        if (reproTaskOn) {
            if (switchWindowMessageShown) {
                if (messageSwitchedWindowClicked) {
                    hideCursor() 
                }

            } else {
                hideCursor()  
            }
            
        }
    }

    if (!missedDeadlineMessageShown){
        $('.submit-answers-button').prop('disabled', false); 
    }
    if (!timeLimitMessageShown){
        $('.start-button').prop('disabled', false);
        $('.option-button-left').prop('disabled', false);
        $('.option-button-right').prop('disabled', false);
    } 
    
    if (minRestHappened){
        $('.next-block-button').prop('disabled', false);
    }
    
    $('.button').prop('disabled', false);
    $('.missed-deadline-button').prop('disabled', false); 
    $('.screen-size-top-left-button').prop('disabled', false); 
    $('.screen-size-top-right-button').prop('disabled', false); 
    $('.screen-size-bottom-left-button').prop('disabled', false); 
    $('.screen-size-bottom-right-button').prop('disabled', false); 
}


function fullScreenRedirectToProlific() {
    $('body').css('background-color', 'white');
    $('#thankYouMessage').empty().hide();
    $('#explanations').empty().hide();
    $('#mainContainer').empty().hide();
    $('.questionnaire').empty().hide();
    $('#takeBreak').empty().hide();
    $('#Quiz').empty().hide();
    $('#instructionsMessage').hide();
    
    var failTitle = $('<h2>You exited full-screen mode or switched windows more than 3 times</h2>')
        .css('color', 'red').css('width', '10cm'); 

    var failText1 = $("<h3>Unfortunately, you exited full-screen mode or switched windows more than 3 times, "+
        "which means that you cannot complete the study.</h3>")

    var failText2 = $("<h3>You will now be redirected to Prolific's platform.</h3>")

    var failTextBox = $('<div>')
        .addClass('thank-you-text-box')
        .append(failText1,failText2)

    $('#thankYouMessage').addClass('thank-you-message').append(failTitle,failTextBox).show();

    setTimeout(function() {
        var urlToRedirect = "https://app.prolific.com/submissions/complete?cc=C1H70N6Y";
        window.location.href = urlToRedirect;
    }, 12000);
}

function showFullScreenMessage() {

    showCursor() 

    // Create and show the message
    var fullScreenHeading = $('<h1>FULL-SCREEN MODE</h1>');
    var fullScreenText1 = $('<h2>'+
        'It is important that you complete the study in full-screen mode and without switching windows.</h2>');
    var fullScreenText2 = $('<h2>If you exit full-screen mode or switch windows more than 3 times, '+
        'you will be unable to complete the study.</h2>');
    var fullScreenText3 = $('<h2>Please, '+
        'click on <i>full-screen</i> to proceed with the experiment.</h2>');
    var fullScreenButton = $('<button class="full-screen-button">')
        .text('Full-screen')
        .click(function() {

            full_screen_exited += 1

            const element = document.documentElement;

            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
            $('#fullscreenMessage').empty().hide();

            $('.button').prop('disabled', false);
            $('.start-button').prop('disabled', false);
            $('.next-block-button').prop('disabled', false);
            $('.option-button-left').prop('disabled', false);
            $('.option-button-right').prop('disabled', false);
            $('.submit-answers-button').prop('disabled', false); 
            $('.missed-deadline-button').prop('disabled', false); 
            $('.screen-size-top-left-button').prop('disabled', false); 
            $('.screen-size-top-right-button').prop('disabled', false); 
            $('.screen-size-bottom-left-button').prop('disabled', false); 
            $('.screen-size-bottom-right-button').prop('disabled', false); 

            fullscreenMessageShown = false; // Reset the flag when going back to full-screen
  
    });

    $('#fullscreenMessage')
        .append(fullScreenHeading, 
            fullScreenText1, 
            fullScreenText2, 
            fullScreenText3,
            fullScreenButton).show();
    
    timeFullScreenMessageAppeared = performance.now() - startTimeStudy          
    
    if (roundStarted) {
        fullScreenExitedWhileInRound = true
    }

    var dataFullScreenMessage = {
            study_id: studyID,
            session_id: sessionID,
            participant_id: participantID,
            timeFullScreenMessageAppeared: timeFullScreenMessageAppeared/1000,
            experimentRoundNumber: roundNumber + 1,
            whileInRound: fullScreenExitedWhileInRound,
        };

    saveFullScreenMessage(dataFullScreenMessage)
}


function showSwitchWindowMessage() {
    
    showCursor()

    // Create and show the message
    var fullScreenHeading = $('<h1>FULL-SCREEN MODE</h1>');
    var fullScreenText1 = $('<h2>'+
        'It is important that you complete the study in full-screen mode and without switching windows.</h2>');
    var fullScreenText2 = $('<h2>If you exit full-screen mode or switch windows more than 3 times, '+
        'you will be unable to complete the study.</h2>');
    var fullScreenText3 = $('<h2>Please, '+
        'click on <i>full-screen</i> to proceed with the experiment.</h2>');
    var fullScreenButton = $('<button class="full-screen-button">')
        .text('Full-screen')
        .click(function() {

            full_screen_exited += 1
            
            messageSwitchedWindowClicked = true;

            switchWindowMessageShown = false; // Reset the flag when going back to full-screen
  
    });

    $('#switchWindowMessage')
        .append(fullScreenHeading, 
            fullScreenText1, 
            fullScreenText2, 
            fullScreenText3,
            fullScreenButton).show();
    
    timeFullScreenMessageAppeared = performance.now() - startTimeStudy          
    
    if (roundStarted) {
        fullScreenExitedWhileInRound = true
    }

    var dataFullScreenMessage = {
            study_id: studyID,
            session_id: sessionID,
            participant_id: participantID,
            timeFullScreenMessageAppeared: timeFullScreenMessageAppeared/1000,
            experimentRoundNumber: roundNumber + 1,
            whileInRound: fullScreenExitedWhileInRound,
        };

    saveFullScreenMessage(dataFullScreenMessage)

}

