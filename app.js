$(document).ready(function() {
  
 
  $("#submit").on("click", function(event) {
    event.preventDefault();
    $("#player").empty();
    $("#profile").empty();
    $("#spotify-header").html("Top Songs");
    //brings up spotify top songs
    var artist = $("#artist-input").val().trim();
    getEvents(artist);

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
