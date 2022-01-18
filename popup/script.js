const offers_button = '<a href="https://forms.ltd/offers" class="popup_btn" target="_blank">My Offers</a>';

chrome.runtime.onMessage.addListener(function (msg, sender) {
    if ((msg.from === 'content') && (msg.subject === 'userLoggedIn')) {
        chrome.storage.local.get(['user_id'], function (data) {
            let user_id = "";
            if (data['user_id'] && (data['user_id'] != 'undefined'))
                user_id = data['user_id'];

            $("#login").remove();
            $("#wrapper").append(offers_button);
            $("#wrapper").append("<p>User succesfully logged in!</p>");
        });

    }
});

$(function () {
    chrome.storage.local.get(['user_id'], function (data) {
        let user_id = "";
        if (data['user_id'] && (data['user_id'] != 'undefined'))
            user_id = data['user_id'];

        if (user_id) {
            $("#wrapper").append(offers_button);
        } else {
            $("#wrapper").append('<a href="https://forms.ltd/login" class="popup_btn" target="_blank" id="login">Login</a>');
        }
    });
});