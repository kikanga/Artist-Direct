$(document).ready(function() {



	//spotify search function
	function getArtistTrack(artist) {

    var queryURL = "https://api.spotify.com/v1/search?q=" + artist + "&type=artist";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      var artistID = response.artists.items[0].id;
      var queryURLTracks = "https://api.spotify.com/v1/artists/" + artistID + "/top-tracks?country=US";
      $.ajax({
        url: queryURLTracks,
        method: "GET"
      }).done(function(trackResponse) {
        var player1 = "<iframe src='https://embed.spotify.com/?uri=spotify:track:" +
          trackResponse.tracks[0].id +
          "' frameborder='0' allowtransparency='true'></iframe>";
        var player2 = "<iframe src='https://embed.spotify.com/?uri=spotify:track:" +
          trackResponse.tracks[1].id +
          "' frameborder='0' allowtransparency='true'></iframe>";
        var player3 = "<iframe src='https://embed.spotify.com/?uri=spotify:track:" +
          trackResponse.tracks[2].id +
          "' frameborder='0' allowtransparency='true'></iframe>";

        $("#player").append("<br>" + player1);
        $("#player").append("<br>" + player2);
        $("#player").append("<br>" + player3);

      });
      var queryGenre = "https://api.spotify.com/v1/artists/" + artistID;
     $.ajax({
     	url: queryGenre,
     	method: "GET"
     }).done(function(genreResponse) {
     	var genre = genreResponse.genres[0] + "," + genreResponse.genres[1] + "," + genreResponse.genres[2];
     	$("#profile").append("</br>" + "Genre: " + genre);
     });

     var follow = '<iframe src="https://embed.spotify.com/follow/1/?uri=spotify:artist:'
     + artistID + '&size=detail&theme=light&show-count=0" width="300" height="56" scrolling="no" frameborder="0" style="border:none; overflow:hidden;" allowtransparency="true"></iframe>'
     $('#profile').append("<br>" + follow);

     

    });
  }

  
 
  $("#submit").on("click", function(event) {
    event.preventDefault();
    $("#player").empty();
    $("#profile").empty();

    $("#spotify-header").html("Top Songs");
    //brings up spotify top songs
    var artist = $("#artist-input").val().trim();
    getArtistTrack(artist);



  });


      $("#submit").on("click", function(event) {

        // event.preventDefault() can be used to prevent an event's default behavior.
        // Here, it prevents the submit button from trying to submit a form when clicked
        event.preventDefault();

        // Here we grab the text from the input box
        var artistGiph = $("#artist-input").val();

        // Here we construct our URL
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        artistGiph + "&api_key=dc6zaTOxFJmzC&limit=1";

        // Write code between the dashes below to hit the queryURL with $ajax, then take the response data

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          var results = response.data[0].images.fixed_height.url;
          var artistImage = $("<img>");
          console.log(response.data);

          artistImage.attr("src", results);
          artistImage.attr("data-animate", results);
          artistImage.attr("data-still", response.data[0].images.fixed_height_still.url);
          artistImage.attr("data-state", "animate"); // set the image state
          artistImage.addClass("gif");

          $("#photo").append(artistImage);

        });

        // -----------------------------------------------------------------------

      });

  $(document).on("click", ".gif", function(){
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      } else {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
    });



});