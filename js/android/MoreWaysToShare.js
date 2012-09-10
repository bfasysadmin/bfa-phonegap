function MoreWaysToShare() {
}

MoreWaysToShare.prototype.share = function(subject, body) {
    PhoneGap.exec(null, null, "MoreWaysToShare", "", [subject, body]);
    alert("Hi");
};

/**
 * Load MoreWaysToShare
 */
PhoneGap.addConstructor(function() {
    if(!window.plugins)
    {
        window.plugins = {};
    }
    window.plugins.moreWaysToShare = new MoreWaysToShare();
});