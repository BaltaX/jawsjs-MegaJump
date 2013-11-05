function MasterController() {

    //Declare variables
    var m_mainView;
    var m_mainModel;
    var m_initialized;
    var m_currentLevel;

    //Initiate variables
    m_initialized = false;
    m_currentLevel = 0;

    //**************************************
    //This is the state for running the game
    //**************************************
    function PlayState() {

        var m_backgroundTrack = jaws.assets.get("js/Assets/Soundtrack2.mp3");

        this.setup = function () {

            //This code is only run the first time the game runs
            //Thus model and view are re-used between games
            if (!m_initialized) {
                m_mainView = new MainView();
                m_mainModel = new MainModel();
                m_initialized = true;
            }
            m_backgroundTrack.play();
        };


        this.update = function () {
            //Check for user input
            if (jaws.pressed("left")) { m_mainModel.movePlayerLeft(); }
            if (jaws.pressed("right")) { m_mainModel.movePlayerRight(); }

            m_mainModel.update(jaws.game_loop.tick_duration / 1000);

            if (m_mainModel.getLevelCleared()) {
                jaws.switchGameState(LevelClearedState);
            }

            if (m_mainModel.getGameOver()) {
                jaws.switchGameState(GameOverState);
            }

        };


        this.draw = function () {

            m_mainView.Draw(m_mainModel);
        };
    }



    //**************************************
    //This is the state for showing the menu
    //**************************************
    function MenuState() {

    //This code should be placed in view
        var m_bg = new jaws.Sprite({ image: "js/Assets/MenuBackground.jpg", x: 0, y: 0 });

        //Clear the canvas
        jaws.clear();

        m_bg.x = 0;
        m_bg.y = 0;

        this.draw = function () {

            //Gamestate exit logic
            if (jaws.pressed("enter")) {
                jaws.switchGameState(PlayState);
            }

            m_bg.draw();
        }
    }

    //***************************************
    //This is the state for showing game over
    //***************************************
    function GameOverState() {

        this.setup = function () {
            //Load the highscores
            m_mainView.GameOverSetup();
        }

        this.draw = function () {
            //What to draw (previous_game_state is PlayState)

            //Continue to draw game where it stopped (freeze version)
            jaws.previous_game_state.draw();

            //and draw gameover background over it
            m_mainView.GameOverDraw();

            //Gamestate exit logic
            if (jaws.pressed("space")) {
                m_mainModel.prepareForNewGame();
                m_currentLevel = 0;
                jaws.switchGameState(MenuState);
            }
        }
    }

    //***********************************************
    //This is the state for showing level was cleared
    //***********************************************
    function LevelClearedState() {
        this.setup = function () {
            //Load background image to draw
            m_mainView.LevelClearedSetup();
            m_mainModel.prepareForNewLevel();
        }

        this.draw = function () {
            jaws.previous_game_state.draw();
            m_mainView.LevelClearedDraw();

            //Gamestate exit logic
            if (jaws.pressed("space")) {
                jaws.switchGameState(PlayState);
            }
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