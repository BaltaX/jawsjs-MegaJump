function MainView() {

    //Declare member variables

    var m_coin;
    var m_empty;
    var m_brick;
    var m_star;
    var m_viewport;
    var m_fog;
    var m_wasLoaded;
    var m_tileWidth;
    var m_tileHeight;
    var m_player;
    var m_brickSound = jaws.assets.get("js/Assets/coin.mp3");
    var m_brickSound1 = jaws.assets.get("js/Assets/coin1.mp3");
    var m_brickSound2 = jaws.assets.get("js/Assets/coin2.mp3");
    var m_brickSound3 = jaws.assets.get("js/Assets/coin3.mp3");
    var m_brickSound4 = jaws.assets.get("js/Assets/coin4.mp3");
    var m_brickSound5 = jaws.assets.get("js/Assets/coin5.mp3");
    var m_brickSound6 = jaws.assets.get("js/Assets/coin6.mp3");
    var m_brickSound7 = jaws.assets.get("js/Assets/coin3.mp3");
    var m_brickSound8 = jaws.assets.get("js/Assets/coin4.mp3");
    var m_brickSound9 = jaws.assets.get("js/Assets/coin5.mp3");
    var m_brickSound10 = jaws.assets.get("js/Assets/coin6.mp3");
    var m_starSound = jaws.assets.get("js/Assets/starSound.wav");
    var m_realBrickSound = jaws.assets.get("js/Assets/Bricksound.mp3");
    var m_realBrickSound2 = jaws.assets.get("js/Assets/Bricksound2.mp3");
    var m_realBrickSound3 = jaws.assets.get("js/Assets/Bricksound3.mp3");
    var m_end = jaws.assets.get("js/Assets/end.mp3");
    var m_highScoresView;
    var m_scoreBoardbg = new jaws.Rect(0, 0, 640, 50);
    var m_scoreboard;
    var m_score_NumberOfCoins;
    var m_bgLevelA = new jaws.Sprite({ image: "js/Assets/bgLevelA.jpg", x: 0, y: 0 });
    var m_gameOverView = new GameOverView();
    var m_levelClearedView = new LevelClearedView();
    var m_currentBrickSound;
    var m_currentRealBrickSound;

    //Initiate variables
    //All assets need to be initialized as variables
    m_coin = new jaws.Sprite({ image: "js/Assets/coin.png", x: 0, y: 0 });
    m_empty = new jaws.Sprite({ image: "js/Assets/empty.png", x: 0, y: 0 });
    m_brick = new jaws.Sprite({ image: "js/Assets/brick.png", x: 0, y: 0 });
    m_star = new jaws.Sprite({ image: "js/Assets/star.png", x: 0, y: 0 });
    m_fog = new jaws.Sprite({ image: "js/Assets/fog.png", x: 0, y: 0 });
    m_player = new jaws.Sprite({ image: "js/Assets/Megaman.png", x: 0, y: 0 });
    m_scoreboard = new jaws.Sprite({ image: "js/Assets/scoreboard.png", x: 0, y: 20 });

    m_currentBrickSound = 0;
    m_currentRealBrickSound = 0;
    m_gameOverView = new GameOverView();
    m_wasLoaded = false;
    m_tileWidth = m_tileHeight = 64;

    //Listen to events
    $(document).on("hitsCoin", function () {
        if (m_currentBrickSound == 0) { m_brickSound.play(); $(".Debug").html("Spelar ljud 0"); }
        else if (m_currentBrickSound == 1) { m_brickSound1.play(); $(".Debug").html("Spelar ljud 1"); }
        else if (m_currentBrickSound == 2) { m_brickSound2.play(); $(".Debug").html("Spelar ljud 2"); }
        else if (m_currentBrickSound == 3) { m_brickSound3.play(); $(".Debug").html("Spelar ljud 3"); }
        else if (m_currentBrickSound == 4) { m_brickSound4.play(); $(".Debug").html("Spelar ljud 4"); }
        else if (m_currentBrickSound == 5) { m_brickSound5.play(); $(".Debug").html("Spelar ljud 5"); }
        else if (m_currentBrickSound == 6) { m_brickSound6.play(); $(".Debug").html("Spelar ljud 6"); }
        else if (m_currentBrickSound == 7) { m_brickSound3.play(); $(".Debug").html("Spelar ljud 3"); }
        else if (m_currentBrickSound == 8) { m_brickSound4.play(); $(".Debug").html("Spelar ljud 4"); }
        else if (m_currentBrickSound == 9) { m_brickSound5.play(); $(".Debug").html("Spelar ljud 5"); }
        else if (m_currentBrickSound == 10) { m_brickSound6.play(); $(".Debug").html("Spelar ljud 6"); }
        m_currentBrickSound++;
        if (m_currentBrickSound == 11) { m_currentBrickSound = 0; }

    });

    $(document).on("hitsStar", function () {
        m_starSound.play();

    });

    $(document).on("gameOver", function () {

        m_end.play();

    });

    $(document).on("hitsBrick", function () {
        if (m_currentRealBrickSound == 0) { m_realBrickSound.play();  }
        else if (m_currentRealBrickSound == 1) { m_realBrickSound2.play();}
        else if (m_currentRealBrickSound == 2) { m_realBrickSound3.play();}
        m_currentRealBrickSound++;
        if (m_currentRealBrickSound == 3) { m_currentRealBrickSound = 0; }
    });

    //Code for drawing GameOver screen
    this.GameOverSetup = function () {
        m_gameOverView.setup();
    }

    this.GameOverDraw = function () {
        m_gameOverView.draw();
    }

    //Code for drawing Level Cleared
    this.LevelClearedSetup = function () {
        m_levelClearedView.setup();
    }

    this.LevelClearedDraw = function () {
        m_levelClearedView.draw();
    }


    this.Draw = function (a_mainModel) {
        if (a_mainModel.getWasLoaded() === false) { return; }

        //If mainmodel was loaded, set viewport limits once
        else if (m_wasLoaded === false) {
            m_viewport = new jaws.Viewport({ max_x: a_mainModel.getLevelWidth() * m_tileWidth, max_y: a_mainModel.getLevelHeight() * m_tileHeight });
            m_wasLoaded = true;
        }

        m_viewport.centerAround(m_player);

        jaws.clear();
        //console.log(a_mainModel.getLevelWidth());
        //console.log(a_mainModel.getLevelHeight());

        //Draw background
        m_bgLevelA.x = m_viewport.x * 0.965;
        m_bgLevelA.y = m_viewport.y * 0.965; //see image parallaxExplain.png in assets on how 0.965 was obtained
        m_viewport.draw(m_bgLevelA);

        //Draw scoreboard background
        //m_ctx.fillRect(0, 0, 640, 40);

        //First draw the tiles
        for (var row = 0; row < a_mainModel.getLevelHeight(); row++) {

            for (var column = 0; column < a_mainModel.getLevelWidth(); column++) {

                //if coin
                if (parseInt(a_mainModel.getTileMap()[row][column]) === 0) {
                    m_coin.x = column * 64;
                    m_coin.y = row * 64;
                    m_viewport.draw(m_coin);
                }

                //if brick
                if (parseInt(a_mainModel.getTileMap()[row][column]) === 3) {
                    m_brick.x = column * 64;
                    m_brick.y = row * 64;
                    m_viewport.draw(m_brick);

                }

                //if star
                if (parseInt(a_mainModel.getTileMap()[row][column]) === 1) {
                    m_star.x = column * 64;
                    m_star.y = row * 64; //m_brick.draw();
                    m_viewport.draw(m_star);

                }

                //if fog
                if (parseInt(a_mainModel.getTileMap()[row][column]) === 5) {
                    m_fog.x = column * 64;
                    m_fog.y = row * 64; //m_brick.draw();
                    m_viewport.draw(m_fog);

                }
                //More if statements here to draw other stuff
            }
        }

        //Then draw megaman
        m_player.x = a_mainModel.getPlayerPositionX() * 64;
        m_player.y = a_mainModel.getPlayerPositionY() * 64;
        m_viewport.draw(m_player);
        //console.log(m_player.y);

        //Then draw scoreboard
        m_scoreboard.draw();

        //Draw scores
        m_score_NumberOfCoins = a_mainModel.getNumberOfCoins();
        jaws.context.font = "bold 10pt terminal";
        jaws.context.lineWidth = 20
        jaws.context.fillStyle = "White";
        //jaws.context.strokeStyle = "rgba(200,200,200,0.0)"
        jaws.context.fillText(m_score_NumberOfCoins, 430, 60)
        jaws.context.fillText(a_mainModel.getCurrentHeight(), 100, 60)
        jaws.context.fillText(a_mainModel.getGameTime()+" s", 260, 60)
        jaws.context.fillText(a_mainModel.getScore(), 590, 60)


        //Move the viewport around manually
        if (jaws.pressed("down")) { m_viewport.move(0, 50); }
        if (jaws.pressed("up")) { m_viewport.move(0, -50); }
        if (jaws.pressed("left")) { m_viewport.move(-3, 0); }
        if (jaws.pressed("right")) { m_viewport.move(3, 0); }

        //Get model coordinates
    }

    this.drawHighscores=function(){
    m_highScoresView.draw();
    }

}