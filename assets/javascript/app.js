$(document).ready(function() {

    //making global variables for the game
    var numberCorrect = 0;
    var numberIncorrect = 0;
    var timeRemaining = 10;
    var intervalId;
    var randomQuestion;
    var correctAnswer;
    var correctIndex;
    var remainingQuestionsArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    var randomAnswerArr = [];
    console.log("randomAnswerArr " +randomAnswerArr.length);

    //making game object with 10 questions that each have key:value pairs w/ question, answer, and gif source
    var game = {
        1: {  
            question: "This philosopher was put on trial and found guilty of both corrupting the minds of the youth and of impiety and as a punishment was sentenced to death by drinking poison hemlock",
            answer: "Socrates (470 - 399 BC)",
            gifSrc: "assets/images/socrates.gif"
        },
        2:  {
            question: "Credited as the founder of western philosophy",
            answer: "Plato (428 - 348 BC)",
            gifSrc: "assets/images/plato.gif"
        },
        3:  {
            question:  "Credited with the earliest study of formal logic",
            answer: "Aristotle (384 - 322 BC)",
            gifSrc: "assets/images/aristotle.gif"
        },
        4:  {
            question:  "“I think, therefor I am”",
            answer: "Rene Descartes (1596 - 1650 AD)",
            gifSrc: "assets/images/descartes.gif"
        },
        5:  {
            question: "“The kingdoms without justice is only business of brigandage (the life and practice of highway robbery and plunder)”",
            answer: "St. Augustine (354 - 430 AD)",
            gifSrc: "assets/images/augustine.gif"
        },
        6:  {
            question: "“To one who has faith, no explanation is necessary. To one without faith, no explanation is possible.”",
            answer: "Thomas Aquinas (1225 - 1274 AD)",
            gifSrc: "assets/images/aquinas.gif"
        },
        7:  {
            question: "“The corruption of the best things gives rise to the worst”",
            answer: "David Hume (1711 - 1776 AD)",
            gifSrc: "assets/images/hume.gif"
        },
        8:  {
            question:  "“The Critique of Pure Reason” is one of his most famous works",
            answer: "Immaneul Kant (1724 - 1804 AD)",
            gifSrc: "assets/images/kant.gif"
        },
        9:  {
            question:  "“Love is the expression of the one who loves, not of the one who is loved. Those who think they can love only the people they prefer do not love at all. Love discovers truths about individuals that others cannot see”",
            answer: "Soren Kierkegaard (1813 - 1855 AD)",
            gifSrc: "assets/images/kierkegaard.gif"
        },
        10: {
            question: "“Sometimes people don’t want to hear the truth because they don’t want their illusions destroyed.”",
            answer: "Friedrich Nietzsche (1844 - 1900 AD)",
            gifSrc: "assets/images/nietzsche.gif"
        }
    }

    //call the reset function to initialize the start screen of the game
    reset();

    //this is the on click function for the button.
    //inside the start and reset functions the "status" attribute changes to alternate b/w the 2 states
    $("#btn").on("click", function () {
        if ($("#btn").attr("status") === "start") {
            start();
        } else {
            reset();
        }
    });

    //this function performs when button clicked and status attr = "start"
    function start() {
        //play background music
        $("#soundTrack")[0].play()  
        //display div w/ the question and answers
        $("#inside-sphere").show();
        //change the background image of the game from escher to blank sphere
        $("#sphere").attr("src","assets/images/backgroundGameModeIsolated.png");
        //change the text of button from "start" to "reset"
        $("#btnWords").text("Reset");
        //change status attribute of button to "reset"
        $("#btn").attr("status", "reset")
        //call trivia function which is main function of the game
        trivia();
    }

    //this function resets the game back to start
    function reset() { 
        //initializing variables to start values
        numberCorrect = 0;
        numberIncorrect = 0;
        timeRemaining = 10;
        remainingQuestionsArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
        randomAnswerArr = [];
        //stops the timer
        clearInterval(intervalId);
        //stops the background music
        $("#soundTrack")[0].pause();
        //resets the background music to the beginning  
        $("#soundTrack")[0].load();
        //pauses the video in case the user resets game before it finishes
        document.getElementById("video").pause();
        //resets the video to the beginning
        document.getElementById("video").load();
        //Initializing the start screen
        //hide end game video
        $("#endVideo").hide();
        //hide Q and A's so all you see is escher in sphere
        $("#inside-sphere").hide();
        //hides the gif tv
        $("#tv").hide();
        //shows the div with the hand/ball
        $("#game-center").show();
        //shows the game title div
        $("#title").show();
        //changing status attribute of button so when clicked game will start
        $("#btn").attr("status", "start");
        //shows escher version of
        $("#sphere").attr("src","assets/images/backgroundIsolated.png");
        //Adding text content to objects on DOM 
        $("#titleText").text("Philosophy Trivia");
        $("#timer").text(timeRemaining);
        $("#btnWords").text("Start");
        $("#number-correct").text("Correct Answers: " + numberCorrect);
        $("#number-incorrect").text("Incorrect Answers: " + numberIncorrect);
        //setting start game function when user clicks button
    }

    //this is the trivia function which is the main function of the game
    function trivia() {
        //this allows user to click on multiple choice answers
        $("#multipleChoiceList li").prop('disabled', false);
        //if there are still answers in the remaining questions array:
        if (remainingQuestionsArr.length > 0) {
            //hides gif tv and shows the title and button
            $("#tv").hide();
            $("#title").show();
            $("#btn").show();
            //resets time left to 10
            timeRemaining = 10;
            //starts the countdown of time by calling countdown function to happen every second
            intervalId = setInterval(countDown, 1000);
            //calls function to get the random question
            getRandomQuestion();
            //displays question to DOM
            $("#question").text(game[randomQuestion].question);
            //sets the correct answer of the random question to the correctAnswer variable 
            correctAnswer = game[randomQuestion].answer;
            //calls get random answer function to pick array of 4 answers - one correct the others incorrect & randomize order
            getRandomAnswer();
            //displays answers A-D to DOM
            $("#a").text(game[randomAnswerArr[0]].answer);
            $("#b").text(game[randomAnswerArr[1]].answer);
            $("#c").text(game[randomAnswerArr[2]].answer);
            $("#d").text(game[randomAnswerArr[3]].answer);
        //else the array is empty so the game is over
        } else {

            //stops the music
            $("#soundTrack")[0].pause();
            //plays end of game video  
            document.getElementById("video").play();
            //setting up DOM to show end of game video, title, and games stats and hide everything else
            $("#tv").hide();
            $("#btn").show();
            $("#title").show();
            $("#endVideo").show();
            $("#game-center").hide();
            //changes title from Philosophy Trivia to Game Over
            $("#titleText").text("Game Over");
        }
        
    }

    //function to countdown time and mark question incomplete if time runs down to 0
    function countDown() {
        //subtract time by 1 (second)
        timeRemaining--;
        //adding current time to DOM
        $("#timer").text(timeRemaining);
        //if time runs out
        if (timeRemaining === 0) {
            //don't allow user to click on answer after time's up
            $("#multipleChoiceList li").prop('disabled', true);
            //changing display to show gif tv and hide title and button
            $("#tv").show();
            $("#title").hide();
            $("#btn").hide();
            //changes source of gif to correct answer from game object
            $("#gif").attr("src", game[randomQuestion].gifSrc);
            //add 1 to incorrect answers
            numberIncorrect++;
            //display new number of incorrect answers
            $("#number-incorrect").text("Incorrect Answers: " + numberIncorrect);
            //stop timer
            clearInterval(intervalId);
            //highlights the correct answer
            $("ol li:nth-child(" +(correctIndex +1) +")").addClass("bg-warning");
            //time out function that after gif plays
            setTimeout(() => {
                //unhighlight correct answer
                $("ol li:nth-child(" +(correctIndex +1) +")").removeClass("bg-warning");
                //empty the gif source
                $("#gif").attr("src", "");
                //call the trivia function
                trivia();
            }, 5000);
        }
    }

    //onclick event if user picks a list from A-D of answers
    $('#multipleChoiceList').on('click', 'li', function() {
        //If the answer clicked equals correct answer:
        if (this.innerHTML === correctAnswer) {
            //doesn't allow user to click on any other answer choices
            $("#multipleChoiceList li").prop('disabled', true);
            //DOM shows tv, hides button and title
            $("#tv").show();
            $("#title").hide();
            $("#btn").hide();
            $("#gif").attr("src", game[randomQuestion].gifSrc);
            clearInterval(intervalId);
            numberCorrect++;
            $("#number-correct").text("Correct Answers: " + numberCorrect);
            $(this).addClass("text-success font-weight-bold");
            setTimeout(() => {
                $(this).removeClass("text-success font-weight-bold");
                $("#gif").attr("src", "");
                trivia();
            }, 5000);
        } else {
            $("#multipleChoiceList li").prop('disabled', true);
            $("#tv").show();
            $("#title").hide();
            $("#btn").hide();
            $("#gif").attr("src", game[randomQuestion].gifSrc);
            clearInterval(intervalId);
            numberIncorrect++;
            $("#number-incorrect").text("Incorrect Answers: " + numberIncorrect);
            $(this).addClass("text-danger font-weight-bold");
            $("ol li:nth-child(" +(correctIndex +1) +")").addClass("bg-warning");
            setTimeout(() => {
                $(this).removeClass("text-danger font-weight-bold");
                $("ol li:nth-child(" +(correctIndex +1) +")").removeClass("bg-warning");
                $("#gif").attr("src", "");
                trivia();
            }, 5000);
        }
    });

    function getRandomQuestion() {
        randomQuestion = remainingQuestionsArr[Math.floor(Math.random()*remainingQuestionsArr.length)];
        console.log("random Question = " +randomQuestion);
        for( var i = 0; i < remainingQuestionsArr.length; i++){ 
            if ( remainingQuestionsArr[i] === randomQuestion) {
                remainingQuestionsArr.splice(i, 1); 
            }
         }
         console.log("remainingQuestionsArr = " +remainingQuestionsArr);
         console.log("randomQuestion is a " +typeof(randomQuestion));
    }

    function getRandomAnswer() {
        var answerArr = [randomQuestion];
        console.log("answerArr = " +answerArr);
        for( var i = 0; answerArr.length < 4; i++){ 
            var randomAnswer = Math.floor(Math.random() * 10) +1; 
            if (randomAnswer !=answerArr[0] && randomAnswer !=answerArr[1] && randomAnswer !=answerArr[2]) {
                answerArr.push(randomAnswer); 
            }
         }
         console.log("answerArr = " +answerArr)
        randomAnswerArr = shuffle(answerArr);   
        correctIndex = findIndex();
        console.log("correct index " +correctIndex);        
    }

    function findIndex() {
        for (let index = 0; index < randomAnswerArr.length; index++) {
            if (randomQuestion === randomAnswerArr[index]) {
                return index;
            }
        }
    };

    function shuffle (array) {

        var currentIndex = array.length;
        var temporaryValue, randomIndex;
    
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
    
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
    
        return array;
    
    };
    // function stop() {
    
    //     // DONE: Use clearInterval to stop the count here and set the clock to not be running.
    //     clearInterval(intervalId);
    //     clockRunning = false;
    // }
    
    
    // function reset() {
    //     time = 20;
    //     // DONE: Change the "display" div to "00:00."
    //     $("#display").text("20");
    // }

});