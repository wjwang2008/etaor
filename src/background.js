chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (tool.isTargetPage(tab.url)) {
        chrome.pageAction.show(tabId);
    }
});

chrome.pageAction.onClicked.addListener(function (tab) {
    var url = tool.getRebateUrl(tab.url);
    x = function () {
        if (!window.open(url, 'etaoWin'))
            location.href = url + '&r=1';
    };
    if (/Firefox/.test(navigator.userAgent)) {
        setTimeout(x, 0);
    }
    else {
        x();
    }
});