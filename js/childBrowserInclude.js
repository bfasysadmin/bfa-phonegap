if(device.platform == "iPhone" || device.platform == "iPad" || device.platform == "iPhone Simulator")
{
    $.getScript("js/iPhone/ChildBrowser.js", function() {
        if(device.platform == "iPhone" || device.platform == "iPad" || device.platform == "iPhone Simulator")
        {
            ChildBrowser.install();
        }
    });
}
else if(device.platform == "Android")
{
    $.getScript("js/android/childbrowser.js");
}