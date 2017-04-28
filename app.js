
$(document).ready(function() {


//Favorites List/////////////////////////////////////////////////////////////////// 
  var list = JSON.parse(localStorage.getItem("favorites-list"));
if (!Array.isArray(list)) {
      list = [];
    }
    function makeFavorites() {
      $(".faves").empty();
      var insideList = JSON.parse(localStorage.getItem("favorites-list"));
      if (!Array.isArray(insideList)) {
        insideList = [];
      }
      for (var i = 0; i < insideList.length; i++) {
        var f = $("<button>").html(insideList[i]);
        f.addClass("favorite-button");
        $(".faves").append(f);
      }
    }
   
    //On click for creating favorites
    $(".heart").on("click", function(event) {
      event.preventDefault();
      // Setting the input value to a variable and then clearing the input
      var artistname = $("#artist-input").val();
      list.push(artistname);
      localStorage.setItem("favorites-list", JSON.stringify(list));
      console.log(artistname);
      makeFavorites();
    });
    makeFavorites();

	//spotify search function/////////////////////////////////////////////////////////
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


//empties out the text box when user clicks it////////////////////////////////////////////
  $("#artist-input").on("click", function() {
  this.value = "";
});

//giphy function/////////////////////////////////////////////////////////////////////////
        function getGiphy() {
        var artistGiph = $("#artist-input").val();
        
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        artistGiph + "&api_key=dc6zaTOxFJmzC&limit=1";

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

          $("#photo").html(artistImage);

        });

      };
//pause and play click function for gifs
  $(document).on("click", ".gif", function(){
      var state = $(this).attr("data-state");
      if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      } else {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
    });


//Submit Button runs all AJAX functions 
  $("#submit").on("click", function(submit) {
    submit.preventDefault();
    $("#player").empty();
    $("#profile").empty();
    $("#spotify-header").html("Top Songs");
    var artist = $("#artist-input").val().trim();
    getArtistTrack(artist);
    getGiphy();

 $(document).on("click", ".favorite-button", function(){
     event.preventDefault();
    $("#player").empty();
    $("#profile").empty();
    $("#spotify-header").html("Top Songs");
    faveArtist = $(this).text();
    $("#artist-input").val(faveArtist);
    var artist = $("#artist-input").val().trim();
    getArtistTrack(artist);
    getGiphy();
      



  }); 

});

});





