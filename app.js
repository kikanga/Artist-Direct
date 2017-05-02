  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD4LgBgSHu3JzZKRNRCS8biqa0nzm7NSWQ",
    authDomain: "group-project-1-ad.firebaseapp.com",
    databaseURL: "https://group-project-1-ad.firebaseio.com",
    projectId: "group-project-1-ad",
    storageBucket: "group-project-1-ad.appspot.com",
    messagingSenderId: "5994213766"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  $(document).ready(function() {
  $('#register').on("click", function(){

  event.preventDefault();


        var email = $('#userEmail').val().trim();
        var pass = $('#userPass').val().trim();

      console.log(email);
      console.log(pass);

    database.ref().push({
      Email:  email,
      Password: pass,
      Favorites: [],
  });
    // clear text-boxes
    $("#userEmail").val("");
    $("#userPass").val("");
    // Prevents page from refreshing
    return false;   
    $("#registerForm").remove();
  });
twttr.widgets.load(
  document.getElementById("feed")
);
var artist = $("#artist-input").val().toLowerCase().trim();
console.log(artist);
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
    };
    
   
    //On click for creating favorites
    $(".heart").on("click", function(event) {
      event.preventDefault();
      // Setting the input value to a variable and then clearing the input
      var artistname = $("#artist-input").val().toLowerCase().trim();
   
      if (list.indexOf(artistname) == -1) {
      list.push(artistname);
      localStorage.setItem("favorites-list", JSON.stringify(list));
      //console.log(artistname);
      makeFavorites();
    };
    });
  
    makeFavorites();
    //spotify search function/////////////////////////////////////////////////////////
    function getArtistTrack(artist) {
    $("#player").empty();
    $("#profile").empty();
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
      var photoURL = genreResponse.images[2].url;
      var artistphoto = $("<img>");
      artistphoto.attr("src", photoURL);
      $("#photo").html(artistphoto);
     });
     var follow = '<iframe src="https://embed.spotify.com/follow/1/?uri=spotify:artist:'
     + artistID + '&size=basic&theme=light" swidth="200" height="25" scrolling="no" frameborder="0" style="border:none; overflow:hidden;" allowtransparency="true"></iframe>'
     $('#profile').append("<br>" + follow); 
    });
  }
//empties out the text box when user clicks it////////////////////////////////////////////
  $("#artist-input").on("click", function() {
  this.value = "";
});
//giphy function/////////////////////////////////////////////////////////////////////////
//         function getGiphy() {
//         var artistGiph = $("#artist-input").val().toLowerCase().trim();
        
//         var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
//         artistGiph + "&api_key=dc6zaTOxFJmzC&limit=1";
//         $.ajax({
//           url: queryURL,
//           method: "GET"
//         }).done(function(response) {
//           var results = response.data[0].images.fixed_height.url;
//           var artistImage = $("<img>");
//           console.log(response.data);
//           artistImage.attr("src", results);
//           artistImage.attr("data-animate", results);
//           artistImage.attr("data-still", response.data[0].images.fixed_height_still.url);
//           artistImage.attr("data-state", "animate"); // set the image state
//           artistImage.addClass("gif");
//           $("#photo").html(artistImage);
//         });
//       };
// //pause and play click function for gifs
//   $(document).on("click", ".gif", function(){
//       var state = $(this).attr("data-state");
//       if (state === "animate") {
//         $(this).attr("src", $(this).attr("data-still"));
//         $(this).attr("data-state", "still");
//       } else {
//         $(this).attr("src", $(this).attr("data-animate"));
//         $(this).attr("data-state", "animate");
//       }
//     });
  //Get tour dates////////////////////////////////////////////////////
  function getEvents(artist) {
    // Running an initial search to identify the artist's unique Spotify id
     // artist = artist.replace(" ", "+");
     var queryURL2 = "https://api.eventful.com/json/events/search?keywords=" + artist + "+music&where=34.0522,-118.2437&within=25&sort_order=popularity&date=Future&app_key=6Gn8mQPcGM5pV65S";
    
    $.ajax({
      url: queryURL2,
      dataType: 'jsonp',
      method: "GET"
    }).done(function(response) {
      var results = response.events.event
      //console.log(results);
      // Printing the entire object to console
      for (var i = 0; i < results.length; i++) {
     
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
    });
  };
//Submit Button runs all AJAX functions 
  $("#submit").on("click", function(submit) {
    submit.preventDefault();
    $("#player").empty();
    $("#profile").empty();
    $("#dates").empty();
    $("#spotify-header").html("Top Songs");
    $("#tour-header").html("Upcoming Shows");
    var artist = $("#artist-input").val().toLowerCase().trim();
    //console.log(artist);
    getArtistTrack(artist);
    getEvents(artist);
    getTwitter(artist)
    twttr.widgets.load()
    // getGiphy();
    $("#registerForm").remove();
 $(document).on("click", ".favorite-button", function(){
     event.preventDefault();
    $("#player").empty();
    console.log("1");
    $("#profile").empty();
    console.log("2");
    $("#dates").empty();
    console.log("3");
    $("#spotify-header").html("Top Songs");
    console.log("4");
    $("#tour-header").html("Upcoming Shows");
    console.log("empty");
    faveArtist = $(this).text();
    console.log("empty");
    $("#artist-input").val(faveArtist);
    console.log("empty");
    var artist = $("#artist-input").val().toLowerCase().trim();
    console.log("empty");
    getArtistTrack(artist);
    console.log("empty");
    getEvents(artist);
    console.log("empty");
    // getGiphy();
      
  }); 
});
  function getEvents(artist) {
    // Running an initial search to identify the artist's unique Spotify id
     // artist = artist.replace(" ", "+");
     var queryURL2 = "https://api.eventful.com/json/events/search?keywords=" + artist + "+music&where=34.0522,-118.2437&within=25&sort_order=popularity&date=Future&app_key=6Gn8mQPcGM5pV65S";
    
    $.ajax({
      url: queryURL2,
      dataType: 'jsonp',
      method: "GET"
    }).done(function(response) {
      var results = response.events.event
      //console.log(results);
      // Printing the entire object to console
      for (var i = 0; i < results.length; i++) {
     
      var printout = results[i].title;
      var date = results[i].start_time;
      var dateformatted =  moment(date).format('MMMM Do YYYY, h:mm a');
      var name = results[i].venue_name;
      var address = results[i].venue_address;
      var url = results[i].url
      var individualResultDiv = $("<a>");
      // individualResultDiv.append('<p>' + printout + '    ' + name + '    ' + address + '    ' + date + '</p>');
      individualResultDiv.append(printout);
      individualResultDiv.append(" / " + name);
      individualResultDiv.append(" / " + address);
      individualResultDiv.append(" / " + dateformatted + "</p>");
      individualResultDiv.addClass(".individualResult");
      individualResultDiv.attr("href", url);
        $("#dates").append(individualResultDiv);
        //$(".fill").append('<p>' + printout + '    ' + name + '    ' + address + '    ' + date + '</p>');
      }
    });
  };
  function getTwitter(artist) {
    artist = artist.replace(" ", "");
  var url =  "https://twitter.com/" + artist;
      var individualResultDiv2 = $("<a>");
      individualResultDiv2.addClass("twitter-timeline");
      individualResultDiv2.attr("data-lang", "en");
      individualResultDiv2.attr("data-height", "500");
      individualResultDiv2.attr("data-theme", "dark");
      individualResultDiv2.attr("href", url);
      
      //individualResultDiv.addClass(".individualResult");
  $("#feed").append(individualResultDiv2);

};

});