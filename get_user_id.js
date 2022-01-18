$(function () {
    let current_url = window.location.href;
    if (current_url == "https://forms.ltd/home") {
        let user_id_parts = $("body").html().split("const user_id = ");
        let user_id_parts2 = user_id_parts[1].split("const");
        let user_id = user_id_parts2[0].trim();
        chrome.storage.local.set({
            user_id: user_id
        }, function () {
            chrome.runtime.sendMessage({
                from: 'content',
                subject: 'userLoggedIn'
            });
        });

    }
});

