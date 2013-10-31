<%@ Page Language="C#" %>


<script runat="server">

    void Page_Load(object sender, System.EventArgs evt)
    {
        //Get HighScore Data
        HighScoresDataContext dc = new HighScoresDataContext();
        Response.ContentType = "text/xml";

        StringBuilder returnXml = new StringBuilder();

        //Start to write xml document
        returnXml.Append("<?xml version='1.0' encoding='ISO-8859-1'?>");
        returnXml.Append("<Highscores>");

        //Create a list of highscores
        var ds = from pp in dc.MegaJump_Highscores
                 //where pp.activityTypeId == 1 || pp.activityTypeId == 2 || pp.activityTypeId == 7 || pp.activityTypeId == 8 || pp.activityTypeId == 3
                 orderby pp.HighScore descending
                 select pp;

        foreach (var hs in ds)
        {
            returnXml.Append("<Highscore>");
            returnXml.Append("<Score>" + hs.HighScore + "</Score>");

            returnXml.Append("<Name>" + hs.Name + "</Name>");
            returnXml.Append("</Highscore>");

        }

        returnXml.Append("</Highscores>");

        Response.Write(returnXml);
    }






</script>


