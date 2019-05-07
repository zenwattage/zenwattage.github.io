const config = {
    apiKey: "AIzaSyCDDEvDN8T21KSpUnxrUrfozcXM7EywOoM",
    authDomain: "traintimer-1cfec.firebaseapp.com",
    databaseURL: "https://traintimer-1cfec.firebaseio.com",
    projectId: "traintimer-1cfec",
    storageBucket: "traintimer-1cfec.appspot.com",
    messagingSenderId: "810687246335"

  };

// Initialize Firebase

firebase.initializeApp(config);

//reference the database.
var trainDatabase = firebase.database();
//console.log(trainDatabase);

// on submit button click
$("#submit").on("click", function() {

  // get info from input boxes
  var trainName = $("#train-name").val().trim();
  var destination = $("#destination").val().trim();
  var firstTrain = moment($("#first-train").val().trim(), "hh:mm").subtract(10, "years").format("x");
  var trainFreq = $("#trainFreq").val().trim();


  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    trainFreq: trainFreq
  }
  
  trainDatabase.ref().push(newTrain);
  
  console.log("Train added!");

  //clear boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train").val("");
  $("#trainFreq").val("");


  return false;
})




//on child added update
trainDatabase.ref().on("child_added", function(snapshot) {
  var name = snapshot.val().name;
  var destination = snapshot.val().destination;
  var trainFreq = snapshot.val().trainFreq;
  var firstTrain = snapshot.val().firstTrain;
  //remainder
  var remainder = moment().diff(moment().unix(firstTrain), "minutes") % trainFreq;
  //minutes
  var minutesTilArrival = trainFreq - remainder;
  //arrival
  var arrival = moment().add(minutesTilArrival, "minutes").format("hh:mm");

//append to table
$("#trainOutput").append("<tr><td>Train name : " + name + "</tr></td>");
$("#trainOutput").append("<tr><td>Going to: " + destination + "</tr></td>");
$("#trainOutput").append("<tr><td>Arriving in: " + minutesTilArrival + " minutes. </tr></td>");
$("#trainOutput").append("<tr><td>Train arrives at: " +  arrival + " local time.</tr></td>");


});//end on child added function
