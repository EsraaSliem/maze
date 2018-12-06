var beasts = [];
var dengerousSound = [];


function Position(x, y) {
    this.xPosition = x;
    this.yPosition = y;
    this.draw = function () {
    }
    this.remove = function () {
        if (((this.xPosition >= (MyObject.xPosition - cameraX) && this.xPosition <= (MyObject.xPosition + cameraX + 1)) && (this.yPosition >= (MyObject.yPosition - cameraY) && this.yPosition <= (MyObject.yPosition + cameraY))))
            $("#" + this.xPosition + "_" + this.yPosition + "").remove();
    }

}
function Wall(x, y) {
    this.xPosition = x;
    this.yPosition = y;
    this.draw = function () {
        $('#game_content').append("<img id='" + this.xPosition + "_" + this.yPosition + "'>")
        $("#" + this.xPosition + "_" + this.yPosition + "").css({ "width": "45px", "content": "url('images/wall_" + Game.level + ".png')",
         "top": ((this.yPosition - (MyObject.yPosition - cameraY)) * yCell + yShift),
          "left": ((this.xPosition - (MyObject.xPosition - cameraX)) * xCell + xShift) })

    }
}
Wall.prototype = new Position();

function Beast(x, y) {
    this.id;
    this.creation = {
        firstX: x,
        firstY: y
    }
    this.xPosition = x;
    this.yPosition = y;

    this.moveCounter = 0;
    this.timer;
    this.animate = function (diraction) {
        if (!Game.isGameInResetProgress) {
            var _this = this;
            if (this.moveCounter < 45) {
                switch (diraction) {
                    case 0:
                        $("#beast_" + this.id).css({ "left": "+=1px" });
                        $("#beast_" + this.id).attr("src","images/beast_1_"+Math.floor(this.moveCounter/2.5)+".png");
                        break;
                    case 1:
                        $("#beast_" + this.id).css({ "left": "-=1px" });
                        $("#beast_" + this.id).attr("src","images/beast_3_"+Math.floor(this.moveCounter/2.5)+".png");
                        break;
                    case 2:
                        $("#beast_" + this.id).css({ "top": "+=1px" });
                        $("#beast_" + this.id).attr("src","images/beast_2_"+Math.floor(this.moveCounter/2.5)+".png");
                        break;
                    case 3:
                        $("#beast_" + this.id).css({ "top": "-=1px" });
                        $("#beast_" + this.id).attr("src","images/beast_0_"+Math.floor(this.moveCounter/2.5)+".png");
                        break;
                }
                this.moveCounter++;
                setTimeout(function () {
                    _this.animate(diraction);
                }, this.stepSpeed);
            }
            else {
                this.moveCounter = 0;
                this.timer = setTimeout(function () {
                    _this.autoMove();
                }, this.speed)
            }
        }
    };
    this.diractionMovement = function (random) {
        if (!Game.isGameInResetProgress) {
            var _this = this;
            var isMove = false;
            if ((this.xPosition <= this.creation.firstX + 5) && (this.xPosition >= this.creation.firstX - 5) && (this.yPosition <= this.creation.firstY + 5) && (this.yPosition >= this.creation.firstY - 5))
                switch (random) {
                    case 0:
                        if (this.xPosition == this.creation.firstX + 5) {
                            random++;
                        }
                        else {
                            isMove = this.move(1, 0);
                            break;
                        }
                    case 1:
                        if (this.xPosition == this.creation.firstX - 5) {
                            random++
                        }
                        else {
                            isMove = this.move(-1, 0)
                            break;
                        }
                    case 2:
                        if (this.yPosition == this.creation.firstY + 5) {
                            random++;
                        }
                        else {
                            isMove = this.move(0, 1)
                            break;
                        }
                    case 3:
                        if (this.yPosition == this.creation.firstY - 5) {
                        }
                        else {
                            isMove = this.move(0, -1)
                            break;
                        }
                }
            if (isMove)
                this.animate(random);
            else
                this.timer = setTimeout(function () {
                    _this.autoMove();
                }, this.speed )

            return isMove;
        }
    };
    this.draw = function () {
        $('#game_content').append("<img class ='beast' id='beast_" + this.id + "' src='images/beast_1.png'>")
        $("#beast_" + this.id).css({ "top": ((this.yPosition - (MyObject.yPosition - cameraY)) * yCell), "left": ((this.xPosition - (MyObject.xPosition - cameraX + this.id)) * xCell) })
        this.autoMove();
    };

    this.remove = function () {
        $("#beast_" + this.id).remove();
    };
    this.autoMove = function () {
        if (Math.abs(this.creation.firstX - MyObject.xPosition) <= 5 && Math.abs(this.creation.firstY - MyObject.yPosition) <= 5) {
            if (dengerousSound.length == 0 && dengerousSound.findIndex(x => x.id == this.id) == -1) {
                Game.sounds.background.pause();
                Game.sounds.attack.play();
                dengerousSound.push(this);
            }
            this.wherePlayer();
        }
        else {
            var index = dengerousSound.findIndex(x => x.id == this.id)
            if (index != -1) {
                dengerousSound.splice(index, 1);
            }
            if (dengerousSound.length == 0) {
                if (Game.sounds.attack.isSoundPlayed())
                    Game.sounds.attack.stop();
                if (!Game.sounds.background.isSoundPlayed())
                    Game.sounds.background.play();
            }

            var num = Math.floor((Math.random() * 10 % 4));
            this.diractionMovement(num);
        }
    };

    this.wherePlayer = function () {
        //change move if found wall toward player not rundom 
        //these function or its parent  (auto move) or its child  got a problem
        //the problem happen when beast found obstacles toward player i think
        if (MyObject.xPosition > this.xPosition && !(Game.objects[this.xPosition + 1][this.yPosition] instanceof Wall))
            this.diractionMovement(0)
        else if (MyObject.xPosition < this.xPosition && !(Game.objects[this.xPosition - 1][this.yPosition] instanceof Wall))
            this.diractionMovement(1)
        else if (MyObject.yPosition > this.yPosition && !(Game.objects[this.xPosition][this.yPosition + 1] instanceof Wall))
            this.diractionMovement(2)
        else if (MyObject.yPosition < this.yPosition && !(Game.objects[this.xPosition][this.yPosition + 1] instanceof Wall))
            this.diractionMovement(3)
        else
        {
            var num = Math.floor((Math.random() * 10 % 4));
            this.diractionMovement(num);
        }

    };

    this.move = function (_x, _y) {
        if (!(Game.objects[this.xPosition + _x][this.yPosition + _y] == MyObject)) {
            return this.swap(_x, _y)
        }
        else {
            lossingResetGameProgress();
            return false;
        }

    };

    this.swap = function (_x, _y) {
        if (!((Game.objects[this.xPosition + _x][this.yPosition + _y] instanceof Wall) || (Game.objects[this.xPosition + _x][this.yPosition + _y] instanceof Beast))) {
            var temp = Game.objects[this.xPosition + _x][this.yPosition + _y]
            temp.xPosition = this.xPosition;
            temp.yPosition = this.yPosition;
            Game.objects[this.xPosition + _x][this.yPosition + _y] = Game.objects[this.xPosition][this.yPosition];
            Game.objects[this.xPosition][this.yPosition] = temp;
            this.xPosition += _x;
            this.yPosition += _y;
            return true;
        }
        return false;
    };


}

Beast.prototype = new Position();
Beast.prototype.speed = 600;
Beast.prototype.stepSpeed = 15;

