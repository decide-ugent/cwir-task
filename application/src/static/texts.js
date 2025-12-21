
//In this file I define all the texts that show up in the experiment

const consent_form_information = {    
    introduction: {
        heading: "Introduction",
	      paragraph1: "Ghent University supports the practice of protecting human participants in research. This form provides you with important information about taking part in this study, <i>Ghent's gamble</i>.",
        paragraph2: "Your participation in this study is entirely voluntary, and you have the right to withdraw at any time without penalty or negative consequences. If you choose to withdraw, any data collected from you will be deleted and not included in the final analysis, unless you accept a partial compensation for your data (detailed in the section <i>Compensation</i>).",
    },
    summary: {
        heading: "Summary",
        paragraph1: "The purpose of this study is to investigate how humans perceive time while gambling.",
        paragraph2: "During the experiment you will be playing a simple game where you will have to choose between different lotteries to earn as many points as possible. Before playing, you will read instructions and play some practice rounds.",
        paragraph3: "<strong>The study must be completed in full-screen mode on a laptop or a desktop computer, "+
                    "with a screen that is at least 17cm high and 20cm long</strong>.",
        paragraph4: "<strong>The study will take approximately 1 hour and 40 minutes to complete, "+
                    "including four 5-minute breaks</strong>."
      
    },
    risks: {
        heading: "Risks",
        paragraph1: "This experiment may be harmful for individuals suffering from gambling addiction. Please, <strong>do not participate in this study if you are suffering from gambling addiction or you believe you may be susceptible to it</strong>."

    },
    dataInfo: {
        heading:"Data collection and confidentiality",
        paragraph1: "During this study, we will collect Gameplay data, Questionnaire responses and Demographics (sex and age).", 
        paragraph2: "<strong>All demographic data will be collected in a pseudonymous manner, using your Prolific ID. No personally identifiable information, such as your name or any details that could reveal your identity, will be collected.</strong>",
        paragraph3: "The data collected will be processed and analysed, and the results might be published in a scientific journal or conference paper. If published, you will be able to see the results on the website of <u>ChronoPilot</u>, the European project that has funded this study.",
        paragraph4: "All the data will be securely stored in the IT and storage services provided by Ghent University. In addition, after the publication of the results, all the data and metadata, as well as the necessary scripts to process it, will be deposited in the <i>Zenodo</i> repository with an appropriate structure, format, and guidelines to adhere to the FAIR principles (guaranteed Findability, Accessibility, Interoperability and Reusability of datasets).",
        paragraph5: "Importantly, we will not publish or deposit in <i>Zenodo</i> your Prolific ID. All the Prolific IDs will be removed from Ghent's University repository after we have processed the data and we are sure that all participants have received their corresponding compensation.",
        paragraph6: "<strong>If your submission is rejected, all your data will be automatically deleted (it will not be use for any analysis). If you return your submission, your data will also be deleted and not analysed unless you receive a partial compensation (as detailed in the next section).</strong>"
    },
    compensation: {
        heading:"Compensation",
        point1: "For your valuable time and dedication, we're pleased to offer you a <strong>"+
                "base compensation of £15</strong>.", 
        point2: "Additionally, you have the opportunity to earn a "+
                "<strong>performance bonus ranging from £0 to £4</strong>, "+
                "depending on the number of points (known as <i>Ghentian</i> dollars in the game) you collect during the gambles. "+
                "Specifically, you'll receive a <strong>bonus of £1 if you collect between 200 and 300 Ghentian dollars, "+
                "£2 if you collect between 300 and 400 Ghentian dollars, "+
                "£3 if you collect between 400 and 500 Ghentian dollars, "+
                "and £4 if you collect more than 500 Ghentian dollars</strong>.",
        point3: "At the beginning of the study, you will read instructions and complete "+
                "four <u>comprehension checks</u> "+
                "to assess your understanding of the explanations. "+
                "If you encounter a <u>comprehension check</u> and you are unsure about the correct answer, "+
                "you are encouraged to revisit the instructions before proceeding with your answer.",
        point4: "<strong>Please be aware that if you fail a <u>comprehension check</u> more than twice "+
                "you will be automatically redirected to Prolific's platform, "+
                "and you will be asked to return your submission in accordance with Prolific's policy. "+
                "If you return your submission, you will not receive a compensation.</strong>",
        point5: "The study will be divided into 5 blocks with 32 experiment rounds each. "+
                "Following the completion of each block, "+
                "<strong>you are entitled to a break of up to 5 minutes </strong>. "+
                "During the break, "+
                "simply <strong>ensure that you click the designated button to progress to the next block "+
                "within the 5-minute timeframe</strong>. "+
                "Failure to do so will result in automatic redirection to Prolific's platform, "+
                "where you will be asked to return your submission.",
        point6: "Please be aware that you are not allowed to take breaks during the questionnaires and "+
                "experiment rounds. You can only take breaks during the designated resting times after each block. "+
                "If we detect inactivity for a long time (more than 5 minutes), you will be automatically "+
                "redirected to Prolific's platform and asked to return your submission.",
        point7: "During the experiment you will also complete two randomly allocated <u>attention checks</u>. "+
                "These questions are very easy, do not require any prior knowledge, "+
                "and are designed solely to assess whether you are paying attention or not.",
        point8: "<strong>Please be aware that if you fail both <u>attention checks</u>, "+
                "your submission will be rejected and you will not receive any compensation, "+
                "in accordance with Prolific's policy.</strong>",
        point9: "The study must be completed in full-screen mode and you cannot switch screens. "+
                "Every time you exit the full-screen mode or switch screens you will be warned to return to full-screen mode and to not switch screens. "+
                "If you are warned more than three times to return to full-screen mode and to not switch screens, "+
                "you will be automatically redirected to Prolific's platform and asked to return your submission.",
        point10: "Finally, please note that if your participation was clearly negligible, "+
                "your submission will be rejected and your compensation will be denied. "+
                "In particular, if you completed the study extremely fast "+
                "(more than three standard deviations below the mean) "+
                "and if you input random characters in your answers to the questionnaires."
    },
    contactInformation: {
        heading:"Contact information",
        paragraph1:"If you have any questions, concerns, or feedback related to this study, please, feel free to contact: ",
        name: "Alvaro Garrido Perez",
        email: "alvaro.garridoperez@ugent.be"
    },
    statementOfConsent: {
        heading: "Statement of consent",
        paragraph1: "I confirm that:",
        point1: "I have read and understood the information provided in this consent form.",
        point2: "I have had the opportunity to ask questions and have received satisfactory answers.",
        point3: "I voluntarily agree to participate in the study: <i>Ghent's gamble</i>.",
        point4: "I understand that I can withdraw from the study at any time without penalty or negative consequences."
    }
}


