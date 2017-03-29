$(function() {
  var numArray = [];
  var colorArr = ["BlueViolet", "CadetBlue", "Crimson", "DarkGoldenRod", "Gold", "Tomato", "Silver", "RebeccaPurple", "Orange", "Maroon", "LightSteelBlue", "LightSeaGreen", "LightGray"];
  var initialQuote = "<p>It does not matter how slowly you go as long as you do not stop</p> - Confucius";
  $("#tweet").attr({"href": "http://twitter.com/intent/tweet?text=" + initialQuote});
  
  $("#random").on("click", function() {
    var randomColor = Math.floor(Math.random() * colorArr.length); 
    /*$(".container-fluid").css("background-color", colorArr[randomColor]);*/
    $("#date").fadeOut();  
    $("#quote-box").html("");
    $(".container-fluid").hide().fadeIn();
    
    //Retrieve 40 quotes from quotes API, randomize, and prevent quotes from reappearing
    $.getJSON("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=40", function(data) {
      var random = Math.floor(Math.random() * data.length);
      if (numArray.indexOf(random) === -1){
        numArray.push(random);
        var message = data[random].content;
        message += "- " + data[random].title;                     
        $("#quote-box").html(message);
      } 
      else {
        while(numArray.indexOf(random) !== - 1) {
          random = Math.floor(Math.random() * data.length);
          if (numArray.indexOf(random) === - 1) {
            numArray.push(random);
            message = data[random].content;
            message += "- " + data[random].title;
            $("#quote-box").html(message);
            break;
          }  
        }
      } 
      //Start over once all quotes have been shown
      if (numArray.length === data.length) {
        numArray.splice(0, 40);
      }
      $("#tweet").attr({"href": "http://twitter.com/intent/tweet?text=" + message});
    });
  });
  
  //Retrieve quote of the day
  $("#qod").on("click", function() {
    var today = new Date();
    var todayStr = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
    $.getJSON("https://quotes.rest/qod.json", function(data) {
      $(".container-fluid").hide().fadeIn();
      var quoteOfDay = data.contents.quotes[0].quote + "</br>" + "- " + data.contents.quotes[0].author
      $("#quote-box").html(quoteOfDay);
      $("#tweet").attr({"href": "https://twitter.com/intent/tweet?text=" + quoteOfDay});
      $("#date").html(todayStr);
      $("#date").fadeIn();
    });
  });
});