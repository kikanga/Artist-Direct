$(document).ready(function() {




  var list = JSON.parse(localStorage.getItem("favorites-list"));

  console.log(list);

if (!Array.isArray(list)) {
      list = [];
    }

    function makeFavorites() {

      $(".faves").empty();

      var insideList = JSON.parse(localStorage.getItem("favorites-list"));

      // Checks to see if we have any todos in localStorage
      // If we do, set the local insideList variable to our todos
      // Otherwise set the local insideList variable to an empty array
      if (!Array.isArray(insideList)) {
        insideList = [];
      }

  
      for (var i = 0; i < insideList.length; i++) {
        var f = $("<button>").html(insideList[i]);
        $(".faves").append(f);
      }
    }

    // render our todos on page load
   


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
    getEvents(artist);

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
  

  function getEvents(artist) {

    // Running an initial search to identify the artist's unique Spotify id
     artist = artist.replace(" ", "+");
     var queryURL2 = "http://api.eventful.com/json/events/search?keywords=" + artist + "+music&where=34.0522,-118.2437&within=25&sort_order=popularity&date=Future&app_key=6Gn8mQPcGM5pV65S";
    
    $.ajax({
      url: queryURL2,
      dataType: 'jsonp',
      method: "GET"
    }).done(function(response) {

      var results = response.events.event
      
       console.log(results)
      // Printing the entire object to console
      for (var i = 0; i < results.length; i++) {
      //  console.log(response)
      // console.log(results[i].description);

      
      var printout = results[i].title;
      var date = results[i].start_time;
      var dateformatted =  moment(date).format('MMMM Do YYYY, h:mm a');
      var name = results[i].venue_name;
      var address = results[i].venue_address;

      var url = results[i].url


      var individualResultDiv = $("<a>");

      // individualResultDiv.append('<p>' + printout + '    ' + name + '    ' + address + '    ' + date + '</p>');
      individualResultDiv.append(printout)
      individualResultDiv.append(" / " + name)
      individualResultDiv.append(" / " + address)
      individualResultDiv.append(" / " + dateformatted + "</p>")
      individualResultDiv.addClass(".individualResult");
      individualResultDiv.attr("href", url)
        $("#dates").append(individualResultDiv)
        //$(".fill").append('<p>' + printout + '    ' + name + '    ' + address + '    ' + date + '</p>');

      }

       $(".individualResult").on("click", function(event) {
      // Preventing the button from trying to submit the form
        $("a").attr("href", url);
      });
      });
    $("#dates").empty();
    };
  
});


  $("#artist-input").on("click", function() {
  this.value = "";
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

          $("#photo").html(artistImage);

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

