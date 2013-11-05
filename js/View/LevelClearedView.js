function LevelClearedView() { 

    //Declare variables
    var m_levelClearedImage;

    //Setup function
    this.setup = function () {

        m_levelClearedImage = new jaws.Sprite({ image: "js/Assets/levelCleared.png", x: 0, y: 200 });

    }

    this.draw = function () {

        m_levelClearedImage.draw();
    }

}