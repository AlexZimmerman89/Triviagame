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
            question: "What is Kimmy's signature dance move called?",
            answers: {
                a: "Gibbler Gallop",
                b: "Gibbler Gump",
                c: "Gibbler Golosh",
                d: "Gibbler Glitz"
            },
            correctAnswer: "a"
        }, {
            question: "What epic 39th birthday present did Steve get DJ?",
            answers: {
                a: "Amusement park passes",
                b: "Hello Kitty Land",
                c: "A trip to Tokyo",
                d: "Tickets to New Kids on the Block"
            },
            correctAnswer: "d"
        }, {
            question: "What kind of doctor is Steve?",
            answers: {
                a: "Veterinarian",
                b: "Podiatrist",
                c: "Dentist",
                d: "Pediatrician"
            },
            correctAnswer: "b"
        }, {
            question: "Who had their first kiss on the Fuller House show?",
            answers: {
                a: "Max",
                b: "Ramona",
                c: "Jackson",
                d: "Alex"
            },
            correctAnswer: "c"
        }, {
            question: "What are DJ's three kid's names?",
            answers: {
                a: "Ramona, Max, Jackson",
                b: "Tommy Jr., Max, Jackson",
                c: "Tommy Jr., Ramona, Max",
                d: "Ramona, Jackson, Tommy Jr."
            },
            correctAnswer: "b"
        }, {
            question: "Who does Stephanie fall in love with?",
            answers: {
                a: "Jimmy Gibbler",
                b: "Matt Harmon",
                c: "Steve Hale",
                d: "Fernando Guerrero"
            },
            correctAnswer: "a"
        }, {
            question: "Where did Fernando and Kimmy meet?",
            answers: {
                a: "At a club",
                b: "At a hair salon",
                c: "At a race",
                d: "At a concert"
            },
            correctAnswer: "b"
        }, {
            question: "What is the name of Max's dog?",
            answers: {
                a: "Comet Jr.",
                b: "Comet",
                c: "Cosmo",
                d: "Crater"
            },
            correctAnswer: "c"
        }, {
            question: "What was Stephanie's DJ name when she lived in England?",
            answers: {
                a: "DJ San Fran",
                b: "DJ She Wolf",
                c: "DJ Steph",
                d: "DJ Tanner"
            },
            correctAnswer: "d"
        }, {
            question: "What was a 1992 hit song for Uncle Jesse in Japan?",
            answers: {
                a: "Forever",
                b: "Every Word I Say",
                c: "Happy Loving You",
                d: "Live in Your Heart"
            },
            correctAnswer: "a"
        }
        //  {
        //     question: "Who has the most kids?",
        //     answers: {
        //         a: "Uncle Jesse",
        //         b: "Danny Tanner",
        //         c: "DJ Tanner",
        //         d: "Uncle Joey"
        //     },
        //     correctAnswer: "d"
        // },
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
        $("#numberRight").html("<h1 id='mylanta'>Oh mylanta!</h1> <br> <h1 class='score'>You got " + correctLength + " questions correct!</h1><br><br>");
        $("#numberWrong").html("<h1 id='chalupas'>Holy chalupas!</h1> <br> <h1 class='score'>You missed " + amountMissed + " questions.</h1><br><br>");
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