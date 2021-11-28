chrome.runtime.onMessage.addListener(function (msg, sender, response) {
    if ((msg.from === 'content') && (msg.subject === 'openUrl')) {
        chrome.tabs.create({url: msg.url, active: true}, function (tab) {});
    }
});
