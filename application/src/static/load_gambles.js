/**
 * This script is used to load gamble data from CSV files and process them.
 */


function loadGambles() {
    /**
    * Function to load the gambles from gambles folder
    */

    //Get practice gambles
    fetch('static/gambles/practice_gambles.csv')
        .then(response => response.text())
        .then(csvData => {
            Papa.parse(csvData, {
                header: true,
                dynamicTyping: true,
                complete: processPracticeGambles
            });
        })
        .catch(error => {
            console.error('Error loading practice gambles:', error);
        });

    //Get gambles
    fetch('static/gambles/gambles.csv')
        .then(response => response.text())
        .then(csvData => {
            Papa.parse(csvData, {
                header: true,
                dynamicTyping: true,
                complete: processGambles
            });
        })
        .catch(error => {
            console.error('Error loading gambles:', error);
        });

}


function processGambles(results) {
    var data = results.data;
    // Iterate over each row of the CSV data
    data.forEach(function(row) {

        arrayValues = [row["lot_0_val"],
                        row["lot_1_val"]]
        
        gamblesValues.push(arrayValues)

        arrayPercentages = [row["lot_0_prob"],
                             row["lot_1_prob"]]
        
        gamblesPercentages.push(arrayPercentages)

        gamblesDeadlines.push(row["Deadline"])

    });


    //Compute max deadline
    maxDeadline = 10//Math.max(...gamblesDeadlines)
        

    totalRounds = gamblesDeadlines.length - 1

    preReproTaskInterval = generateRandomNumbers(totalRounds, min = 0.6, max = 1)

    //console.log("preReproTaskInterval",preReproTaskInterval)

    //Generate random presentation of gambles
    const order = []
    for (let i = 0; i < totalRounds; i++) {
        order.push(i);
    }

    gamblesPresentationOrder = shuffle(order);


    for (let i = 0; i < totalRounds; i++) {
        const row = Math.random() < 0.5 ? [0, 1] : [1, 0];
        const roundDict = {
            Left: row[0],
            Right: row[1]
        };
        lotteriesPresentationOrder.push(roundDict);
    }

    // Determine the starting block rounds and when attention checks will happen

    rounds_starting_block = [parseInt(totalRounds/5)+1, 
                             parseInt(2*totalRounds/5)+1,
                             parseInt(3*totalRounds/5)+1,
                             parseInt(4*totalRounds/5)+1];

    attention_checks.push(generateRandom(rounds_starting_block[0]+1, rounds_starting_block[1]-2))
    attention_checks.push(generateRandom(rounds_starting_block[2]+1, rounds_starting_block[3]-2))


    attention_check_info.push(attention_checks[0],attention_checks[1])

    console.log("Total number of rounds",totalRounds)
    console.log("Attention checks at :",attention_check_info)
    console.log("The gamble presentation order is: ", gamblesPresentationOrder)
    console.log("The lotteries presentation order is ", lotteriesPresentationOrder)
    console.log("Gamble data downloaded and processed successfully");
}

 
function processPracticeGambles(array) {
    /**
    * Function to process practice gambles
    */

    var data = array.data;
    
    // Iterate over each row of the CSV array
    data.forEach(function(row) {
       
        arrayValues = [row["lot_0_val"],
                        row["lot_1_val"]]
        
        practiceGamblesValues.push(arrayValues)

        arrayPercentages = [row["lot_0_prob"],
                             row["lot_1_prob"]]
        
        practiceGamblesPercentages.push(arrayPercentages)

        practiceGamblesDeadlines.push(row["Deadline"])


    });

    totalPracticeRounds = practiceGamblesDeadlines.length-1

    preReproTaskIntervalPractice = generateRandomNumbers(totalPracticeRounds, min = 0.6, max = 1)

    //console.log("preReproTaskIntervalPractice",preReproTaskIntervalPractice)
  
    console.log("Practice gambles downloaded and processed successfully");
}


