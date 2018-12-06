$("#btn_start").click(function(){
    $("#start").remove();
    $("#next").remove();
    $("#finish").remove();
    $("#game").show();
    
    initGame(Game.level);
})

function loadNextPage()
{
    
    $("#next").show();
    $("#game").remove();
    
    if(Game.level>3)
    {
   
    $("#btn_next").val("PLAY AGAIN")
        
    }
   else{
         $("#btn_next").val("NEXT LEVEL")
   }

    
}

//$("#get_score").text(getScore);
$("#btn_next").click(function(){
    
    $("#start").remove();
    
    $("#finish").remove();
    $("#next").show();
    $("#game").remove();
    if($("#btn_next").val()=="PLAY AGAIN")
    {
         Game.level=1;
        initGame(Game.level-1);
        //win and btn try again
    }
    else{
        Game.level++;
        initGame(Game.level-1);
    }
       
})