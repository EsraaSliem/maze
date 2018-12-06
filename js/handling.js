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
    if(Game.level>3)
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
       
    if(Game.level>3)
    {
     
         Game.level=0;
        initGame(Game.level);
        
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
     $("#get_score").text("");
    $("#get_score").text(MyObject.getMyScore());
    if(Game.level>3)
    {
   
    $("#btn_next").val("PLAY AGAIN")
        
    }
   else{
         $("#btn_next").val("NEXT LEVEL")
   }

    
}