const questions = {
  question1: {
    text: "Please estimate the duration of the experiment round you just completed "+
          "(from the moment you pressed START until the questionnaire appeared). "+
          "Type your answer in seconds.",
  },
  question2: {
    text: "Please indicate how confident you are of the above time estimation.",
    answerOptions: ["Very unsure", "Unsure", "Medium", "Confident", "Very confident"],
  },
  question3: {
    text: "Please indicate your perceived level of difficulty of the experiment round you just completed.",
    answerOptions: ["Very easy", "Easy", "Medium", "Hard", "Very hard"],
  },

};

const questionnaire_class_1 = {
  text: "Please indicate how difficult it was to choose a lottery in the experiment round you just completed.",
  answerOptions: ["Very easy", "Easy", "Medium", "Hard", "Very hard"],
}

const quiz_questions = {
  quiz1: {
    heading: "Comprehension check 1/4",
    question: "Imagine that you choose the <strong>Left lottery</strong> in the example shown in the image below. "+
              "Imagine as well that this lottery is drawn from the <i>bag of selected lotteries</i> "+
              "at the end of the experiment. "+
              "If you play the lottery, what is the probability of earning Ghentian dollars? "+
              "And how many Ghentian dollars could you potentially earn?",
    paragraph: "<strong>If you are not sure about the answer, "+
              "you can read the instructions again by clicking on <i>Back</i> "+
              "and return to this comprehension check afterwards.</strong>",
    answerOptions: ["I could earn 40 Ghentian dollars with a probability of 60%", 
                    "I could earn 60 Ghentian dollars with a probability of 40%", 
                    "I could earn 80 Ghentian dollars with a probability of 20%", 
                    "I could earn 20 Ghentian dollars with a probability of 80%"]
  },

  quiz2: {
    heading: "Comprehension check 2/4",
    question: "Imagine that you choose the <strong>Right lottery</strong> in the example shown in the image below. "+
              "Imagine as well that this lottery is drawn from the <i>bag of selected lotteries</i> "+
              "at the end of the experiment. "+
              "If you play the lottery, what is the probability of getting 0 Ghentian dollars?",
    paragraph: "<strong>If you are not sure about the answer, "+
              "you can read the instructions again by clicking on <i>Back</i> "+
              "and return to this comprehension check afterwards.</strong>",
    answerOptions: ["60%", "70%", "30%", "40%"]
  },
  quiz3: {
    heading: "Comprehension check 3/4",
    question: "<strong>For a given round, if you have not selected a lottery before the deadline, then</strong>: ",
    paragraph: "<strong>If you are not sure about the answer, "+
              "you can read the instructions again by clicking on <i>Back</i> "+
              "and return to this comprehension check afterwards.</strong>",
    answerOptions: ["You can still pick a lottery in that round. "+
                    "However, if that lottery is one of the 8 selected lotteries at the end of the experiment, "+
                    "you will only obtain half of the lottery's outcome that you would have obtained, "+
                    "had you not missed the deadline",
                    "You cannot pick a lottery in that round", 
                    "You can still pick a lottery in that round and there are no consequences for missing the deadline"]
  },

  quiz4: {
    heading: "Comprehension check 4/4",
    question: "<strong>What time interval should you reproduce after each round?</strong>",
    paragraph: "<strong>If you are not sure about the answer, "+
              "you can read the instructions again by clicking on <i>Back</i> "+
              "and return to this comprehension check afterwards.</strong>",
    answerOptions: ["Regardless of whether I miss the deadline or not, "+
                    "from the moment the lotteries appear "+
                    "until the moment I choose a lottery (which is equal to the <i>decision time</i>)",
                    "Regardless of whether I miss the deadline or not, "+
                    "the amount of time that the lotteries were displayed. "+
                    "If I don't miss the deadline, then it will be equal to "+
                    "<i>decision time</i> + <i>waiting time</i>. "+
                    "If I miss the deadline, then it will only be equal to the <i>decision time</i>", 
                    "Regardless of whether I miss the deadline or not, "+
                    "from the moment I choose a lottery "+
                    "until the moment the lotteries disappear (which is equal to the <i>waiting time</i>)",
                    "Regardless of whether I miss the deadline or not, "+
                    "from the moment the lotteries appear until the moment the black cross disappears"]
  }
};

