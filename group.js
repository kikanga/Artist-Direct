
var song = "bad";
$.ajax({
        url: "https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_track=" +song+ "&quorum_factor=1&apikey=87e46902a4a69ad7b53171b8778c9ebf",
        method: 'GET',
        dataType: 'jsonp'
}).done(function(response){
  console.log(response.message.body.track_list[0].track.track_id);
  var id = response.message.body.track_list[0].track.track_id;
  
  $.ajax({
    url: "https://api.musixmatch.com/ws/1.1/track.lyrics.get?format=jsonp&callback=callback&track_id="+id+"&apikey=87e46902a4a69ad7b53171b8778c9ebf",
    method: 'GET',
    dataType: 'jsonp'
  }).done(function(response){
    console.log(response.message.body.lyrics.lyrics_body);

  });
});

