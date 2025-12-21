function checkScreenSize() {

    var topLeftButtonClicked = false;
    var topRightButtonClicked = false;
    var bottomLeftButtonClicked = false;
    var bottomRightButtonClicked = false;

    var screenSizeHeading= $('<h1 class = "screen-size-big-text">'+
        'Before starting we need to check that your screen is large enough</h1>');

    var screenSizeText1 = $('<p class = "screen-size-text">'+
        'Click on the four buttons at the corners of the pink rectangle. '+
        'After that, you will be able to proceed.</p>');

    var screenSizeText2 = $('<p class = "screen-size-text">'+
        'If you can not see the four buttons, then your screen is not large enough '+
        'and you cannot complete the experiment.</p>');

    var screenSizeText3 = $("<p class = 'screen-size-text'>"+
        "Bare in mind that if you don't click on the four buttons in less than 2 minutes, "+
        "we will assume that your screen is not large enough and you will be redirected to Prolific's platform.</p>");

    var smallCont = $('<div class = "small-container">')
        .append(screenSizeHeading,
            screenSizeText1,
            screenSizeText2,
            screenSizeText3
        )
    
    var bigCont = $('<div class = "big-container-screen-size">')
        .append(smallCont)

    var screenSizeTopLeftButton = $('<button>')
        .addClass('screen-size-top-left-button')
        .text('Click here')
        .click(function() {
            if (!topLeftButtonClicked) {
                $(this).css('background-color', 'green');
                topLeftButtonClicked = true;

                //If the four buttons are clicked
                if (topLeftButtonClicked && 
                    topRightButtonClicked && 
                    bottomLeftButtonClicked && 
                    bottomRightButtonClicked)  {
                    clearTimeout(screenSizeDeadline)
                    $('#mainContainer').empty()
                    saveExperimentMetaData();
                    showIntroduction();
                }

            }
        })

    var screenSizeTopRightButton = $('<button>')
        .addClass('screen-size-top-right-button')
        .text('Click here')
        .click(function() {
            if (!topRightButtonClicked) {

                $(this).css('background-color', 'green');
                topRightButtonClicked = true;

                //If the four buttons are clicked
                if (topLeftButtonClicked && 
                    topRightButtonClicked && 
                    bottomLeftButtonClicked && 
                    bottomRightButtonClicked)  {
                    clearTimeout(screenSizeDeadline)
                    $('#mainContainer').empty()
                    saveExperimentMetaData();
                    showIntroduction();
                }

            }
        })

    var screenSizeBottomLeftButton = $('<button>')
        .addClass('screen-size-bottom-left-button')
        .text('Click here')
        .click(function() {
            if (!bottomLeftButtonClicked) {
                $(this).css('background-color', 'green');
                bottomLeftButtonClicked = true;
                //If the four buttons are clicked
                if (topLeftButtonClicked && 
                    topRightButtonClicked && 
                    bottomLeftButtonClicked && 
                    bottomRightButtonClicked)  {
                    clearTimeout(screenSizeDeadline)
                    $('#mainContainer').empty()
                    saveExperimentMetaData();
                    showIntroduction();

                }


            }
        })

    var screenSizeBottomRightButton = $('<button>')
        .addClass('screen-size-bottom-right-button')
        .text('Click here')
        .click(function() {
            if (!bottomRightButtonClicked) {
                $(this).css('background-color', 'green');
                bottomRightButtonClicked = true;
                //If the four buttons are clicked
                if (topLeftButtonClicked && 
                    topRightButtonClicked && 
                    bottomLeftButtonClicked && 
                    bottomRightButtonClicked)  {
                    clearTimeout(screenSizeDeadline)
                    $('#mainContainer').empty()
                    saveExperimentMetaData();
                    showIntroduction();
                
                }


            }
        })

    var bigBigCont = $('<div class = "big-big-container">')
        .append(screenSizeTopLeftButton,
            screenSizeTopRightButton, 
            bigCont,
            screenSizeBottomLeftButton,
            screenSizeBottomRightButton)

    $('#mainContainer').empty().append(bigBigCont).show(); 

    //If participant do not complete the screen size test in 2 mins,
    // they will be redirected to prolific 
    var screenSizeDeadline = setTimeout(function() {
        var urlToRedirect = "https://app.prolific.com/submissions/complete?cc=C1N3M6TU";
        window.location.href = urlToRedirect;
    }, 120000);
}