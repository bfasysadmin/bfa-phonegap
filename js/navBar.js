// Formerly, we utilized NavigationBar as a PhoneGap plugin.
// However, now we modified shouldStartLoadWithRequest in the AppDelegate to
// directly use the NavigationBar.

// In the future, we'd like to look into using jQuery Mobile or Dojo Mobile.

/*
if(device.platform == "iPhone" || device.platform == "iPad" || device.platform == "iPhone Simulator")
{
    $.getScript("js/iPhone/NavigationBar.js", function () {
        var nb = window.plugins.navigationBar;
        var options = {};
        options.title = document.title;
        options.url = new String(window.location);
        nb.pushNavigationItem(options);
    });
}*/