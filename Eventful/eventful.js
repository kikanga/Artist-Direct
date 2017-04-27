//xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
//xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
//xhr.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');


  function getArtistTrack(artist) {

    // Running an initial search to identify the artist's unique Spotify id
     var queryURL2 = "http://api.eventful.com/json/events/search?keywords=" + artist + "+music&where=34.0522,-118.2437&within=25&sort_order=popularity&date=Future&app_key=6Gn8mQPcGM5pV65S";
    
    $.ajax({
      url: queryURL2,
      dataType: 'jsonp',
      method: "GET"
    }).done(function(response) {

      var results = response.events.event
      // Printing the entire object to console
      for (var i = 0; i < results.length; i++) {

        console.log(response)
      console.log(response.events.event[i].description);

      
      var printout = response.events.event[i].title;
      var date = response.events.event[i].start_time;







        $(".fill").html('<p>' + printout + '</p>');
        $(".dateHTML").html('<p>' + date + '</p>');
      }
      });
    };
  

  // Event handler for user clicking the select-artist button
  $("#select-artist").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the artist name
    var artist = $("#artist-input").val().trim();

    // Running the getArtistTrack (passing in the artist as an argument)
    getArtistTrack(artist);

  });
