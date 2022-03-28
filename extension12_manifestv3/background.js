chrome.runtime.onMessage.addListener(function (msg, sender, response) {
    if ((msg.from === 'content') && (msg.subject === 'openUrl')) {
        fetch("https://bey18ckvn0.execute-api.ca-central-1.amazonaws.com/dev/FastOffersAPI", {
            method: 'POST',
            body: JSON.stringify(msg.data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json()).then(data => {
            console.log(JSON.stringify(data));
        });

        chrome.tabs.create({url: msg.url, active: true}, function (tab) {});
    }
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.url && (!changeInfo.url.includes("https://forms.ltd"))) {
        chrome.tabs.sendMessage(tabId, {from: 'background', subject: 'changedUrl'});
    }
});

chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == "install") {
        login();
    }
});

chrome.action.onClicked.addListener((tab) => {
    login();
});

function login() {
    chrome.tabs.create({url: "https://forms.ltd/Booster", active: true}, function (tab) {});
}