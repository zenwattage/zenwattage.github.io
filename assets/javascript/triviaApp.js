

$(document).ready(function () {

    var log = console.log;
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unansweredQuestions = 0;
    var timeRemaining = 20;
    var intervalID;
    var indexQandA = 0;
    var answered = false;
    var correct;
  
    // -- --ARRAY-- OF QUESTIONS
    //MATCHING ANSWERS
    var triviaGame = [
      {
        question: "What is the preferred cocktail of: The Dude - The Big Lebowski",
        answer: ["White Russian", "Slippery Nipple", "Harvey Wallbanger", "Mai Thai"],
        correct: "0",
        image: ("https://images.spot.im/v1/production/bo8gmwii60nveigkaqv5")
      },
  
      {
        question: "What is the preferred cocktail of: James Bond",
        answer: ["Martini - shaken not stirred", "Gin Fizz", "Whiskey Ginger", "Vesper"],
        correct: "3",
        image: ("http://www.inliterature.net/wp-content/uploads/2015/09/James-Bond.jpg")
      },
  
      {
        question: "What is the preferred cocktail of: Don Draper - Madmen",
        answer: ["Manhattan", "Old Fashioned", "Dark and Stormy", "Whiskey on the Rocks"],
        correct: "1",
        image: ("http://thenutfreevegan.net/wp-content/uploads/2017/11/Delicious-Maple-Old-Fashioned-Cocktail-Vegan-Nutfreevegan-Bourbon-recipe-3.jpg")
      },
  
      {
        question: "What is the preferred cocktail of: The Blues Brothers",
        answer: ["Long Island Iced Tea", "Orange Whip", "Beer", "Blues Margarita"],
        correct: "1",
        image: ("https://hips.hearstapps.com/vidthumb/images/delish-orange-whip-new-1530555799.jpg")
      },
  
      {
        question: "What is the preferred cocktail of: The Most interesting Man in the World",
        answer: ["XX", "Bud Light", "Coors Light", "Guinness"],
        correct: "0",
        image: ("https://rogersnider.files.wordpress.com/2013/06/final_ooh-3.jpg")
      }];
  
  
    function startGame() {
      console.log("game has begun");
      $('.start-button').remove();
      correctAnswers = 0;
      incorrectAnswers = 0;
      unansweredQuestions = 0;
      loadQandA();
    }
  
    function loadQandA() {
      answered = false; // will allow timeRemaining to be pushed back to <h5> after round reset....else statement in function timer()
      timeRemaining = 16;
      intervalID = setInterval(timer, 1000);
      if (answered === false) {
        timer();
      }
      correct = triviaGame[indexQandA].correct;
      var question = triviaGame[indexQandA].question;
      $('.question').html(question);
      for (var i = 0; i < triviaGame.length -1; i++) {
        var answer = triviaGame[indexQandA].answer[i];
        $('.answers').append('<h4 class= answersAll id=' + i + '>' + answer + '</h4>');
      }
  
      $("h4").click(function () {
        var id = $(this).attr('id');
        if (id === correct) {
          answered = true; // stops the timer
          $('.question').text("Answer is : " + triviaGame[indexQandA].answer[correct]);
          correctAnswer();
        } else {
          answered = true; //stops the timer
          $('.question').text("Sorry, the correct answer is : " + triviaGame[indexQandA].answer[correct]);
          incorrectAnswer();
        }
      });
    }
  
    function timer() {
      if (timeRemaining === 0) {
        answered = true;
        clearInterval(intervalID);
        $('.question').text("The correct answer is : " + triviaGame[indexQandA].answer[correct]);
        unAnswered();
      } else if (answered === true) {
        clearInterval(intervalID);
      } else {
        timeRemaining--;
        $('.timeRemaining').text('You have ' + timeRemaining + ' seconds to choose.');
      }
    }
  
    function correctAnswer() {
      correctAnswers++;
      $('.timeRemaining').text("Correct!");
      resetRound();
    }
  
    function incorrectAnswer() {
      incorrectAnswers++;
      $('.timeRemaining');
      resetRound();
  
    }
  
    function unAnswered() {
      unansweredQuestions++;
      $('.timeRemaining');
      resetRound();
    }
  
    function resetRound() {
      $('.answersAll').remove();
      $('.answers').append('<img class=answerImage object-fit="contain" src="' + triviaGame[indexQandA].image + ' ">'); // adds answer image
      indexQandA++; // call next question
      if (indexQandA < triviaGame.length) {
        setTimeout(function () {
          //reload questions and remove image from previous question
          loadQandA();
          $('.answerImage').remove();
        }, 2000);
  
      } else {
        setTimeout(function () {
  
          $('.question').remove();
          $('.timeRemaining').remove();
          $('.answerImage').remove();
  
          $('.answers').append('<h4 class= answersAll end>Correct: ' + correctAnswers + '</h4>');
          $('.answers').append('<h4 class= answersAll end>Wrong: ' + incorrectAnswers + '</h4>');
          $('.answers').append('<h4 class= answersAll end>Skipped: ' + unansweredQuestions + '</h4>');
          $('.answers').append('<h4>Game will restart shortly!</h4>');
          
          setTimeout(function () {
            location.reload();
          }, 7000);
        }, 5000);
      }
    };
  
    $('.startButton').on("click", function () {
      $('.startButton');
      startGame();
  
    });
  
  });