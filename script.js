$(document).ready(function() {
  
  var colord;
  
  function bar() {
    $("#search").parent().toggleClass("col-6 col-9");
    $("#random").parent().toggleClass("col-6 col-3");
    $("#random").css("right", "-20%");
    $("#bar").fadeIn(200);
  }

  function color() {
    var h = Math.round(Math.random() * 360);
    var s = Math.round(Math.random() * 30) + 40;
    var l = Math.round(Math.random() * 25) + 25;
    colord = "hsl(" + h + "," + s + "%," + l + "%)";
    var colorl = "hsl(" + h + "," + s + "%," + l * 1.3 + "%)";
    $(".main").css("background-color", colord);
    $("button,body").css("background-color", colorl);
  }

  color();
  $("#bar").hide();

  $("#search").click(function() {
    $(this).fadeOut(200);
    color();
    $("#random").animate({ right: "-300%" }, 300, "linear", bar);
  });

  $("#random").click(function() {
    $("#placeholder").hide();
    $("a").remove();
    color();
    $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnnamespace=0&rnlimit=10&callback=?",function(a){
      for(i=0;i<10;i++){
        var art=a.query.random[i].title;
        $.getJSON("https://en.wikipedia.org/w/api.php?format=json&action=query&list=search&srsearch="+art+"&callback=?", function(b){
           $("#placeholder").append("<a href=\"https://en.wikipedia.org/wiki/"+b.query.search[0].title+"\" target=\"_blank\"><div class=\"main container well\" style=\"width:90%;background-color:"+colord+";margin-bottom:0%;padding:2%\"><h3 style=\"text-align:left\">"+b.query.search[0].title+"</h3><p style=\"text-shadow:0px 0px white; text-align:left; font-family:Arial\">"+b.query.search[0].snippet+"</p></div></a>").fadeIn(1000);
        })
      }
    });
  });

  $("#random, #search").mouseenter(function() {
    $(this).animate({ bottom: "5px" }, "fast");
  });
  $("#random, #search").mouseleave(function() {
    $(this).animate({ bottom: "0px" }, "fast");
  });
  
  $("#bar").submit(function(){
    $("#placeholder").hide();
    $("a").remove();
    var input=$("input").val();
    color();
    $.getJSON("https://en.wikipedia.org/w/api.php?format=json&action=query&list=search&srsearch="+input+"&callback=?", function(a){
      for(i=0;i<10;i++){
       $("#placeholder").append("<a href=\"https://en.wikipedia.org/wiki/"+a.query.search[i].title+"\" target=\"_blank\"><div class=\"main container well\" style=\"width:90%;background-color:"+colord+";margin-bottom:0%;padding:2%\"><h3 style=\"text-align:left\">"+a.query.search[i].title+"</h3><p style=\"text-shadow:0px 0px white; text-align:left; font-family:Arial\">"+a.query.search[i].snippet+"</p></div></a>").fadeIn(1000);
      }    
    }
    )
  })
});
