$(document).ready(function() {
  // An array of topics, new topics will be pushed into this array;
  var topics = [
    "Salsa",
    "Michael Jackson",
    "Ball Room Dancing",
    "Cha CHa",
    "Milly Rock",
    "Ballet",
    "Macarena",
    "Hip Hop Dance",
    "Bachata",
    "Zumba",
    "Eskista",
    "Robot Dance"
  ];

    function displayBtns() {
        $("#gifButtonsView").empty(); // prevents duplication when a new button is added

        for (var i = 0; i < topics.length; i++) {
          //loop through the array
          var gifButton = $("<button>"); //create a new gif button in html
          gifButton.addClass("userInput"); 
          gifButton.addClass("btn btn-primary"); //
          gifButton.attr("data-name", topics[i]);
          gifButton.text(topics[i]);
          $("#gifButtonsView").append(gifButton);
        }
      }
  function addNewButton() {
    $("#addGif").on("click", function() {
      var userInput = $("#user-input")
        .val()
        .trim();
      if (userInput == "") {
        return false; // added so user cannot add a blank button
      }
      topics.push(userInput); //push the users input as a button into the array
      displayBtns();
      return false;
    });
  }
    function displayGifs() {
    var userInput = $(this).attr("data-name");
    var queryURL =
      "http://api.giphy.com/v1/gifs/search?q=" +
      userInput + "&api_key=3EXHyNptM9m6Q9yAhAzpjibJWHq9P8Oq&limit=10";
    console.log(queryURL); // displays the constructed url

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response); // console test to make sure something returns
    //   $("#gifsView").empty(); // erasing anything in this div id so that it doesnt keep any from the previous click
      var gifResults = response.data; //shows results of gifs
      if (gifResults == "") {
        alert("There isn't a gif for this selected button");
      }
      for (var i = 0; i < gifResults.length; i++) {
        var gifDiv = $("<div>"); //div for the gifs to go inside
        gifDiv.addClass("gifDiv");
        // creating a paragraph for the rating
        var gifRating = $("<p>").text("Rating: " + gifResults[i].rating);
        gifDiv.append(gifRating);

        // pulling gif from the api
        var gifImg = $("<img>");
        gifImg.attr("src", gifResults[i].images.fixed_height_small_still.url); // still image stored into src of image
        gifImg.attr(
          "data-still",
          gifResults[i].images.fixed_height_small_still.url
        ); // still image
        gifImg.attr(
          "data-animate",
          gifResults[i].images.fixed_height_small.url
        ); // animated image
        gifImg.attr("data-state", "still"); // set the image state
        gifImg.addClass("image");
        gifDiv.append(gifImg);
        // add the giffs as the first child
        $("#gifsView").prepend(gifDiv);
      }
    });
  }
  //function calls
  displayBtns(); // display buttons that were created 
  addNewButton()

  // Document Event Listeners
  $(document).on("click", ".userInput", displayGifs);
  $(document).on("click", ".image", function() {
    var state = $(this).attr("data-state");
    //if the images state is still the image src will be updated
    if (state == "still") {
      $(this).attr("src", $(this).data("animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).data("still"));
      $(this).attr("data-state", "still");
    }
  });
});
