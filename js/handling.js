$("#btn_start").click(function(){
    $("#start").hide();
    $("#next").hide();
    $("#losing").hide();
    $("#game").show();
    
    initGame(Game.level);
})

function loadNextPage()
{
    
    $("#next").show();
    $("#game").hide();
     $("#get_score").text("");
    $("#get_score").text(MyObject.getMyScore());
    if(Game.level==3)
    {
   
    $("#btn_next").val("PLAY AGAIN")
        
    }
   else{
         $("#btn_next").val("NEXT LEVEL")
   }

    
}


$("#btn_next").click(function(){
    
 
    $("#next").hide();
  $("#game").show();
       
    if(Game.level==3)
    {
     
        document.location.reload();
        
        //win and btn try again
    }
    else{
        Game.level++;
        initGame(Game.level);
    }
       
})
function loadlosingPage()
{
    
    $("#losing").show();
    $("#game").hide();

}
$("#btn_lose").click(function(){
    
 
    $("#losing").hide();
   
    document.location.reload();
       
 
       
})

