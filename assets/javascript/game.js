//theme: 80's movies
//array of movies


var movies = [
    "Ghostbusters",
    "Superman",
    "Gremlins",
    "Beetlejuice",
    "Wargames",
    "Caddyshack",
    "Labryinth",
    "Flashdance",
    "Footloose",
    "Willow",
    "Highlander",
    "Legend"
];


    //game chooses title from array randomly
    var movie = movies[Math.floor(Math.random() * movies.length)];
    //NOT PREVENTING REPEATS    

    var chosenWord = movie.toLowerCase();
    //console.log(typeof(chosenWord));

    //fill empty array with spaces equal to letters in chosen word
    var spaceList = [];
    for(var i = 0; i < chosenWord.length; i++) {
        spaceList[i] = "_";
    }

    //fill empty array with chosenWord seperated into characters
    var letterList = [];
    for(var g = 0; g < chosenWord.length; g++) {
        letterList[g] = chosenWord[g];
        console.log(letterList);
    }

    var guessList = [];
    //fill array with non mathcing pressed key
   /*  var guessList = [];
    addEventListener("keydown", function(event){
        for(var b = 0; b < chosenWord.length; b++) {
            if(chosenWord[b] !== keyPressed) {
                guessList[b] = keyPressed;
            }
        }


    }) */
    
        

      
    //display dashes on page
    document.getElementById("spaces").innerHTML = spaceList.join("");

    //display chosen word on page
    //document.getElementById("letters").innerHTML = letterList.join("");

    //amount of turns is the amount of letters in the chosen word
    //lose turns on incorrect guesses
    
   var turns= parseInt(chosenWord.length);

    
    console.log("Turns Remaining: " + turns);

    //console.log(typeof(random));
        
    //get key pressed by user & convert it to a
    var keyPressed = "";
    addEventListener("keyup", function(event) {
        keyPressed = event.key;
        console.log(keyPressed);

        for(var j = 0; j < chosenWord.length; j++) {
            //if the index of the chosen word matches key
            if(chosenWord[j] === keyPressed){
                //update dashed line with character pressed
                rightAnSound.play();
                
                spaceList[j] = String(keyPressed);
                //console.log("In the Word: "+chosenWord[j]);
            } else {
                guessList.push(keyPressed);
            }
           
        }
        

        //write score to screen
        document.getElementById("wrongGuesses").innerHTML = "Guessed Letters: " + guessList;
        document.getElementById("score").innerHTML = "Turns Remaining: " + turns;
        document.getElementById("spaces").innerHTML = spaceList.join("");
        //document.getElementById("imageTest").innerHTML = 



        })



        //sounds
       var wrongAnSound = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/bad.mp3');
       var rightAnSound = new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/goodbell.mp3");
       var winSound = new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/win.mp3");
       var loseSound = new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/lose.mp3");
