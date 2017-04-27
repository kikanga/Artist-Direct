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






});