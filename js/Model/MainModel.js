function MainModel() {

    //This is the constructor

    //Declare variables
    var m_player;
    var m_level;
    var m_tiles;
    var m_levelHeight;
    var m_levelWidth;
    var m_url;
    var m_wasLoaded;

    var m_brickSound;
    var m_levelCleared;
    var m_numberOfCoins;
    var m_currentHeight;
    var m_maxHeight;
    var m_startTime;
    var m_gameTime;
    var m_score;
    var m_highestScore;
    var m_intermediateScore;
    var m_gameOver;
    var m_levels;
    var m_currentLevel;


    //Instantiate variables

    //m_level = new Level("LevelA.txt");
    //m_wasLoaded = false;
    m_brickSound = jaws.assets.get("js/Assets/glass-clink.wav");
    m_levelCleared = false;
    m_numberOfCoins = 0;
    m_currentHeight = 0;
    m_maxHeight = 0;
    m_gameTime = 0;
    m_score = 0;
    m_highestScore = 0;
    m_gameOver = false;
    m_levels = new Array(new Level("LevelA.txt"), new Level("LevelB.txt"), new Level("LevelB.txt"));
    m_wasLoaded = new Array(false, false, false);
    m_currentLevel = 0;

    //m_tiles, m_levelWidth and m_levelHeight are set below when we know that all level resources have been loaded

    //getters
    this.getLevelWidth = function () { return m_levelWidth; };
    this.getLevelHeight = function () { return m_levelHeight; };
    this.getTileMap = function () { return m_tiles; };
    this.getWasLoaded = function () { return m_wasLoaded; };
    this.getLevelCleared = function () { return m_levelCleared; };
    this.getNumberOfCoins = function () { return m_numberOfCoins; };
    this.getCurrentHeight = function () { return m_currentHeight; };
    this.getGameTime = function () { return m_gameTime; };
    this.getScore = function () { return m_score; };
    this.getGameOver = function () { return m_gameOver; };

    //setters
    this.setGameOver = function (gameOver) { m_gameOver = gameOver; };
    this.setCurrentLevel = function (currentLevel) { m_currentLevel = currentLevel; };
    
    this.prepareForNewLevel = function () {
        m_levelCleared = false;
        m_maxHeight = 0;
    }

    this.prepareForNewGame = function () {
        m_levelCleared = false;
        m_levels[0] = new Level("LevelA.txt");
        m_levels[1] = new Level("LevelB.txt");
        m_levels[2] = new Level("LevelA.txt");
        m_wasLoaded[0] = false;
        m_wasLoaded[1] = false;
        m_wasLoaded[2] = false;

        m_numberOfCoins = 0;
        m_currentHeight = 0;
        m_maxHeight = 0;
        m_gameTime = 0;
        m_score = 0;
        m_highestScore = 0;
        m_gameOver = false;
        m_player.setSpeedY(-20);
        m_player.setSpeedY(0);

        //m_levels = new Array(new Level("LevelA.txt"), new Level("LevelB.txt"), new Level("LevelB.txt"));
        //m_wasLoaded = new Array(false, false, false);
        m_currentLevel = 0;

    }


    //The game logic update occurs here
    this.update = function (a_elapsedTime) {

        //If level is loaded get it, but only once and set remaining properties
        if (m_levels[m_currentLevel].getLevelLoaded() & !m_wasLoaded[m_currentLevel]) {
            m_tiles = m_levels[m_currentLevel].getTileMap();
            console.log(m_tiles);
            m_levelHeight = m_levels[m_currentLevel].getLevelHeight();
            m_levelWidth = m_levels[m_currentLevel].getLevelWidth();
            m_wasLoaded[m_currentLevel] = true;
            m_player = new Player(m_levelWidth / 2, m_levelHeight - 2, 0, -20);
            m_startTime = new Date().getTime();
        }

        //If everything has loaded and level has been loaded
        else if (m_levels[m_currentLevel].getLevelLoaded() & m_wasLoaded[m_currentLevel]) {



            //Update player position and speed
            m_player.update(a_elapsedTime);



            //Dont let megaman go left of game
            if (m_player.getPositionX() < 0) { m_player.setPositionX(0); }

            //Dont let megaman go right of game
            if (m_player.getPositionX() > m_levelWidth - 1) { m_player.setPositionX(m_levelWidth - 1); }

            //Check if level was cleared
            if (m_player.getPositionY() < 1) { m_levelCleared = true; }

            //Which tile is megaman currently in?
            //$(".Debug").html("Current x tile is x: " + Math.round(m_player.getPositionX()) + " y: " + Math.round(m_player.getPositionY()));
            var m_megamanX = Math.round(m_player.getPositionX());
            var m_megamanY = Math.round(m_player.getPositionY());

            //Calculate current height
            m_currentHeight = 400 - m_megamanY; //400 should not be hard coded here

            //If currentHeight is higher than maxheight, set maxHeight to this new value
            if (m_currentHeight > m_maxHeight) { m_maxHeight = m_currentHeight; }

            //If megaman has fallen too far, end game
            if (m_currentHeight < m_maxHeight - 17) {
                m_gameOver = true;

                $.event.trigger({
                    type: "gameOver"
                });

            }

            //Don´t let megaman fall below the lower limit
            if (m_player.getPositionY() > m_levelHeight - 2 & m_maxHeight > 10) { m_player.setPositionY(m_levelHeight - 2); m_gameOver = true; }

            //Calculate gameTime
            var currentTime = new Date().getTime();
            m_gameTime = (currentTime - m_startTime) / 1000;

            //Calculate score
            m_intermediateScore = parseInt(m_maxHeight * m_numberOfCoins - (m_gameTime * 10));
            if (m_intermediateScore > m_highestScore) {
                m_score = m_intermediateScore;
                m_highestScore = m_score;

            }

            //Check only if gameover is false

            if (m_tiles) {

                //If a coin

                if (m_tiles[m_megamanY][m_megamanX] === "0") {
                    m_player.setSpeed(0, -20.5);
                    m_tiles[m_megamanY][m_megamanX] = "7";
                    m_numberOfCoins++;
                    $.event.trigger({
                        type: "hitsCoin"
                    });
                }

                //If a star
                if (m_tiles[m_megamanY][m_megamanX] === "1") {
                    m_player.setSpeed(0, -41);
                    m_tiles[m_megamanY][m_megamanX] = "7";

                    $.event.trigger({
                        type: "hitsStar"
                    });
                }

                //If fog
                if (m_tiles[m_megamanY][m_megamanX] === "5") {
                    m_player.setSpeedY(m_player.getSpeedY() * 0.96);

                }

                //If a brick
                if (m_tiles[m_megamanY][m_megamanX] === "3") {
                    m_player.setSpeedY(-m_player.getSpeedY() * 0.75, 0);
                    m_tiles[m_megamanY][m_megamanX] = "7";

                    $.event.trigger({
                        type: "hitsBrick"
                    });
                }
            }

        }




        //Update and collision detection
        //We have get player logic position and decide which blocks he runs the risk of colliding with
        //If we decide there is collision we have to act according to the game logic of what he
        //has turned into
    }
    this.getPlayerPositionX = function () { return m_player.getPositionX(); }

    this.getPlayerPositionY = function () { return m_player.getPositionY(); }


    this.movePlayerLeft = function () { m_player.setPositionX(m_player.getPositionX() - 0.1); };
    this.movePlayerRight = function () { m_player.setPositionX(m_player.getPositionX() + 0.1) };
}

//Prototype variables

//Prototype methods
