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