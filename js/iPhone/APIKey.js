// WARNING: This file is only to be included by order.js.
// It relies on the global variables key and url that
// are declared inside order.js.

function APIKey()
{
    
}

APIKey.prototype.getAPIKey = function ()
{
    PhoneGap.exec("APIKey.getAPIKey");
};

APIKey.prototype.returnedKey = function(k, u)
{
    // key and url are declared globally in order.js
    key = k;
    url = u;
};

PhoneGap.addConstructor(function() 
{
    if(!window.plugins)
    {
        window.plugins = {};
    }
    window.plugins.apiKey = new APIKey();
});