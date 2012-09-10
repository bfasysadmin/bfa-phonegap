function APIKey() {
}


APIKey.prototype.getAPIKey = function() {
    PhoneGap.exec(window.plugins.apiKey.returnedKey, null, "APIKey", "", []);
};

APIKey.prototype.returnedKey = function(k)
{
    // key and url are declared globally in order.js
    key = k;
    url = "https://staging.bfa.org/oms/api/";
};

/**
 * Load APIKey
 */
PhoneGap.addConstructor(function() {
    if(!window.plugins)
    {
        window.plugins = {};
    }
    window.plugins.apiKey = new APIKey();
});