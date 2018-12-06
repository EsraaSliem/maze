var maxX = 71;
var maxY = 24;
var cameraX = 8;
var cameraY = 4;
var xCell = 45;
var yCell = 45;
var yShift = 162;
var xShift = 40;



var Game = {
     level: 1,
     objects: new Array(maxX),
     isGameInResetProgress: false,
     Draw: function () {
          for (var i = MyObject.xPosition - cameraX; i <= MyObject.xPosition + cameraX; i++) {
               for (var j = MyObject.yPosition - cameraY; j <= MyObject.yPosition + cameraY; j++) {
                    if (!(this.objects[i][j] instanceof Beast))
                         this.objects[i][j].draw();
               }
          }
     },
     Remove: function () {
          for (var i = MyObject.xPosition - cameraX; i <= MyObject.xPosition + cameraX; i++) {
               for (var j = MyObject.yPosition - cameraY; j <= MyObject.yPosition + cameraY; j++) {
                    if (!(this.objects[i][j] instanceof Beast))
                         this.objects[i][j].remove();
               }
          }

     },
     sounds: {
          background: new MyAudio('sounds/background.mp3'),
          attack: new MyAudio('sounds/attack.mp3')
     }
}
for (var index = 0; index < maxX; index++)
     Game.objects[index] = new Array(maxY)


var moveAllBeasts = function (x, y) {
     if (x == 1) {
          for (var i = 0; i < beasts.length; i++) {
               $("#beast_" + i).css({ "left": "-=45px" })
          }
     }
     else if (x == -1) {
          for (var i = 0; i < beasts.length; i++) {
               $("#beast_" + i).css({ "left": "+=45px" })
          }
     }
     if (y == 1) {
          for (var i = 0; i < beasts.length; i++) {
               $("#beast_" + i).css({ "top": "-=45px" })
          }
     }
     else if (y == -1) {
          for (var i = 0; i < beasts.length; i++) {
               $("#beast_" + i).css({ "top": "+=45px" })
          }
     }
}


var MyObject = {
     xPosition: 0,
     yPosition: 0,
     steps: 0,
     lives: 3,
     currentDirection:0,
     moveStep: function (x, y) {
          if( (Game.objects[this.xPosition + x][this.yPosition + y] instanceof Beast))
          {
               lossingResetGameProgress();
               return
          }
          Game.Remove();
          if (!((Game.objects[this.xPosition + x][this.yPosition + y] instanceof Wall))) {
               var temp = Game.objects[this.xPosition + x][this.yPosition + y]
               temp.xPosition = this.xPosition;
               temp.yPosition = this.yPosition;
               Game.objects[this.xPosition + x][this.yPosition + y] = Game.objects[this.xPosition][this.yPosition];
               Game.objects[this.xPosition][this.yPosition] = temp;
          }
          if (!((Game.objects[this.xPosition + x][this.yPosition + y] instanceof Wall))) {
               if (this.xPosition + x - cameraX >= 0 && this.xPosition + x + cameraX + 1 <= maxX)
                    this.xPosition += x;
               if (this.yPosition + y - cameraY >= 0 && this.yPosition + y + cameraY < maxY)
                    this.yPosition += y;
               if(x==1)
                    this.currentDirection=1;
               else if(x==-1)
                    this.currentDirection=3;
               else if(y==1)
                    this.currentDirection=2;
               else if(y==-1)
                    this.currentDirection=0;
               this.steps++;
               moveAllBeasts(x, y);
          }
          


          if((map[Game.level-1][this.yPosition][this.xPosition] == 'X'))
          {
              winStopGameProgress();
            
               loadNextPage() ;  
              
               //win---> show dialog next level
              
          }
         else{
             
          Game.Draw();
          document.getElementById("count_value").innerHTML=this.steps;
          document.getElementById("score_value").innerHTML= MyObject.getMyScore();
         }


     },
     draw: function () {
          $('#game_content').append("<img id='person'>")
          $("#person").css({ "width": "45px", "content": "url('images/player_"+this.currentDirection+"_0.png')", "top": cameraY * yCell + yShift, "left": (cameraX * xCell + xShift) })
     },
     remove: function () {
          $("#person").remove();
     },
     getMyScore: function () {
          //put (calculate) these ratio 
          if (this.steps >= 150)
               return "Too Bad"
          else if (this.steps <= 150 && this.steps > 130)
               return "Bad"
          else if (this.steps <= 130 && this.steps > 110)
               return "Good"
          else if (this.steps <= 110 && this.steps > 80)
               return "Very Good"
          else if (this.steps > 0 && this.steps <= 80 )
               return "Exellent"
          return ""
     }


}

function MyAudio(path) {
     this.audio = audioInit(path);
     this.play = function () {
          this.audio.play();
     }
     this.pause = function () {
          this.audio.pause();
     }
     this.stop = function () {
          this.audio.pause();
          this.audio.load();
     }
     this.isSoundPlayed = function () {
          return !this.audio.paused;
     }
}
function audioInit(path) {
     var audio = new Audio(path);
     audio.addEventListener('ended', function () {
          this.currentTime = 0;
          this.play();
     }, false);
     return audio;
}