const explanations = {
  explanation1: {
    heading: "Instructions 1/6: The game",
    paragraph1: "<i>Ghent's gamble</i> is a straightforward game! "+
                "Your main goal is to earn as many <i>Ghentian dollars</i> ($) as possible. ",
    paragraph2: "Before starting each experiment round, "+
                "you will be presented with a big pink rectangle as shown in the image below. "+
                "To start the round you must click on the <i>START</i> button "+
                "that you will find at the bottom. ",
    paragraph3:"You can start each round when you feel ready, "+
                "but it should not take you more than 1 minute to start. "+
                "You will be able to take longer rests after finishing each experiment block.",
    paragraph4: "Right after clicking <i>START</i>, "+
                "two lotteries will appear at the top corners of the pink rectangle. "+ 
                "Each lottery may give you an outcome (a number of Ghentian dollars) or nothing, "+
                "with a certain probability. "+
                "For example, in the image below, playing the left lottery can either result in 100$, "+ 
                "with a probability of 30%, or nothing with a probability of 70%.",
    paragraph5: "To select a lottery, you simply need to click on the corresponding button. "+
                "After selecting a lottery, its border will become red, as shown in the image below. "+
                "Note that <strong>you can only select one lottery per experiment round</strong>.",
    paragraph6: "Both the outcomes and probabilities will always be "+
                "whole numbers ranging from 1 to 100."
 },

  explanation2: {
    heading: "Instructions 2/6: The performance bonus 💰",
    paragraph1: "When you select a lottery, you will not immediately play it "+
                "(i.e. you will not obtain Ghentian dollars as soon as you click on the lottery). "+
                "Instead, the lottery will be added to the <i>bag of selected lotteries</i>, "+
                "which at the end of the experiment, "+
                "will contain all the lotteries you selected throughout the experiment rounds.",
    paragraph2: "At the end of the experiment, "+
                "you will draw eight random lotteries from the <i>bag of selected lotteries</i>. "+
                "Next, you will play the eight lotteries, "+
                "and the total amount of Ghentian dollars that you collect from "+
                "these, will determine your performance bonus. Specifically, getting:",           

    point1: "200$-300$ correspond to a bonus of £1",
    point2: "300$-400$ correspond to a bonus of £2",
    point3: "400$-500$ correspond to a bonus of £3",
    point4: "More than 500$ correspond to a bonus of £4",
    
    paragraph3: "Note that <strong>choosing the best possible lottery in each round, " +
                "will increase your chances of earning a high performance bonus</strong> "+
                "at the end of the experiment, "+
                "when eight lotteries are drawn from the <i>bag of selected lotteries</i>. "
    
  },
  explanation3: {
    heading: "Instructions 3/6: The round deadline ⏰",
    paragraph1: "<strong>Each round has a deadline</strong>. Keep in mind that: ",
    point1: "In every round, if you have not selected a lottery before the deadline, "+
            "you will still have a chance to choose one. "+
            "However, if that lottery is one of the eight drawn from the "+
            "<i>bag of selected lotteries</i> at the end of the experiment, "+
            "you will only obtain half of the lottery's outcome that you would have received, "+
            "had you not missed the deadline.",
    point2: "In every round, <strong>you will not be informed of when the deadline will be</strong>, "+
            "<strong>and the deadlines will randomly change from round to round</strong>.",
    point3: "Once the deadline is reached, the lotteries will disappear. "+
            "However, if no lottery was selected before the deadline, "+
            "the round will continue until you pick one of the two lotteries.",
    //point4: "If you missed a deadline, you will be informed after the round finishes."
      
    },

  explanation4: {
    heading: "Instructions 4/6: The timing task ⏳",
    paragraph1:"After every experiment round, you will have to reproduce the duration of the round you just completed.",
    paragraph2: "The duration of each round goes from the moment you see the lotteries appear, "+
                "until they disappear from the screen. "+
               "After the lotteries disappear, "+
               "a black cross will be displayed at the center of the screen as shown in the image below, "+
               "signalling the end of the round.",
    paragraph3: "How will you reproduce the time duration of the round? ",
    paragraph4: "Shortly after the end of the round, the black cross will disappear, "+
               "and a black circle will appear at the same position, as shown in the image below. ",
    paragraph5:"The appearance of the black circle will mark the start of the round duration reproduction.",

    paragraph6:"When you think the black circle has been displayed for the same amount of time "+
              "as the duration of the round, "+
              "you should press <strong>space bar</strong>, marking the end of the reproduction.",
    paragraph7: "Note that while the black circle is displayed, you are recording the time duration of the round.",
    paragraph8: "Please note that: ",
    point1: "<strong> You should not use any devices or clocks to track time, "+
            "we are only interested in your subjective perception of time</strong>.",
    point2: "<strong>You should avoid counting in your head or "+
            "using rhythmic body movements to estimate or reproduce time durations</strong>.",
    point3: "Focus your attention on selecting the Lottery that is most beneficial. ",
    point4: "<strong>The round's durations (i.e. the deadlines) will change randomly from round to round. </strong>"

  },
  explanation5: {
    heading: "Instructions 5/6: What if I miss the deadline? What duration should I reproduce?" ,
    paragraph1: "If you miss the deadline "+
      "(meaning you haven't chosen a lottery before the deadline), "+
      "the lotteries will remain displayed until you make a choice, "+
      "after which they will disappear.",
    paragraph2: "Therefore, if you miss the deadline there will be no waiting time. "+
      "However, you should still reproduce the amount of time "+
      "that the lotteries were displayed, which in this case, "+
      "coincides with the time it took you to make a choice.",
    paragraph3: "Remember, <strong>regardless of whether you miss the deadline or not, "+
      "you should always reproduce the amount of time that the lotteries were displayed</strong>. "

  
  },
  explanation6: {
    heading: "Instructions 6/6: Number of rounds",
    //paragraph1:"The study will be divided into <strong>5 blocks</strong>, "+
    //          "<strong>each consisting of 32 experimental rounds</strong>.",
    //paragraph2:"After each block, you will have a rest of at least 2 minutes and up to 5 minutes "+
    //           "before the next block begins."
    paragraph1:"The study will be divided into <strong>2 blocks</strong>, "+
              "<strong>each consisting of 32 experimental rounds</strong>.",
    paragraph2:"After the first block, you will have a rest of at least 2 minutes and up to 5 minutes "+
               "before the next block begins."
  },
  timing_instructions: {
    heading:"Reproduce the correct time interval!",
    text1:"Note that the time interval to be reproduced (i.e., the round duration) includes both "+
          "the time it took you to choose a lottery (i.e., the <i>decision time</i>), "+
          "and the time you had to wait after making your choice until the lotteries disappeared "+
          "(i.e., the <i>waiting time</i>) ", 
    text2: "The time interval to be reproduced starts from the moment the lotteries appear (after pressing START) "+
            "and ends when the lotteries disappear (i.e., <i>decision time</i> + <i>waiting time</i>)",
    text3: "<strong>If you miss the deadline</strong>, there will be no <i>waiting time</i>: "+
      "the lotteries will disappear immediately after you make a choice. "+
      "However, you should still reproduce the amount of time "+
      "that the lotteries were displayed, which in that case, "+
      "coincides with the time it took you to make a choice.",
    text4: "Remember, <strong>regardless of whether you miss the deadline or not, "+
      "you should always reproduce the amount of time that the lotteries were displayed</strong>."
  }
};

