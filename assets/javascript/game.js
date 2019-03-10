var score = 1;
// Countdown Timer Variables
var number = 120;
var intervalId;
var clockRunning = false;

function reset() {
    if (score = 3) {
        $(".startButtonColumn").css("z-index", "1");
        $("#score").hide();
        stop();
    }

}

function run() {
    number = 120
    intervalId = setInterval(decrement, 1000);
    clockRunning = true;
}

function decrement() {
    number--;
    $("#timeRemaining").html("<h2>" + number + "</h2>");

    if (number === 0) {
        stop();

        alert("Time Up!")
        reset();
    }
}

function stop() {
    clearInterval(intervalId);
    clockrunning = false;
    number = 120
}

// Answer Functions
function correctAnswer1() {
    $(".list1 #Q1A2").on("click", function () {
        $(".list1 #Q1A2").css("background", "green");

        $("#score").text("Score: " + score);
        console.log(score);
    })
    $(".list1 #Q1A1").on("click", function () {
        $(".list1 #Q1A1").css("background", "red");
    })
    $(".list1 #Q1A3").on("click", function () {
        $(".list1 #Q1A3").css("background", "red");
    })
}

function correctAnswer2() {
    $(".list2 #Q2A3").on("click", function () {
        $(".list2 #Q2A3").css("background", "green");
        score = 2;
    })
    $(".list2 #Q2A1").on("click", function () {
        $(".list2 #Q2A1").css("background", "red");
    })
    $(".list2 #Q2A2").on("click", function () {
        $(".list2 #Q2A2").css("background", "red");
    })
}
function correctAnswer3() {
    $(".list3 #Q3A1").on("click", function () {
        $(".list3 #Q3A1").css("background", "green");
        score = 3
        $("body").css("background", "green");
    })
    $(".list3 #Q3A2").on("click", function () {
        $(".list3 #Q3A2").css("background", "red");
    })
    $(".list3 #Q3A3").on("click", function () {
        $(".list3 #Q3A3").css("background", "red");
    })
}
correctAnswer1();
correctAnswer2();
correctAnswer3();



// on clikcing "Start" button
$("#startButton").on("click", function () {
    // make start section disappear
    $(".startButtonColumn").css("z-index", "-1");
    // start Countdown Timer from 120 seconds
    $("body").css("background", "pink");
    $(".list1 #Q1A2").css("background", "aqua");
    $(".list1 #Q1A1").css("background", "aqua");
    $(".list1 #Q1A3").css("background", "aqua");
    $(".list2 #Q2A2").css("background", "purple");
    $(".list2 #Q2A1").css("background", "purple");
    $(".list2 #Q2A3").css("background", "purple");
    $(".list3 #Q3A2").css("background", "grey");
    $(".list3 #Q3A1").css("background", "grey");
    $(".list3 #Q3A3").css("background", "grey");
    $("#score").hide()
    var number = 120;
    run();

    $(".list1 #Q1A2").on("click", function () {
        $("#questionAnsweredHeader").text("You answered Question 1 Correctly. Score: " + score);
    })

    $(".list1 #Q1A1").on("click", function () {
        $("#questionAnsweredHeader").text("You answered Question 1 Wrong. Try Again");
    })

    $(".list1 #Q1A3").on("click", function () {
        $("#questionAnsweredHeader").text("You answered Question 1 Wrong. Try Again");
    })

    $(".list2 #Q2A3").on("click", function () {
        $("#questionAnsweredHeader").text("You answered Question 2 Correctly. Score: " + score);
    })

    $(".list2 #Q2A1").on("click", function () {
        $("#questionAnsweredHeader").text("You answered Question 2 Wrong. Try Again");
    })

    $(".list2 #Q2A2").on("click", function () {
        $("#questionAnsweredHeader").text("You answered Question 2 Wrong. Try Again");
    })

    $(".list3 #Q3A1").on("click", function () {
        $("#questionAnsweredHeader").text("You answered Question 3 Correctly. Score: " + score);
        $("body").css("background", "green");
        var r = confirm("You Win! Play again?");
        if (r = true) {
            reset();
        }
    })

    $(".list3 #Q3A2").on("click", function () {
        $("#questionAnsweredHeader").text("You answered Question 3 Wrong. Try Again");
    })

    $(".list3 #Q3A3").on("click", function () {
        $("#questionAnsweredHeader").text("You answered Question 3 Wrong. Try Again");
    })





})



