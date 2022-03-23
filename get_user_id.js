$(function () {
    let current_url = window.location.href;
    if (current_url != "https://forms.ltd/login") {
        let user_id = "";
        let user_id_parts = $("body").html().split('{"id":');
        if (user_id_parts[1]) {
            let user_id_parts2 = user_id_parts[1].split(',');
            user_id = user_id_parts2[0].trim();
        }
        chrome.storage.local.set({
            user_id: user_id
        });
    }
});