const instructions_completed = {
  
    heading: "Let's do some practice rounds!",
    paragraph1: "You have completed the first instruction phase sucessfully. "+
                "You will now play 6 practice rounds and complete the last comprehension check. "+
                "After that, you will be ready to start!",
    paragraph2: "Please note that the lotteries that you select in the practice rounds will not be "+
      "added to the <i>bag of selected lotteries</i>, "+
      "so the choices you make in these rounds will not affect your performance bonus."

}

var attention_check_list = [];

attention_check_list.push({
        paragraph: "The test you are about to take part in is very simple. "+
        "When asked which is Alice's favourite colour, you must select 'Orange'. This is an attention check.",
        question: "Based on the text you read above, which is Alice's favourite colour?",
        answerOptions: ["Purple", "Green", "Orange", "Yellow","Black"]
    });

attention_check_list.push({
        paragraph: "The test you are about to take part in is very simple. "+
        "When asked which drink does Bob have in his kitchen, you must select 'Wine'. This is an attention check.",
        question: "Based on the text you read above, which drink does Bob have in his kitchen?",
        answerOptions: ["Beer", "Coca Cola", "Apple juice", "Wine","Tequila"]
    });

const block_end_questions = {
    question1: {
    text: "Please estimate the duration of the block of experiment rounds that you just completed "+
          "(i.e. the last 32 experiment rounds, including the questionnaires). Type your answer in minutes.",
  },
  question2: {
    text: "Please indicate how confident you are of the above time estimation.",
    answerOptions: ["Very unsure", "Unsure", "Medium", "Confident", "Very confident"],
  },
  question3: {
    text: "Please indicate how bored or entertained you were while playing during the block that you just completed.",
    answerOptions: ["Very bored", "Bored", "Neutral", "Entertained", "Very entertained"],
  },
}

