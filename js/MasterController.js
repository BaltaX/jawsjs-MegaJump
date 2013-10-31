function PlayState() {
    var m_mainModel;
    var m_mainView;
    var m_backgroundTrack = jaws.assets.get("js/Assets/Soundtrack2.mp3");

    var player;
    var goal;
    var apa1 = 98;
    this.getNumberOfCoins = function () { return m_mainModel.getNumberOfCoins(); }; //Use getters to let states communicate
    this.setup = function () {
        m_mainView = new MainView();
        m_mainModel = new MainModel();
        m_backgroundTrack.play();

    };



    //This method is called 30 times a second
    //Here we can change x and y coordinates, color etc
    this.update = function () {
        //Check for user input
        if (jaws.pressed("left")) { m_mainModel.movePlayerLeft(); }
        if (jaws.pressed("right")) { m_mainModel.movePlayerRight(); }

        //console.log(jaws.game_loop.tick_duration/1000);
        m_mainModel.update(jaws.game_loop.tick_duration / 1000);
        if (m_mainModel.getLevelCleared()) { jaws.switchGameState(MenuState); }
        if (m_mainModel.getGameOver()) {
            //Get numberofcoins

            jaws.switchGameState(GameOverState);
        }

    };

    //And every time update has been called, draw is called also
    this.draw = function () {

        m_mainView.Draw(m_mainModel);
    };
}




function MenuState() {
    var m_bg = new jaws.Sprite({ image: "js/Assets/MenuBackground.jpg", x: 0, y: 0 });

    jaws.clear();

    m_bg.x = 0;
    m_bg.y = 0;

    this.draw = function () {
        if (jaws.pressed("enter")) { jaws.switchGameState(PlayState); }
        m_bg.draw();

        //if (jaws.pressedWithoutRepeat("left_mouse_button")) { alert("Du klickadepå X: "+jaws.mouse_x); }
    }
}




function GameOverState() {
    var i = 0;
    var xmlData;
    var writeAtLine = 0;
    this.setup = function () {
    //Load highscore data
        $.ajax({
            type: "GET",
            url: "getHighScores.aspx",
            dataType: "xml",
            success: function (xml) { xmlData = xml; }
        });


    }

    this.draw = function () {
        var m_gameOver = new jaws.Sprite({ image: "js/Assets/gameOver.png", x: 0, y: 200 });
        //Continue to draw game where it ended
        jaws.previous_game_state.draw();
        m_gameOver.draw();
        jaws.context.font = "bold 20pt terminal";
        jaws.context.lineWidth = 20
        jaws.context.fillStyle = "White";
        //jaws.context.strokeStyle = "rgba(200,200,200,0.0)"
        //jaws.context.fillText("Du fixade ihop " + jaws.previous_game_state.getNumberOfCoins() + " pengar!", 300, 200)
        //console.log("Du samlade ihop " + jaws.previous_game_state.getNumberOfCoins() + " pengar!"); //By this the states can communicate like different classes

        if (jaws.pressedWithoutRepeat("space")) { jaws.switchGameState(MenuState); }

        $('Highscore', xmlData).each(function (i) {
            writeAtLine++;
            var Name = $(this).find('Name').text();
            var Score = $(this).find('Score').text();
            jaws.context.fillText(Name, 230, 410 + (writeAtLine * 30));
            jaws.context.fillText(Score, 400, 410 + (writeAtLine * 30));

            console.log(writeAtLine);
        });
        writeAtLine = 0;

    }
}




jaws.onload = function () {
    //Add the assets here
    jaws.assets.add("js/Assets/coin.png");
    jaws.assets.add("js/Assets/empty.png");
    jaws.assets.add("js/Assets/brick.png");
    jaws.assets.add("js/Assets/star.png");
    jaws.assets.add("js/Assets/fog.png");
    jaws.assets.add("js/Assets/Megaman.png");
    jaws.assets.add("js/Assets/bgLevelA.jpg");
    jaws.assets.add("js/Assets/coin.mp3");
    jaws.assets.add("js/Assets/coin1.mp3");
    jaws.assets.add("js/Assets/coin2.mp3");
    jaws.assets.add("js/Assets/coin3.mp3");
    jaws.assets.add("js/Assets/coin4.mp3");
    jaws.assets.add("js/Assets/coin5.mp3");
    jaws.assets.add("js/Assets/coin6.mp3");
    jaws.assets.add("js/Assets/coin7.mp3");
    jaws.assets.add("js/Assets/coin8.mp3");
    jaws.assets.add("js/Assets/coin9.mp3");
    jaws.assets.add("js/Assets/coin10.mp3");
    jaws.assets.add("js/Assets/Soundtrack2.mp3");
    jaws.assets.add("js/Assets/starSound.wav");
    jaws.assets.add("js/Assets/MenuBackground.jpg");
    jaws.assets.add("js/Assets/scoreboard.png");
    jaws.assets.add("js/Assets/Bricksound.mp3");
    jaws.assets.add("js/Assets/Bricksound2.mp3");
    jaws.assets.add("js/Assets/Bricksound3.mp3");
    jaws.assets.add("js/Assets/gameOver.png");
    jaws.assets.add("js/Assets/end.mp3");
    jaws.start(MenuState);
};