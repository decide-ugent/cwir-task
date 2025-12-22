function takeBreak() {

    $('#blockEndQuestionnaire').empty().hide()
    $('#explanations').empty().hide()
    
    var takeBreakTitle = $('<h1>Time to take a break!</h1>');
  
    var takeBreakText2 = $("<p class = take-break-text><strong>"+
        "Please click on "+
        "<i>Next block</i> before the countdown hits 0:00</strong>, "+
        "otherwise you will be redirected to Prolific.</strong> "+
        "<strong>This break will last at least 3 minutes</strong>, "+
        "since the button <i>Next block</i> will only activate after that time.</p>")
    
    var takeBreakText4 = $("<p class = take-break-text>"+
        "Note that the timer, indicating the time left, is updated every 15 seconds: </p>")
   
    if (blockNumber == 2) {
        
        var takeBreakText1 = $("<p class = take-break-text>You have completed the "+
            "first block and you can now take a 5 minute break "+
            "(feel free to grab a drink or stretch your legs 😉).</p>");
    
        var takeBreakText3 = $("<p class = take-break-text>"+
            "<strong>You have four blocks left</strong> (with 32 rounds each). Good luck!</p>")
    }

    if (blockNumber == 3) {
        
        var takeBreakText1 = $("<p class = take-break-text>You have completed the "+
            "second block and you can now take a 5 minute break "+
            "(feel free to grab a drink or stretch your legs 😉).</p>");
    
        var takeBreakText3 = $("<p class = take-break-text>"+
            "<strong>You have three blocks left</strong> (with 32 rounds each). Good luck!</p>")
    }

    if (blockNumber == 4) {
        
        var takeBreakText1 = $("<p class = take-break-text>You have completed the "+
            "third block and you can now take a 5 minute break "+
            "(feel free to grab a drink or stretch your legs 😉).</p>");
    
        var takeBreakText3 = $("<p class = take-break-text>"+
            "<strong>You have two blocks left</strong> (with 32 rounds each). Good luck!</p>")
    }

    if (blockNumber == 5) {

        var takeBreakText1 = $("<p class = take-break-text>"+
            "You have completed the fourth block and you can now take a 5 minute break.</p>");

        var takeBreakText3 = $("<p class = take-break-text><strong>"+
            "You have one block left</strong>. Good luck! 😊</p>")
    }


    var countdownDisplay = $('<div>')
        .addClass('countdown-display')
        .text('5:00'); 

    var nextBlockButton = $('<button>')
        .addClass('next-block-button')
        .text('Next block')
        .click(function() {

            //Clear timers
            clearInterval(restTimeWarningDeadline);
            clearInterval(timer); 
            
            minRestHappened = false;
            breakHappened = true;
            attentionCheckHappened = false;
            
            //Starting time stamp
            startTimeBlock = performance.now()

            //Call the showOptions function
            showOptions();
                
            breakTimeDuration = performance.now() - startTimeBreak
            breakTime = performance.now() - startTimeStudy          

            var dataBreak = {
                study_id: studyID,
                session_id: sessionID,
                participant_id: participantID,
                blockNumber: blockNumber,
                breakTimeDuration: breakTimeDuration/1000,
                breakTime: breakTime/1000
            }
            
            saveBreakData(dataBreak)
    });

    var takeBreakTextBox = $('<div>')
        .addClass('take-break-text-box')
        .append(takeBreakText1, 
            takeBreakText2, 
            takeBreakText3, 
            takeBreakText4,
            countdownDisplay);

    $('#takeBreak').addClass('take-break')
        .append(takeBreakTitle, 
            takeBreakTextBox,
            nextBlockButton).show();
    
    $('.next-block-button').prop('disabled', true);
    
    setTimeout(function() {    
        minRestHappened = true;
        $('.next-block-button').prop('disabled', false);
    },180*1000)

    var startTimeBreak = performance.now()

    // Countdown timer logic
    let countdownTime = 300; // 5 minutes in seconds
    let timer = setInterval(function() {
        let minutes = Math.floor(countdownTime / 60);
        let seconds = countdownTime % 60;

        // Use a separate variable to track when to update the display
        let elapsed = countdownTime % 15;
    
        // Only update the display every 15 seconds
        if (elapsed === 0 || countdownTime === 0) {
            countdownDisplay.text(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
        }

        if (countdownTime === 0) {
            clearInterval(timer);

            var restTimeLimitWarningHeading = $('<h1 class = time-limit-warning-text>'+
                'Please proceed to the next block</h1>');
            var restTimeLimitWarningText = $("<p class = time-limit-warning-text>"+
                "If you do not click on <i>Next block</i> in less than 1 minute, "+
                    "you will be redirected to Prolific's platform and will not be able to proceed.</p>");
        
            var restTimeLimitWarningButton = $('<button class="full-screen-button">')
                .text('Ok')
                .click(function() {
                    $('#restTimeLimitWarningMessage').empty().hide();
                })

            $('#restTimeLimitWarningMessage')
                .empty()
                .append(restTimeLimitWarningHeading,
                    restTimeLimitWarningText, 
                    restTimeLimitWarningButton).show();
                    
            restTimeWarningDeadline = setInterval(function() {
                $('body').css('background-color', 'white');
                $('#mainContainer').hide();
                $('#restTimeLimitWarningMessage').empty().hide();
                var failTitle = $('<h1 class =red-text>It took you too much time!</h1>')
                var failText1 = $("<h3>Unfortunately, "+
                    "despite the warning we have not recorded any activity from your side, "+
                    "which means that you cannot complete the study.</h3>")
                var failText2 = $("<h3>You will now be redirected to Prolific's platform.</h3>")
                var failTextBox = $('<div>')
                    .addClass('thank-you-text-box')
                    .append(failText1,failText2)
                $('#thankYouMessage').empty()
                    .addClass('thank-you-message')
                    .append(failTitle,failTextBox).show();

                setTimeout(function() {
                    var urlToRedirect = "https://app.prolific.com/submissions/complete?cc=CB416WT4";
                    window.location.href = urlToRedirect;
                }, 12000);
            },60*1000)
    
        } else {
            countdownTime--;
        }
    }, 1000);
}





