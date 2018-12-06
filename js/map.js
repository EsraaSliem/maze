//fix these map problem.
var  player = { x:0 , y:0 }, i, maze = document.getElementById('maze'), win;
function mapToHTML(map1) {
    var html = '', x, y, dictionary = {
        'W': '<span class="tile wall">W</span>',
        'B': '<span class="tile floor">B</span>',
        
        '.': '<span class="tile floor">B</span>',
        '@': '<span class="tile player">@</span>',
        'X': '<span class="tile goal">X</span>'
    };
    for (y = 4; y < 20; y += 1) {
        for (x = 10; x < 60; x += 1) {
            html += dictionary[map1[y][x]];
        }
        html += '<br>';
    }
    return html;
}
 f=0;
function updateMap(map1) {
    var displayMap = [], x, y;
    for (y = 4; y < 20; y += 1) {
        displayMap[y] = displayMap[y] || [];
        
        for (x = 10; x < 60; x += 1) {
            if(map1[y][x]!='@'){
             //   player.x=x;
               // player.y=y;
            displayMap[y][x] = map1[y][x];
            }
            else
               {
                   
                displayMap[y][x]='.'
                if(f==0)
                    {
                player.x=x;
                   player.y=y;
                        f=1;
                    }
               }
        }
    }
   displayMap[player.y][player.x] = '@';
    for (y = 0; y < displayMap.length; y += 1) {
        displayMap[y] = displayMap[y];
    }
    maze.innerHTML = mapToHTML(displayMap);
}
function playerMove(x, y) {
    var toX = player.x + x, toY = player.y + y;
    if (map[Game.level-1][toY][toX] === '.' || map[Game.level-1][toY][toX] === 'X') {
        player.x = toX;
        player.y = toY;
    }
    updateMap(map[Game.level-1]);
}


    