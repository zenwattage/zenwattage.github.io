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

//constants
var turns;

//key press event listener
var keyPress;

document.addEventListener("onkeyup" , function(event) {
        keyPress = event.key; })

//function to get a random title from the array of movies
function getRandom(array) {
    var getRandom = array[Math.floor(Math.random() * movies.length)];
    return getRandom;
    }

var movieTitle = getRandom(movies);
var turns = movieTitle.length;

console.log(movieTitle);
console.log(turns);
console.log(typeof(movieTitle));
//console.log("character code is " + movieTitle.charCodeAt(1));
    //output dashes equal to letters in title
var dashArray = [];
var charArray = [];
var keyPressArray = [];


for(var i = 0; i < turns; i++) {
    charArray.push(movieTitle[i]);

    dashArray[i] = "_";


    //match these codes to codes of .key event
    //console.log(charArray[i].charCodeAt());
}


//check the keypresses array for repeats and print the repeats

var repeatCheck = function(a) {
    for (let i = 0; i < a.length; i++) {
        console.log(i);
        for (let j = i + 1; j < a.length; j++) {
            console.log(j);
            if (a[i] === a[j]) {
                console.log("Repeats are : " + a[i]);
                keyPressArray.push(a[j]);
                //console.log("Matching are : " + keyPressArray);
                
            }
            
        }
        
    }
}
repeatCheck(charArray);


/* charArray.forEach(index => {
    console.log("character code is " + movieTitle.charCodeAt());
    
    
}); */
//console.log(dashArray);





function displayDashes(array){
    document.getElementById("outputLine").innerHTML = array.join(" ");
}



console.log(" Index 1 of title is: " + movieTitle[1]);

console.log("Turns left: " + turns);

//function calls
//displayDashes(dashArray);












//function to display and update board
/* function boardDisplay() {
    
//loop over each index of the movie title        
    for(var j = 0; j < movieTitle.length; j++) {
        if(keyPress === j){
            console.log(keyPress);
        } else {
            console.log("_");
            turns--;
        }
    }        
    } */
    

//turns = movietitle.length 
//while turns > 0 {
//for each index of the movie title
// if keypress === index
// print letter
//else
//print "_" &&  lose 1 turn


//boardDisplay();





/* 
var letterArray = [];
function convertString(string) {
    
    for(var i = 0; i < string.length; i++){
        letterArray[i].push(string[i]);
        console.log("Converted is" + letterArray[i]);
    }
}

convertString(movieTitle); */
