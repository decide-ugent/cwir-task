function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    while (currentIndex != 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}

function showMissedDeadlineWarning(practice) {

    var missedDeadlineWarningHeading = $('<h1 class = red-missed-deadline-warning-text>'+
        'You missed the deadline!</h1>');

    var missedDeadlineWarningButton = $('<button class="missed-deadline-button">')
        .text('Ok')
        .click(function() {

            missedDeadlineMessageShown = false;
            //Enable button again
            $('.submit-answers-button').prop('disabled', false); 
            $('#missedDeadlineWarningMessage').empty().hide();
        })

    if (practice) {

        var missedDeadlineText1 = $("<p class = missed-deadline-warning-text>"+
            "You were too slow deciding and you missed the deadline. " +
            "That means that if the lottery that you just chose is drawn from the " +
            "<i>bag of selected lotteries</i> at the end of the practice session, "+
            "you will only earn half of the lottery's resulting outcome.</p>")

        var missedDeadlineText2 = $("<p class = missed-deadline-warning-text>"+
            "But don't worry! Since this is the practice session, " +
            "all the points that you earn now, will not count towards your bonus. "+
            "Click on <i>Ok</i> to close this warning and to proceed.</p>")
     
    } else {

        var missedDeadlineText1 = $("<p class = missed-deadline-warning-text> "+
            "You were too slow deciding and you missed the deadline. " +
            "That means that if the lottery that you just chose is drawn from the "+
            "<i>bag of selected lotteries</i> at then end of the game, "+
            "you will only earn half of the lottery's resulting outcome.</p>")

        var missedDeadlineText2 = $("<p class = missed-deadline-warning-text>"+
            "Click on <i>Ok</i> to close this warning and to proceed.</p>")
    }

    missedDeadlineMessageShown = true;
    
    //Dissable buttons
    $('.submit-answers-button').prop('disabled', true); 

    $('#missedDeadlineWarningMessage')
        .empty()
        .append(missedDeadlineWarningHeading,
            missedDeadlineText1,
            missedDeadlineText2,
            missedDeadlineWarningButton)
        .show()
}

function getRandomElementsFromArray(arr, numElements) {
   
    const shuffledArray = arr.slice();
    let currentIndex = shuffledArray.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        temporaryValue = shuffledArray[currentIndex];
        shuffledArray[currentIndex] = shuffledArray[randomIndex];
        shuffledArray[randomIndex] = temporaryValue;
    }

    return shuffledArray.slice(0, numElements);
}

function generateRandom(min, max) {

    let difference = max - min;
    let rand = Math.random();
    rand = Math.floor( rand * difference);
    rand = rand + min;
    return rand;
}

function generateArrayFrom1ToN(N) {
    const resultArray = [];
    for (let i = 1; i <= N; i++) {
        resultArray.push(i);
    }
    return resultArray;
}

function generateNonContiguousNumbers(n, N) {
    if (n > N - 2) {
        throw new Error("n should be less than or equal to N - 2");
    }
    // Generate array [2, 3, ..., N-1]
    const allNumbers = Array.from({length: N - 2}, (_, index) => index + 2); 
    
    const result = [];
    
    while (result.length < n) {
        const randomIndex = Math.floor(Math.random() * allNumbers.length);
        const selectedNumber = allNumbers[randomIndex];
        
        if (
            !result.includes(selectedNumber) && // Check if already selected
            (result.length === 0 || Math.abs(selectedNumber - result[result.length - 1]) > 1) // Check for non-contiguity
        ) {
            result.push(selectedNumber);
        }
    }
    
    return result.sort((a, b) => a - b); // Sort the result in ascending order
}

function generateRandomNumbers(count, min = 0.25, max = 1) {
    let numbers = [];
    for (let i = 0; i < count; i++) {
      // Generate a random number between min and max
      let randomNumber = min + (max - min) * Math.random();
      numbers.push(randomNumber);
    }
    return numbers;
}