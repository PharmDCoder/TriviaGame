$(document).ready(function() {

    //making global variables for the game
    var numberCorrect = 0;
    var numberIncorrect = 0;
    var timeRemaining;
    var intervalId;
    var randomQuestion;
    var correctAnswer;
    var correctIndex;
    var remainingQuestionsArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    var randomAnswerArr = [];
    console.log("randomAnswerArr " +randomAnswerArr.length);

    //making game object
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


    console.log("gameone.one.answer is " +game['9'].answer);
    console.log("game.one " +game['9'].question);
    
    //Initializing the start screen
    //hide questions when escher in sphere
    $("#inside-sphere").hide();
    //Adding text content to objects on DOM 
    $("#timer").text(timeRemaining);
    $("#number-correct").text("Correct Answers: " + numberCorrect);
    $("#number-incorrect").text("Incorrect Answers: " + numberIncorrect);
    //setting start game function when user clicks button
    $("#btn").on("click", start);


    function start() {
        $("#inside-sphere").show();
        $("#sphere").attr("src","assets/images/backgroundGameModeIsolated.png");
        $("#btn").attr("status", "reset")
        console.log("button value " +$("#btn").attr("status"));
        trivia();
    }

    function trivia() {
        $("#multipleChoiceList li").prop('disabled', false);
        if (remainingQuestionsArr.length > 0) {
            timeRemaining = 5
            intervalId = setInterval(countDown, 1000);
            getRandomQuestion();
            console.log(game['4'].question)
            $("#question").text(game[randomQuestion].question);
            correctAnswer = game[randomQuestion].answer;
            console.log("game.randomQuestion = " +game[randomQuestion])
            console.log("randomQuestion is type of " +typeof(randomQuestion));
            getRandomAnswer();
            console.log("randomAnswerArr is " + randomAnswerArr);
            $("#a").text(game[randomAnswerArr[0]].answer);
            $("#b").text(game[randomAnswerArr[1]].answer);
            $("#c").text(game[randomAnswerArr[2]].answer);
            $("#d").text(game[randomAnswerArr[3]].answer);
            console.log("game[randomAnswerArr[3]].answer = " +game[randomAnswerArr[3]].answer);
            console.log("value of #a " +$("#a").text());            
        } else {
            alert("Game Over");
        }
        
    }

    function countDown() {
        timeRemaining--;
        $("#timer").text(timeRemaining);
        if (timeRemaining === 0) {
            $("#multipleChoiceList li").prop('disabled', true);
            $("#gif").attr("src", game[randomQuestion].gifSrc);
            numberIncorrect++;
            $("#number-incorrect").text("Incorrect Answers: " + numberIncorrect);
            clearInterval(intervalId);
            $("ol li:nth-child(" +(correctIndex +1) +")").addClass("bg-warning");
            console.log("nth " +$("ol li:nth-child(" +(correctIndex +1) +")").text());
            setTimeout(() => {
                $("ol li:nth-child(" +(correctIndex +1) +")").removeClass("bg-warning");
                $("#gif").attr("src", "");
                trivia();
            }, 5000);
        }
    }

    $('#multipleChoiceList').on('click', 'li', function() {
        console.log("this " +this.innerHTML);
        console.log("correctAnswer " +correctAnswer);
        if (this.innerHTML === correctAnswer) {
            $("#multipleChoiceList li").prop('disabled', true);
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