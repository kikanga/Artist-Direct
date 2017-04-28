$("#button").on("click",function(){
  console.log("clicked");
  $("#lyrics").empty();
  var song = "migos"; 
  var src = "http://www.lyrics.com/lyrics/"+song;
  $('<iframe>').attr("src", src).attr("height",700).attr("width",700).appendTo('#lyrics');
  
 
});

