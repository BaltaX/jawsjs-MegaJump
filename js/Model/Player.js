function Player(a_positionX, a_positionY, a_speedX, a_speedY, a_radius) {

    //Create members

    var m_positionX = a_positionX;
    var m_positionY = a_positionY;
    var m_speedX = a_speedX;
    var m_speedY = a_speedY;
    var m_radius = a_radius;

    //Public methods

    //Getters
    this.getPositionX = function () { return m_positionX; };
    this.getPositionY = function () { return m_positionY; };
    this.getSpeedX = function () { return m_speedX; };
    this.getSpeedY = function () { return m_speedY; };
    this.getRadius = function () { return m_radius; };

    //Setters
    this.setPositionX = function (positionX) { m_positionX = positionX; };
    this.setPositionY = function (positionY) { m_positionY = positionY; };
    this.setSpeedX = function (speedX) { m_speedX = speedX; };
    this.setSpeedY = function (speedY) { m_speedY = speedY; };

    //This method updates player model position in each tick /time step)
    this.update = function (a_elapsedTime) {

        m_speedY = m_speedY + this.GRAVITY_Y * a_elapsedTime;
        m_speedX = m_speedX + this.GRAVITY_X * a_elapsedTime;

        m_positionX = m_positionX + m_speedX * a_elapsedTime;
        m_positionY = m_positionY + m_speedY * a_elapsedTime;
    }


    this.setSpeed = function (a_jumpX, a_jumpY) {
        m_speedY = a_jumpY;
        m_speedX = a_jumpX;
    }
}

Player.prototype.GRAVITY_X = 0;
Player.prototype.GRAVITY_Y = 24;