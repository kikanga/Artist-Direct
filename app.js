$(document).ready(function() {

twttr.widgets.load(
  document.getElementById("feed"));

 
var list = JSON.parse(localStorage.getItem("favorites-list"));
  //if there is a list, it displays it 
if (!Array.isArray(list)) {
      list = [];
    }

 //grabs favorites-list array from local storage and appends it to favorites div
makeFavorites();


//empties search bar upon clicking the input field
  $("#artist-input").on("click", function() {
  this.value = "";
});

//grabs the artist name, empties any previous data and runs all AJAX functions
   $("#submit").on("click", function(submit) {
    submit.preventDefault();
    $("#player").empty();
    $("#profile").empty();
    $("#dates").empty();
    $("#bio").empty();
    $("#spotify-header").html("Top Songs");
    $("#tour-header").html("Upcoming Shows");
    $("#tweets-header").html("Trending Tweets");
    var artist = $("#artist-input").val().toLowerCase().trim();
    getArtistTrack(artist);
    getEvents(artist);
    getTwitter(artist)
    twttr.widgets.load();
  


    });

//runs the AJAX for the name of the favorited artist 

 $(document).on("click", ".favorite-button", function(){
     event.preventDefault();
    $("#player").empty();
    
    $("#profile").empty();
    
    $("#dates").empty();
    
    $("#bio").empty();

    $("#spotify-header").html("Top Songs");
    
    $("#tour-header").html("Upcoming Shows");
    
    faveArtist = $(this).text();
    
    $("#artist-input").val(faveArtist);
    
    var artist = $("#artist-input").val().toLowerCase().trim();
    
    getArtistTrack(artist);
    
    getEvents(artist);

    getTwitter(artist);

    twttr.widgets.load();

  }); 



//adds artist to favorites-list array in local storage
    $(".heart").on("click", function(event) {
      event.preventDefault();
 // Setting the input value to a variable and then clearing the input
var artistname = $("#artist-input").val().toLowerCase().trim();

  //prevents adding artist if artist already exists in array
      if (list.indexOf(artistname) == -1) {
      list.push(artistname);
      localStorage.setItem("favorites-list", JSON.stringify(list));

     

 //loops through array again to add new artist to page    

      makeFavorites();
    
    };

    });

//creates favorites buttons from favorites-list array in local storage
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
    };
    

//Spotify AJAX used to grab artist info including top tracks, profile link, genre and photo

  function getArtistTrack(artist) {

    $("#player").empty();
    $("#profile").empty();
    var artistID;
    var queryURL = "https://api.spotify.com/v1/search?q=" + artist + "&type=artist";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      artistID = response.artists.items[0].id;
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

      var photoURL = genreResponse.images[2].url;

      var artistphoto = $("<img>");

      artistphoto.attr("src", photoURL);

      $("#photo").html(artistphoto);

     });

     var follow = '<iframe src="https://embed.spotify.com/follow/1/?uri=spotify:artist:'
     + artistID + '&size=basic&theme=light" swidth="200" height="25" scrolling="no" frameborder="0" style="border:none; overflow:hidden;" allowtransparency="true"></iframe>'
     $('#profile').append("<br>" + follow); 

     //code below gets related artist and appends it to the related artist section. 
     var queryRelatedArtist = "https://api.spotify.com/v1/artists/"+artistID+"/related-artists";
     $.ajax({
      url: queryRelatedArtist,
      method:"get"
     }).done(function(response){
      console.log(response);
      $("#bio").append("<h1 style='color:white; text-decoration: underline;'>Related Artists</h1>");

      $("#bio").append("<h3 style='color:white; text-decoration:underline; position: relative; z-index:1;' class='favorite-button'>"+response.artists[0].name+"</h3>");
      $("#bio").append("<h3 style='color:white; text-decoration:underline; position: relative; z-index:2;' class='favorite-button'>"+response.artists[1].name+"</h3>");
      $("#bio").append("<h3 style='color:white; text-decoration:underline; position: relative; z-index:3;' class='favorite-button'>"+response.artists[2].name+"</h3>");
     });

    });
  }


  //Eventful AJAX grabs artist's tour dates

  function getEvents(artist) {

     var queryURL2 = "https://api.eventful.com/json/events/search?keywords=" + artist + "+music&where=34.0522,-118.2437&within=25&sort_order=popularity&date=Future&app_key=6Gn8mQPcGM5pV65S";
    
    $.ajax({
      url: queryURL2,
      dataType: 'jsonp',
      method: "GET"
    }).done(function(response) {

      var results = response.events.event
    

      // Printing the entire object to console


      for (var i = 0; i < results.length; i++) {
     
      var printout = results[i].title;
      var date = results[i].start_time;
      var dateformatted =  moment(date).format('MMMM Do YYYY, h:mm a');
      var name = results[i].venue_name;
      var address = results[i].venue_address;
      var url = results[i].url
      var individualResultDiv = $("<a>");

     
      individualResultDiv.append(printout)
      individualResultDiv.append(" / " + name)
      individualResultDiv.append(" / " + address)
      individualResultDiv.append(" / " + dateformatted + "</p>")
      individualResultDiv.addClass(".individualResult");
      individualResultDiv.attr("href", url)
     $("#dates").append(individualResultDiv)

      }

    });

  }; 
  
//Twitter AJAX grabs trending tweets for artist
  function getTwitter(artist) {

    artist = artist.replace(/ /g, "");
    var url = "https://twitter.com/" + artist;
    console.log(url)
    var individualResultDiv2 = $("<a>");
    individualResultDiv2.addClass("twitter-timeline");
    individualResultDiv2.attr("data-lang", "en");
    individualResultDiv2.attr("data-height", "300");
    individualResultDiv2.attr("data-width", "500");
    individualResultDiv2.attr("data-theme", "dark");
    individualResultDiv2.attr("href", url);

    $("#feed").html(individualResultDiv2);


  };
});
