chrome.runtime.onMessage.addListener(function (msg, sender, response) {
    if ((msg.from === 'content') && (msg.subject === 'openUrl')) {
        $.ajax({
            url: "https://bey18ckvn0.execute-api.ca-central-1.amazonaws.com/dev/FastOffersAPI",
            method: "POST",
            timeout: 0,
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(msg.data),
            success: function (response) {
                console.log(JSON.stringify(response));
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log("Error: " + JSON.stringify(xhr));
            }
        });

        chrome.tabs.create({url: msg.url, active: true}, function (tab) {});
    }
});
