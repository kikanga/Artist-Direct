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
      favorites: [],
  });
    // clear text-boxes
    $("#userEmail").val("");
    $("#userPass").val("");
    // Prevents page from refreshing
    return false;   
    $("#registerForm").remove();
  });

//Submit Button runs all AJAX functions 
  $("#submit").on("click", function(submit) {
    // getGiphy();
    $("#registerForm").remove();
 

});
  });


  