
//button for all topicss
$(".btn").on("click", function() {
// Grabbing and storing the data-topics property value from the button
var topics = $(this).attr("data-topics");

var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
topics + "&api_key=3EXHyNptM9m6Q9yAhAzpjibJWHq9P8Oq&limit=2";

//For our search search
var searchApi = "http://api.giphy.com/v1/gifs/search?" 
+ topics + "&api_key=3EXHyNptM9m6Q9yAhAzpjibJWHq9P8Oq";
var query = "&q=dancing";

//var searchTerm = $('#searchTerm').val();

console.log(searchTerm);


// var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
// url += '?' + $.param({
//   'api-key': "3EXHyNptM9m6Q9yAhAzpjibJWHq9P8Oq&limit",
//   'q': searchTerm,
// });


// Perfoming an AJAX GET request to my queryURL
$.ajax({
    url: queryURL,
    method: "GET"
})// After the data comes back from the API
.then(function(response) {
  // Storing an array of results in the results variable
  var results = response.data;

  // Looping over every result item
  for (var i = 0; i < results.length; i++) {

    // Only taking action if the photo has an appropriate rating
    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
      // Creating a div with the class "item"
      var gifDiv = $("<div class='item'>");

      // Storing the result item's rating
      var rating = results[i].rating;

      // Creating a paragraph tag with the result item's rating
      var p = $("<p>").text("Rating: " + rating);

      // Creating an image tag
      var topicsImage = $("<img>");

      // Giving the image tag an src attribute of a proprty pulled off the
      // result item
      topicsImage.attr("src", results[i].images.fixed_height.url);

      // Appending the paragraph and topicsImage we created to the "gifDiv" div we created
      gifDiv.append(p);
      gifDiv.append(topicsImage);

      // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
      $("#gifResults").prepend(gifDiv);
    }
  }
});
});