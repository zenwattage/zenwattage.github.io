$(document).on('ready', function() {



    //display waiting clock 
    var clockStart = new FlipClock($('.countdown'), 20, {
        clockFace: 'MinuteCounter',
        language: 'en',
        autoStart: false,
        countdown: true,
        showSeconds: true
    });

    //ON START BUTTON CLICK    
    $('#startButton').on('click', function() {
        $('#startButton').hide();
        $('.title').hide();

    console.log("This bitch is ready!");
    //$("#status").text("This bitch is ready!");

    // -- --ARRAY-- OF QUESTIONS
    //MATCHING ANSWERS
    var questions =[
    {
      question : "What is the preferred cocktail of: The Dude - The Big Lebowski",
      answers: ["White Russian", "Slippery Nipple", "Harvey Wallbanger", "Mai Thai"],
      correct: 1,
    },

    {
      question : "What is the preferred cocktail of: James Bond",
      answer: ["Martini - shaken not stirred","Gin Fizz","Whiskey Ginger", "Vesper"],
      correct: 3,
    },

    {
      question : "What is the preferred cocktail of: Don Draper - Madmen",
      answer: ["Manhattan","Old Fashioned","Dark and Stormy","Whiskey on the Rocks"],
      correct:1,
    },

    {
      question : "What is the preferred cocktail of: The Blues Brothers",
      answer: ["Long Island Iced Tea","Orange Whip","Beer","Blues Margarita"],
      correct: 1,
    },

    {
      question : "What is the preferred cocktail of: The Most interesting Man in the World",
      answer: ["XX", "Bud Light", "Coors Light", "Guinness"],
      correct:1
    }];


      console.log(typeof(questions));    

    var set_state = true;



    //DISPLAY QUESTION
    //get question
    function getQuestion(item,index) {
        var question = [item.question];
        return question;
    };

    var firstQuestion =getQuestion(question, 0);

    console.log(firstQuestion);
    //DISPLAY BUTTONS
    function renderButtons() {
        $("#buttons-view").empty();

        //loop through array of questions
        for(var i = 0; i < questions.length; i++){
            var btn = $("<button>");
            btn.addClass("answer");
            btn.attr("data-name", questions[i]);
            btn.text( );

            //append button
            $("#buttons-view").append(btn);
        }
    }

    renderButtons();

    //30second timer
    //setInterval(function(){ alert("Hello"); }, 30000);

    function alertForTesting() {
                alert('yep working');
            };

        
    //COUNTDOWN CLOCK USING FLIPCLOCK JS
    (function () {
        var countdown;
        var init_countdown;
        var set_countdown;
        
      
        countdown = init_countdown = function () {
          countdown = new FlipClock($('.countdown'), {
            clockFace: 'MinuteCounter',
            language: 'en',
            autoStart: false,
            countdown: true,
            showSeconds: true,
            callbacks: {
              start: function () {
                return console.log('The clock has started!');
              },
              stop: function () {
                $('.title').toggle();
                $('.title').replaceWith("<h1>You ran out of time!</h1>");
                  $('#question').hide();
                  $('#right').hide();
                  $('#wrong').hide();
                  $('.countdown').css('padding-top','130px');
                  set_state = false;
                  

                return console.log('The clock has stopped!');
              },
              interval: function () {
                var time;
                time = this.factory.getTime().time;
                if (time) {
                  return console.log('Clock interval', time);
                }
              } } });
      
      
          return countdown;
        };

      
        set_countdown = function (minutes, start) {
          var elapsed;
          var end;
          var left_secs;
          var now;
          var seconds;
          if (countdown.running) {
            return;
          }
          seconds = minutes * 10;
          now = new Date();
          start = new Date(start);
          end = start.getTime() + seconds * 1000;
          left_secs = Math.round((end - now.getTime()) / 1000);
          elapsed = false;
          if (left_secs < 0) {
            left_secs *= -1;
            elapsed = true;
          }
          countdown.setTime(left_secs);
          return countdown.start();
        };
      
        init_countdown();
      
        set_countdown(1, new Date());
      
      }).call(this);

      //END OF FLIPCLOCK FUNCTION


      
    //CORRECT ANSWER CLICKED CHECK
    //get correct
    function getRight(item,index) {
        var rightAnswer = [item.answer];
        return rightAnswer;
    }


    //WRONG ANSWER CLICKED
    //get wrong
    function getWrong(item,index) {
        var wrongAnswer = [item.wrong, item.wrong2, item.wrong3];
        return wrongAnswer;
    }

  
  
  
  
  
  
  
  
  
  
  
  
       /*   function cardTimer() {
        var timeAllowed = setTimeout(alertForTesting(), 3000000);
        
    //QUESTION TIMER STARTS COUNTING DOWN
    //cardTimer();

    




    */ 
    //QUESTION TIMER
    //TIMER STATUS CHECK
    //


    //ON ANSWER CLICK
    // RETURN CORRECT OR INCORRECT

    //IF CORRECT
        //DISPLAY MESSAGE "THAT'S CORRECT!"
        //DISPLAY IMAGE

    //IF INCORRECT
        //RETURN CORRECT ANSWER
        //DISPLAY IMAGE
        // FOR SET DURATION

    //MOVE TO NEXT QUESTION


    //IF TIMER REACHES ZERO
    // DISPLAY OUT OF TIME
    //DISPLAY CORRECT ANSWER
    // MOVE ON TO NEXT QUESTION


    //WHEN GAME ENDS
    //TIMER STOPS
    //DISPLAY CORRECT,INCORRECT, AND SKIPPED COUNTS
    //DISPLAY RESET BUTTON

    //ON RESET BUTTON CLICK
    //RESET GAME



    function putOnPage() {

        document.getElementById("question").innerHTML = questions.map(getQuestion);
        document.getElementById("right").innerHTML = questions.map(getRight);
        document.getElementById("wrong").innerHTML = wrongAnswers.map(getWrong);
        
        }
    putOnPage();

    //}; //end of startgamefuntion
        

        //ON START BUTTON CLICK
    //$('#startButton').on('click', startGame());

} );

});