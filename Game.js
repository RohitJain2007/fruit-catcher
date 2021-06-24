class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500);
    player1.debug="true"
    player1.addImage("player1",player_img);
    player2 = createSprite(800,500);
    player2.debug="true"
    player2.addImage("player2", player_img);
    players=[player1,player2];

        }
    
    play(){
        
        form.hide();

        Player.getPlayerInfo();
        image(back_img, 0, 0, 1000, 800);
        var x =100;
        var y=200;
        var index =0;
        drawSprites();

        for(var plr in allPlayers){
        
            index = index+1;
            x = 500-allPlayers[plr].distance;
            y=500;
            
            players[index -1].x = x;
            players[index - 1].y = y;
            textAlign(CENTER);
            textSize(20);
            text(allPlayers[plr].name, players[index - 1].x, players[index - 1].y + 75)
            textSize(35)
            fill("white")
            text("Player 1 :"+allPlayers.player1.score,50,50 )
            text("Player 2 :"+allPlayers.player2.score,50,100 )
            // Differentiate the main player by printing
            // the name of the player on the basket. 

        }


        // Give movements for the players using arrow keys
 if (keyDown(RIGHT_ARROW)){
     player.distance=player.distance-10
     player.update()

 }
 if (keyDown(LEFT_ARROW)){
    player.distance=player.distance+10
    player.update()
 }
    

        // Create and spawn fruits randomly
if (frameCount%20===0){
    fruits=createSprite(random(10,100),0,100,100)
    fruits.velocityY=9
    var rand=Math.round(random(1,5))
switch (rand) {
    case 1:fruits.addImage(fruit1_img)
        
        break;
        case 2:fruits.addImage(fruit2_img)
        
        break;
        case 3:fruits.addImage(fruit3_img)
        
        break;
        case 4:fruits.addImage(fruit4_img)
        
        break;
        case 5:fruits.addImage(fruit5_img)
        
        break;
    default:
        break;
}
fruitGroup.add(fruits)
}
    if(player.index!==null){
        for(var i= 0;i<fruitGroup.length;i=i+1){
            if(fruitGroup.get(i).isTouching(players)){
                fruitGroup.get(i).destroy()
                player.score=player.score+1
                player.update()
            }
        }
    }    
    }

    end(){
       console.log("Game Ended");
    }
}