/* See license.txt for terms of usage */

define([
    "firebug/lib/trace",
    "allyenhancer/myPanel",
    "allyenhancer/myModule",
],
function(FBTrace, MyPanel, MyModule) {

// ********************************************************************************************* //
// Documentation

// Firebug coding style: http://getfirebug.com/wiki/index.php/Coding_Style
// Firebug tracing: http://getfirebug.com/wiki/index.php/FBTrace

// ********************************************************************************************* //
// The application/extension object

var theApp =
{
    initialize: function()
    {
        if (FBTrace.DBG_ALLYENHANCER)
            FBTrace.sysout("allyEnhancer; AllyEnhancer extension initialize");

        // Registration of Firebug panels and modules is made within appropriate files,
        // but it could be also done here.

        // TODO: Extension initialization
    },

    shutdown: function()
    {
        if (FBTrace.DBG_ALLYENHANCER)
            FBTrace.sysout("allyEnhancer; AllyEnhancer extension shutdown");

        // Unregister all registered Firebug components
        Firebug.unregisterPanel(MyPanel);
        Firebug.unregisterModule(MyModule);
        Firebug.unregisterStylesheet("chrome://allyenhancer/skin/allyenhancer.css");
        Firebug.unregisterStringBundle("chrome://allyenhancer/locale/allyenhancer.properties");

        // TODO: Extension shutdown
    }
}

// ********************************************************************************************* //

return theApp;

// ********************************************************************************************* //
});
