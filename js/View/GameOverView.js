function GameOverView() {

    var i = 0;
    var xmlData;
    var writeAtLine = 0;
    var m_dataLoaded = false;
    var m_gameOver = new jaws.Sprite({ image: "js/Assets/gameOver.png", x: 0, y: 200 });

    //Setup function
    this.setup = function () {
        //Load highscore data
        $.ajax({
            type: "GET",
            url: "getHighScores.aspx",
            dataType: "xml",
            success: function (xml) { xmlData = xml; m_dataLoaded = true; }
        });
    }


    //draw function
    this.draw = function () {

        //Only continue if data has loaded
        if (!m_dataLoaded) { return; }


        //Check if player wats to continue
        //if (jaws.pressedWithoutRepeat("space")) { jaws.switchGameState(MenuState); }

        //Draw game over background graphics
        m_gameOver.draw();

        //Otherwise write out highscore data
        jaws.context.font = "bold 20pt terminal";
        jaws.context.lineWidth = 20
        jaws.context.fillStyle = "White";

        $('Highscore', xmlData).each(function (i) {
            writeAtLine++;
            var Name = $(this).find('Name').text();
            var Score = $(this).find('Score').text();
            jaws.context.fillText(Name, 230, 410 + (writeAtLine * 30));
            jaws.context.fillText(Score, 400, 410 + (writeAtLine * 30));
        });

        //Clear lines for highscore data
        writeAtLine = 0;

    }

}