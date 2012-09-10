function ComposeEmail()
{

}

ComposeEmail.prototype.compose = function (options)
{
    PhoneGap.exec("ComposeEmail.compose", options);
};


PhoneGap.addConstructor(function() 
{
    if(!window.plugins)
    {
        window.plugins = {};
    }
    window.plugins.composeEmail = new ComposeEmail();
});