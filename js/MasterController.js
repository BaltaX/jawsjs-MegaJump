function MasterController() {

    //Declare variables
    var m_mainView;
    var m_mainModel;
    var m_initialized;
    var m_currentLevel;

    //Initiate variables
    m_initialized = false;
    m_currentLevel = 0;

    function PlayState() {
        //var m_mainModel;
        //var m_mainView;
        var m_backgroundTrack = jaws.assets.get("js/Assets/Soundtrack2.mp3");

        var player;
        var goal;
        var apa1 = 98;

        this.getNumberOfCoins = function () { return m_mainModel.getNumberOfCoins(); }; //Use getters to let states communicate with jaws.previous_state f e

        this.setup = function () {
            if (!m_initialized) {
                m_mainView = new MainView();
                m_mainModel = new MainModel();
                m_initialized = true;
            }
            m_backgroundTrack.play();
            m_mainModel.setCurrentLevel(m_currentLevel);
        };


        //This method is called 30 times a second
        //Here we can change x and y coordinates, color etc
        this.update = function () {
            //Check for user input
            if (jaws.pressed("left")) { m_mainModel.movePlayerLeft(); }
            if (jaws.pressed("right")) { m_mainModel.movePlayerRight(); }

            //console.log(jaws.game_loop.tick_duration/1000);
            m_mainModel.update(jaws.game_loop.tick_duration / 1000);
            if (m_mainModel.getLevelCleared()) { jaws.switchGameState(LevelClearedState); }
            if (m_mainModel.getGameOver()) {
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
        }
    }


    function GameOverState() {
        this.setup = function () {
            m_mainView.GameOverSetup();

        }

        this.draw = function () {
            jaws.previous_game_state.draw();
            m_mainView.GameOverDraw();
            if (jaws.pressed("space")) {
                m_mainModel.prepareForNewGame();
                m_currentLevel = 0;
                jaws.switchGameState(MenuState);
            }
        }
    }

    function LevelClearedState() {
        this.setup = function () {
            m_mainView.LevelClearedSetup();
            m_currentLevel++;
            m_mainModel.prepareForNewLevel();
            console.log(m_currentLevel);
        }

        this.draw = function () {
            jaws.previous_game_state.draw();
            m_mainView.LevelClearedDraw();
            if (jaws.pressed("space")) { jaws.switchGameState(PlayState); }
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
        jaws.assets.add("js/Assets/levelCleared.png");

        jaws.start(MenuState);
    };

}

document.ready = MasterController;