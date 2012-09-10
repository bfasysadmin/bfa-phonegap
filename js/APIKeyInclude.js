if(device.platform == "iPhone" || device.platform == "iPad" || device.platform == "iPhone Simulator")
{
    $.getScript("js/iPhone/APIKey.js", function() {
        window.plugins.apiKey.getAPIKey();
    });
}
else if(device.platform == "Android")
{
    $.getScript("js/android/APIKey.js", function() {
        window.plugins.apiKey.getAPIKey();
    });
}