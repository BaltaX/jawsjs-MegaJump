function Level(a_url, a_levelWidth, a_levelHeight) {

    //Declare variables
    var m_levelWidth;
    var m_levelHeight;
    //var m_tiles;
    var m_url;
    var tilemap = [[]];
    var rows = [];
    var m_levelLoaded;
    var file;
    

    //This is the constructor

    //Instantiate variables
    //m_levelWidth = a_levelWidth;   //dessa bör jag nog sätta i loopen nedanför så blir det lite mer generellt (levels kan vara olika stora osv)
    //m_levelHeight = a_levelHeight;  //dessa bör jag nog sätta i loopen nedanför (levels kan vara olika stora osv)
    m_url = a_url;
    m_levelLoaded = false;
    

    //Get file information with jQuery
    $.get(a_url, function (data) {

        //Now file has loaded
        file = data;

        //Get rows
        rows = file.split("\n");

        //Set height of tilemap
        m_levelHeight = rows.length;

        //Define tilemap row for row
        for (var i = 0; i < rows.length; i++) {
            tilemap[i] = rows[i].split(",");
        }

        //Set width of tilemap (using first row as an example)
        m_levelWidth = tilemap[0].length;

        //Set flag that tilemap is ready
        m_levelLoaded = true;

    }, 'text');
    

    //Getters
    this.getLevelWidth = function () { return m_levelWidth; };
    this.getLevelHeight = function () { return m_levelHeight; };
    this.getTileMap = function () { return tilemap; };
    this.getLevelLoaded = function () { return m_levelLoaded; };




}