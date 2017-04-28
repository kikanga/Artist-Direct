$("#button").on("click",function(){
  console.log("clicked");
  $("#lyrics").empty();
  var song = "migos"; 
  var src = "http://www.lyrics.com/lyrics/"+song;
  $('<iframe>').attr("src", src).attr("height",300).attr("width",300).appendTo('#lyrics');
  
 

});
$(document).ready(function(){
	$("#search").lettering();
})
