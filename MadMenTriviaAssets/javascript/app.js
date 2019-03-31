$(document).ready(function () {
    $('.quiz-container').hide();
    $('#previous').hide();
    $('#next').hide();
    $('#submit').hide();
    $('#timeLeft').hide();
});

// click to start then display questions
$("#startbtn").click(function () {
    $('#welcomeScreen').hide();
    $('.quiz-container').show();
    $('#timeLeft').show();
    $('#previous').show();
    $('#next').show();
    $('#submit').show();

    const triviaQuestions = [
        {
            question: "1. What is Don Draper's real name?",
            answers: {
                a: "Dirk Woodward",
                b: "Dick Whitman",
                c: "Dave Workman",
                d: "Don Draper"
            },
            correctAnswer: "b"
        }, {
            question: "2. What year does Mad Men end?",
            answers: {
                a: "1968",
                b: "1969",
                c: "1970",
                d: "1985"
            },
            correctAnswer: "c"
        }, {
            question: "3. Mad Men creator Mathew Weiner was an executive producer and writer for what other award-winning series?",
            answers: {
                a: "The Sopranos",
                b: "The West Wing",
                c: "The Practice",
                d: "ER"
            },
            correctAnswer: "a"
        }, {
            question: "4. Peggy felt ready to ask for her own office after landing an account for what product?",
            answers: {
                a: "Lipstick",
                b: "Cigarettes",
                c: "Popsicles",
                d: "Beer"
            },
            correctAnswer: "c"
        }, {
            question: "5. How many men did Duck Philips kill in Okinawa?",
            answers: {
                a: "0",
                b: "1",
                c: "He didn't serve in WW2.",
                d: "17"
            },
            correctAnswer: "d"
        }, {
            question: "6. What is Salvatore's position at Sterling Cooper?",
            answers: {
                a: "Art Director",
                b: "Account Executive",
                c: "Media Buyer",
                d: "Copywriter"
            },
            correctAnswer: "a"
        }, {
            question: "7. Why does Betty get rejected for the Cola campaign?",
            answers: {
                a: "She's too old.",
                b: "She can't really model.",
                c: "She won't sleep with the exec.",
                d: "Don refused to work for the ad agency."
            },
            correctAnswer: "d"
        }, {
            question: "8. Ken's short story appeared in which publication?",
            answers: {
                a: "Atlantic Monthly",
                b: "The New York Times",
                c: "Pacific Weekly",
                d: "The New Yorker"
            },
            correctAnswer: "a"
        }, {
            question: "9. In season one, Pete returns a wedding gift. What does he buy with the store credit?",
            answers: {
                a: "Golf clubs",
                b: "A rifle",
                c: "A new suit",
                d: "A flask"
            },
            correctAnswer: "b"
        }, {
            question: "10. Who is Roger Sterling with when he has his first heart attack?",
            answers: {
                a: "Betty",
                b: "Joan",
                c: "Pete",
                d: "A random model"
            },
            correctAnswer: "d"
        }

    ]; //end of trivia questions

    //////////////////Create Quiz/////////////////////////////

    function buildQuiz() {
        //place to store HTML output
        const output = [];

        //for each question
        triviaQuestions.forEach((currentQuestion, questionNumber) => {
            //store the list of answer choices
            const answers = [];

            //and each available answer
            for (letter in currentQuestion.answers) {
                //add HTML radio button
                answers.push(
                    `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${currentQuestion.answers[letter]}
                    </label>`
                );
            }

            //add this question and its answers to the output
            output.push(
                `<div class="slide">
                <div class="question"> ${currentQuestion.question}</div>
                <div class="answers"> ${answers.join("")} </div>
                </div>`
            );
        });

        //combine the output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join("");
    } //end of buildQuiz

    /////////////////////////Timer///////////////////////////////////

    //time variables
    var count = 60;
    var intervalId;

    //timer function (interval-solved class solution)
    //when button is clicked, it will trigger the stop or run
    $("#timeLeft").on("click", runTimer);

    function runTimer() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    }

    function decrement() {
        $("#timeLeft").css("background-color", "darkblue");
        $("#timeLeft").css("width", "310px");
        // $("#timeLeft").css("position", "absolute");
        // $("#timeLeft").css("left", "604.6px");
        $("#timeLeft").css("opacity", "0.8");
        $("#timeLeft").css("margin", "40px auto 20px");
        //decrease count by 1
        count--;
        //show timer in tag id
        $("#timeLeft").html("<h1>Time Remaining:</h1> <br> <h2>" + count + "</h2>");

        //once timer hits zero
        if (count === 0) {
            stop();
            alert("Times Up!");
            $('#timeLeft').hide(); //hide timer
            showResults(); //if time runs out, show results
        }
    }
    //clear intervalId
    function stop() {
        clearInterval(intervalId);
    }
    //end of Timer function

    /////////////////////Show Results//////////////////////////////////
    function showResults() {
        $("#results").css("height", "400px");

        //gather answer containers from the quiz
        const answerContainers = quizContainer.querySelectorAll(".answers");

        //keep track of user's answers
        let numCorrect = 0;

        let quesSkipped = 0;

        triviaQuestions.forEach((currentQuestion, questionNumber) => {
            //find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            //if answer is correct
            if (userAnswer === currentQuestion.correctAnswer) {
                //add to the number of correct answers
                numCorrect++;

                //color the answers green
                answerContainers[questionNumber].style.color = '#009DA7';
            }
            else {
                //color the answers red
                answerContainers[questionNumber].style.color = '#de3607';
            }
        });
        //amount of questions
        var quesLength = triviaQuestions.length;
        var quesLengthA = parseInt(quesLength);

        //amount of correct answers
        var correctLength = parseInt(numCorrect);

        //amount missed
        var amountMissed = quesLength - correctLength;

        //show number of correct answers out of total
        $("#pageBreak").html("<hr size='5' color='white'>")
        $("#numberRight").html("<h1 id='correctAnswers'># Correct</h1> <br> <h1 class='score'>You got " + correctLength + " questions correct!</h1><br><br>");
        $("#numberWrong").html("<h1 id='incorrectAnswers'># Incorrect</h1> <br> <h1 class='score'>You missed " + amountMissed + " questions.</h1><br><br>");
        $('#timeLeft').hide();
    } //end of showResults

    //////////////////Slides for Questions////////////////////////
    function showSlide(n) {
        slides[currentSlide].classList.remove("active-slide");
        slides[n].classList.add("active-slide");
        currentSlide = n;

        if (currentSlide === 0) {
            previousButton.style.display = "none";
        } else {
            previousButton.style.display = "inline-block";
        }

        if (currentSlide === slides.length - 1) {
            nextButton.style.display = "none";
            submitButton.style.display = "inline-block";
        } else {
            nextButton.style.display = "inline-block";
            submitButton.style.display = "none";
        }
    }
    //
    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }

    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const submitButton = document.getElementById("submit");

    //play music
    var audio = document.getElementById("myAudio");

    function setHalfVolume() {
        audio.play();
        audio.volume = 0.2;
    }

    function musicEnds(p_audio) {
        audio.muted = true;
    };

    //display quiz and timer
    runTimer();
    buildQuiz();
    setHalfVolume();

    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    showSlide(0);

    //on submit, show results
    submitButton.addEventListener("click", endTrivia);
    function endTrivia() {
        showResults();
        stop();
        $('#timeLeft').hide();
        musicEnds();

    } //timer might end here too
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);

});



 //end of Trivia Game

