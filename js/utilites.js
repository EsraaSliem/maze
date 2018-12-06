$('html').keydown(function (e) {
    var x = 0, y = 0;
    if (e.which == 40) {
        y++
    }
    else if (e.which == 38) {
        y--;
    }
    else if (e.which == 37) {
        x--
    }
    else if (e.which == 39) {
        x++;
    }
    playerMove(x, y)
    MyObject.moveStep(x, y);

})


function mapToObject(map) {
    var x, y, dictionary = {
        //wall  (Just for note)*
        'W': function () {
            return new Wall(x, y)
        },//space(can walk)  (Just for note)*
        '.': function () {
            return new Position(x, y)
        },//beast  (Just for note)*
        'B': function () {
            return new Beast(x, y)
        },//win(objective)  (Just for note)*
        'X': function () {
            return new Position(x, y)
        },//person   (Just for note)*
        '@': function () {
            MyObject.xPosition = x;
            MyObject.yPosition = y;
            return MyObject;
        }
    };
    for (y = 0; y < map.length; y += 1) {
        for (x = 0; x < map[y].length; x += 1) {
            Game.objects[x][y] = dictionary[map[y][x]]();
            if (Game.objects[x][y] instanceof Beast) {
                beasts.push(Game.objects[x][y]);
            }
        }
    }
}


function initGame(level) {
    if(MyObject.lives==0){
        winStopGameProgress();
         loadlosingPage();
        return;
    }
    for (var i = 0; i < beasts.length; i++) {
        beasts[i].remove();
    }
    if(Game.objects[0][0] instanceof Position)//check if game empty (Just for note)*
         Game.Remove();
    MyObject.steps=0;
    beasts.splice(0,beasts.length);//remove all items (Just for note)*
    Game.isGameInResetProgress=false;
    Game.sounds.background.stop();
    Game.sounds.attack.stop();

    Game.sounds.background.play();
    document.getElementById('maze').innerHTML="";
    f=0;
   switch (level) {
        case 1:
        Beast.prototype.stepSpeed=15;
        Beast.prototype.speed=200;
            break;
        case 2:
        Beast.prototype.stepSpeed=10;
        Beast.prototype.speed=100;
            break;
        case 3:
        Beast.prototype.stepSpeed=5;
        Beast.prototype.speed=50;
            break;
    }
    $("#game_content").css("background-image","url('images/background_"+level+".png')");
    $('#level_text').text("Level "+level);
    document.getElementById("lives_value").innerHTML= MyObject.lives;
    mapToObject(map[level-1]);
    updateMap(map[level-1]);
    for (var i = 0; i < beasts.length; i++) {
        beasts[i].id = i;
        beasts[i].draw();
    }
    MyObject.moveStep(0, 0);
}



function lossingResetGameProgress() {
    if (!Game.isGameInResetProgress) {
        Game.isGameInResetProgress = true;
        MyObject.lives--;
        beasts.forEach(item =>
            clearTimeout(item.timer)
        )
        setTimeout(function(){
            initGame(Game.level);
        }, 300);
     
    }
}
function winStopGameProgress() {
    Game.isGameInResetProgress = true;
    Game.sounds.background.stop();
    Game.sounds.attack.stop();
    beasts.forEach(item =>
        clearTimeout(item.timer)
    )

}













