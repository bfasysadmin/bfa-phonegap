// WARNING: This file is not used anymore. See implementation in AppDelegate.m

function NavigationBar() {
    this.navigationBarCallbacks = {};
}

var navigationButton = {};
navigationButton.SystemItemDone = 0;
navigationButton.SystemItemCancel = 1;
navigationButton.SystemItemEdit = 2;
navigationButton.SystemItemSave = 3;
navigationButton.SystemItemAdd = 4;
navigationButton.SystemItemFlexibleSpace = 5;
navigationButton.SystemItemFixedSpace = 6;
navigationButton.SystemItemCompose = 7;;
navigationButton.SystemItemReply = 8;
navigationButton.SystemItemAction = 9;
navigationButton.SystemItemOrganize = 10;
navigationButton.SystemItemBookmarks = 11;
navigationButton.SystemItemSearch = 12;
navigationButton.SystemItemRefresh = 13;
navigationButton.SystemItemStop = 14;
navigationButton.SystemItemCamera = 15;
navigationButton.SystemItemTrash = 16;
navigationButton.SystemItemPlay = 17;
navigationButton.SystemItemPause = 18;
navigationButton.SystemItemRewind = 19;
navigationButton.SystemItemFastForward = 20;
navigationButton.SystemItemUndo = 21;
navigationButton.SystemItemRedo = 22;
navigationButton.SystemItemPageCurl = 23;

NavigationBar.prototype.hideNavigationBar = function() {
    PhoneGap.exec("NavigationBar.hideNavigationBar");
};

NavigationBar.prototype.createNavigationBar = function() {
    PhoneGap.exec("NavigationBar.createNavigationBar");
};

NavigationBar.prototype.pushNavigationItem = function(options) {
    PhoneGap.exec("NavigationBar.pushNavigationItem", options);
};

NavigationBar.prototype.popNavigationItem = function() {
    PhoneGap.exec("NavigationBar.popNavigationItem");
};

NavigationBar.prototype.setNavigationBarTitle = function(title) {
    PhoneGap.exec("NavigationBar.setNavigationBarTitle", title);
};

NavigationBar.prototype.setNavigationBarLeftButton = function(options) {
	if (options && options.onTap)
		this.navigationBarCallbacks[1] = options.onTap;	
    PhoneGap.exec("NavigationBar.setNavigationBarLeftButton", options);
};

NavigationBar.prototype.setNavigationBarRightButton = function(options) {
	if (options && options.onTap)
		this.navigationBarCallbacks[2] = options.onTap;
    PhoneGap.exec("NavigationBar.setNavigationBarRightButton", options);
};

NavigationBar.prototype.removeNavigationBarRightButton = function(options) {
	PhoneGap.exec("NavigationBar.removeNavigationBarRightButton", options);
}

NavigationBar.prototype.removeNavigationBarLeftButton = function(options) {
	PhoneGap.exec("NavigationBar.removeNavigationBarLeftButton", options);
}

NavigationBar.prototype.navigationBarButtonClicked = function(tag) {
	if (this.navigationBarCallbacks[tag] && typeof(this.navigationBarCallbacks[tag]) == 'function')
		this.navigationBarCallbacks[tag]();
};

NavigationBar.prototype.didPopItem = function (url) {
    window.location = url;
};


PhoneGap.addConstructor(function() 
{
    if(!window.plugins)
    {
        window.plugins = {};
    }
    window.plugins.navigationBar = new NavigationBar();
});