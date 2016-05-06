/* See license.txt for terms of usage */

define([
    "firebug/lib/object",
    "firebug/lib/trace",
    "firebug/lib/locale",
    "firebug/lib/domplate"
],
function(Obj, FBTrace, Locale, Domplate) {

// ********************************************************************************************* //
// Custom Panel Implementation

var panelName = "allyenhancer";

function MyPanel() {};
MyPanel.prototype = Obj.extend(Firebug.Panel,
{
    name: panelName,
    title: "Ally Enhancer",
    inspectable: true,
    inspectHighlightColor: "green",

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Initialization

    initialize: function()
    {
        Firebug.Panel.initialize.apply(this, arguments);
        Firebug.Inspector.addListener(this);

        if (FBTrace.DBG_ALLYENHANCER)
            FBTrace.sysout("allyEnhancer; MyPanel.initialize");

        // TODO: Panel initialization (there is one panel instance per browser tab)

        this.refresh();
    },

    destroy: function(state)
    {
        if (FBTrace.DBG_ALLYENHANCER)
            FBTrace.sysout("allyEnhancer; MyPanel.destroy");

        Firebug.Panel.destroy.apply(this, arguments);
        Firebug.Inspector.removeListener(this);
    },

    show: function(state)
    {
        Firebug.Panel.show.apply(this, arguments);


        if (FBTrace.DBG_ALLYENHANCER)
            FBTrace.sysout("allyEnhancer; MyPanel.show");
    },

    refresh: function()
    {
        // Render panel content. The HTML result of the template corresponds to: 
        //this.panelNode.innerHTML = "<span>" + Locale.$STR("allyenhancer.panel.label") + "</span>";
        this.MyTemplate.render(this.panelNode);

        // TODO: Render panel content
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Inspector API implementation

    startInspecting: function()
    {
        if (FBTrace.DBG_ALLYENHANCER)
            FBTrace.sysout("allyEnhancer; startInspecting()");
    },

    inspectNode: function(node)
    {
        if (FBTrace.DBG_ALLYENHANCER)
            FBTrace.sysout("allyEnhancer; inspectNode(node: " + node.tagName + ")");

        // LinkInspectorPlate.linkUrl.replace({object: node}, this.panelNode);
    },

    stopInspecting: function(node, canceled)
    {
        if (FBTrace.DBG_ALLYENHANCER)
            FBTrace.sysout("allyEnhancer; stopInspecting(node: " + node.tagName +
                ", canceled: " + canceled + ")");

        if (canceled)
            return;

        if (node.href.indexOf("http") != 0)
            return;

        // LinkInspectorPlate.linkPreview.replace({object: node}, this.panelNode);
    },

    supportsObject: function(object, type)
    {
        if (object instanceof Element)
        {
            if (object.tagName.toLowerCase() == "a")
                return 1;
        }

        return 0;
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Inspector Listener

    onStartInspecting: function(context)
    {
        if (FBTrace.DBG_ALLYENHANCER)
            FBTrace.sysout("allyEnhancer; Listener.onStartInspecting(context: " +
                context.getTitle() + ")");
    },

    onInspectNode: function(context, node)
    {
        if (FBTrace.DBG_ALLYENHANCER)
            FBTrace.sysout("allyEnhancer; Listener.onInspectNode(context: " +
                context.getTitle() + ", node: " + node.tagName + ")");
    },

    onStopInspecting: function(context, node, canceled)
    {
        if (FBTrace.DBG_ALLYENHANCER)
            FBTrace.sysout("allyEnhancer; Listener.onStopInspecting(context: " +
                context.getTitle() + ", node: " + node.tagName + ", canceled: " +
                canceled + ")");
    },
});

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

/* Ne pas oublier de mettre les classes css dans le fichier css.
var LinkInspectorPlate = domplate(
{
    linkUrl:
        DIV({"class": "linkUrl"},
            "$object.href"
        ),

    linkPreview:
        IFRAME({"class": "linkPreview", "src": "$object.href"}),

    defaultContent:
        DIV({"class": "defaultContent"},
            "Use Firebug Inspector and try to inspect a link on the current page."
        )
});
*/


// ********************************************************************************************* //
// Panel UI (Domplate)

// Register locales before the following template definition.
Firebug.registerStringBundle("chrome://allyenhancer/locale/allyenhancer.properties");

var {domplate, SPAN} = Domplate;

/**
 * Domplate template used to render panel's content. Note that the template uses
 * localized strings and so, Firebug.registerStringBundle for the appropriate
 * locale file must be already executed at this moment.
 */
MyPanel.prototype.MyTemplate = domplate(
{
    tag:
        SPAN(
            Locale.$STR("allyenhancer.panel.label")
        ),

    render: function(parentNode)
    {
        this.tag.replace({}, parentNode);
    }
});

// ********************************************************************************************* //
// Registration

Firebug.registerPanel(MyPanel);
Firebug.registerStylesheet("chrome://allyenhancer/skin/allyenhancer.css");

if (FBTrace.DBG_ALLYENHANCER)
    FBTrace.sysout("allyEnhancer; myPanel.js, stylesheet registered");

return MyPanel;

// ********************************************************************************************* //
});