const final_questions = {
   
  question1: {
    text: "Please indicate how often did you count in your head to estimate time.",
    answerOptions: ["Never", "A couple of rounds", "Many rounds", "Most rounds"],
  },

  question2: {
    text: "Did you lose focus at some point during the experiment? "+
    "If so, please describe approximately when you lost focus (e.g., after completing the first block of experiment rounds). Do not worry, your answer will not affect your compensation for participating in this study.",
  },

  question3: {
    text: "Please, indicate how difficult it was to understand the instructions.",
    answerOptions: ["Very easy", "Easy", "Medium", "Hard", "Very hard"]
  },

  question4: {
    text: "Feel free to give us any feedback! This question is not mandatory, you can leave it blank if you want.",
  }
};

const get_bonus = {
  heading: "🎰 Time to earn your bonus! 🎰",
  paragraph1: "Click on <i>SPIN</i> inside the golden box, "+
  "to draw eight random lotteries from the <i>bag of selected lotteries</i>. "+
  "The eight selected lotteries will appear on the green box below the golden one. "+ 
  "Click on the lotteries to play them and collect Ghentian dollars!"

}

const get_practice_bonus = {
  heading: " 🎰 Time to play the lotteries! 🎰",
  paragraph1: "Click on <i>SPIN</i> inside the golden box, "+
    "to draw two random lotteries from the <i>bag of selected lotteries</i>. ",
  paragraph2: "Since this is the practice phase, "+
    "you will only draw two random lotteries instead of eight "+
    "(which will be the case for the real experiment rounds). "+
    "The two lotteries will appear in the green box below. ",
  paragraph3: "Click on the selected lotteries below, to play them and collect Ghentian dollars! "+
    "Please note that <strong> the Ghentian dollars that you collect now, do not count "+
    "towards your performance bonus since this is the practice phase</strong>."
}

const bonus_feedback = {
  heading: "PERFORMANCE BONUS",
  paragraph1: "Click on <i>Next</i> to complete the final questionnaire. "+
    "After that you will receive the Completion Code!"
}

const intro = {

    text1: "You are about to participate in a study funded by <u>ChronoPilot</u>, "+
      "a European Union research project that aims to control the plasticity of human time perception.",
    text2: "If published, the results of this study will be found on ChronoPilot's website. "+
    "We encourage you to visit it in a future! 😊",
    text3: "Our goal is to investigate how humans perceive time while making risky decisions. "+
      "Hence, during the experiment you will be playing a gambling game. But before starting, "+
      "you will read instructions and play a couple of practice rounds, "+
      "so get ready and click on <i>Continue</i>!"
}
