$(document).ready(function () {

    console.log("this bitch is ready");
    var dealerHand = 0;
    var wins = 0;
    var losses = 0;
    var runningTotal = 0;
    var red = 0;
    var green = 0;
    var blue = 0;
    var yellow = 0;
    
    //$("#scoreboard").append("Wins: " + wins);
    //$("#scoreboard").append("Losses: " + losses);
    
   //array of crystal variables
    var crystals = [red,green,blue,yellow];
  
  //generate random number for dealer between 19 and 120
    function getRandomDealer() {
      var dealerMax = 120;
      var dealerMin = 19;
      return Math.floor(Math.random() * (dealerMax - dealerMin + 1)) + dealerMin;
    };

    function getRandomCrystal() {
      var crystalMax = 12;
      var crystalMin = 1;
      return Math.floor(Math.random() * (crystalMax - crystalMin + 1)) + crystalMin;
    };


    function resetStuff() {
      //rest running total
      runningTotal = 0;
      //dealer gets new random number
      dealerHand = getRandomDealer(); 
      //crystals get new random numbers
      newCrystalArray = crystals.map(crystals => getRandomCrystal());
      //update display of counters (dealer, wins, losses)
      $("#dealer_hand").text(dealerHand);
      $("#wins").text("Wins: " + wins);
      $("#losses").text("Losses: " + losses);

    };

    function winOrLose() {
      if(runningTotal === dealerHand) {
        
        $("#scoreboard").text("You won!!");
        wins++;
        resetStuff();
      }

      //if totalScore > dealerHand
      // displayToUser "You lost!!"
      // add 1 to Losses
      if(runningTotal > dealerHand){
        $("#scoreboard").text("You lost!!");
        losses++;
        resetStuff();
      };

    };

    //map random crystal number to each crystal
    var newCrystalArray = crystals.map(crystals => getRandomCrystal());
    
    //display dealer hand
    dealerHand = getRandomDealer();
    $("#dealer_hand").append(dealerHand);
      
    //on crystal click
    $("#red").on("click", function() {
      runningTotal += newCrystalArray[0];      
      $("#total_score").text(runningTotal);
      console.log("Running total is: " + runningTotal);
      winOrLose();
    });
    $("#green").on("click", function() {
      runningTotal += newCrystalArray[1];
      console.log("Running total is: " + runningTotal);
      $("#total_score").text(runningTotal);
      winOrLose();
    });
    $("#blue").on("click", function() {
      runningTotal += newCrystalArray[2];
      console.log("Running total is: " + runningTotal);
      $("#total_score").text(runningTotal);
      winOrLose();
    });
    $("#yellow").on("click", function() {
      runningTotal += newCrystalArray[3];
      console.log("Running total is: " + runningTotal);
      $("#total_score").text(runningTotal);
      winOrLose();
    });
 
   });

 


