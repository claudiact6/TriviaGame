var trivia = {
    "questions": {
        "question1": "What metal does Erin Brockovich discover in the water?",
        "question2": "What year did Silence of the Lambs come out?",
        "question3": "What is the name of the ship in The Matrix?",
        "question4": "Who is Forrest Gump in love with?",
        "question5": "What role does Susan Sarandon play in The Client?",
        "question6": "What is the name of Julia Roberts' character in The Pelican Brief?",
    },
    "answers": {
        "answers1": ["Chromium", "Copernicum", "Iron", "Uranium"],
        "answers2": ["1991", "1996", "1993", "1998"],
        "answers3": ["Nebuchadnezzar", "Prometheus", "Zedekiah", "Jehoshaphat"],
        "answers4": ["Jenny Curran", "Mary Hawkins", "Sarah Johnson", "Mabel Hawthorne"],
        "answers5": ["The defense lawyer", "The loving mother", "The concerned teacher", "The nosy neighbor"],
        "answers6": ["Darby", "Darcy", "Darlene", "Darling"],
    },
    "rightAnswers": ["", "Chromium", "1991"],
    "pictures": {
        "picture1": "../images/picture1.jpg",
        "picture2": "../images/picture2.jpg",
        "picture3": "../images/picture3.jpg",
        "picture4": "../images/picture4.jpg",
        "picture5": "../images/picture5.jpg",
        "picture6": "../images/picture6.jpg",
    }
};

var count = 0;
var originalanswers = [];
var time = 15;
var shuffledanswers = [];

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function noAnswer() {
    clear();
    $("#rightWrong").html("Time's up!");
    $("#explain").html("You didn't answer!");
    setTimeout(nextQuestion, 5000);
}

function showRight() {
    clear();
    $("#rightWrong").html("That's right!");
    $("#picture").html("<img src='assets/images/picture" + count + ".jpg' />");
    setTimeout(nextQuestion, 5000);

}

function showWrong() {
    clear();
    $("#rightWrong").html("Wrong!");
    $("#explain").html("The right answer was " + trivia.rightAnswers[count] + ".");
    $("#picture").html("<img src='assets/images/picture" + count + ".jpg' />");
    setTimeout(nextQuestion, 5000);
}

function timer() {
    time--;
    $("#timer").html(time);
}

function clear() {
    clearTimeout(noAnswer);
    clearInterval(timer); 
    shuffledanswers.length = 0;
    $("#question").hide();
    $("#answers").html("");
    $("#answers").hide();
    $("#timecontain").hide();
    console.log("cleared");
    console.log(shuffledanswers);
}

function nextQuestion() {
    console.log(shuffledanswers);
    count++;
    $("#picture").hide();
    $("#explain").hide();
    $("#rightWrong").hide();
    $("#question").show();
    $("#answers").show();
    $("#timecontain").show();
    $("#progress").show();
    $("#question").html(trivia.questions["question" + count]);
    var shuffledanswers = shuffle(trivia.answers["answers" + count]);
    for (i = 0; i < 4; i++) {
        $("#answers").append("<li class='list-group-item' id=" + i + ">" + shuffledanswers[i] + "</li>");
    }
    setTimeout(noAnswer, 15000);
    setInterval(timer, 1000);
}


$(document).ready(function () {
    count = 1;
    $("#start").on("click", function () {
        $(this).hide();
        $("#subtitle").hide();
        $("#timecontain").show();
        $("#progress").show();
        $("#question").html(trivia.questions["question" + count]);
        var shuffledanswers = shuffle(trivia.answers["answers" + count]);
        for (i = 0; i < 4; i++) {
            $("#answers").append("<li class='list-group-item' id=" + i + ">" + shuffledanswers[i] + "</li>");
        }
        setTimeout(noAnswer, 15000);
        setInterval(timer, 1000);

    });



    $("ul").on("click", "li", function () {
        clearTimeout(noAnswer);
        clearInterval(timer);
        $("#timecontain").hide();
        console.log(originalanswers);
        console.log($(this).text());
        if ($(this).text() === trivia.rightAnswers[count]) {
            showRight();
        } else {
            showWrong();
        }
    });

});