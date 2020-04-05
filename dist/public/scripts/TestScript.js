import SpotifyWebApi from "./SpotifyWebApi.js";
$(function () {
    console.log('Hehe', window.location.hash);
    if (window.location.hash) {
        var token = window.location.hash.substring(14, window.location.hash.indexOf('&'));
        console.log('token', token);
        $.ajax({
            url: 'https://api.spotify.com/v1/me',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function (response) {
                $('#titleHeader').text("Hello, " + response.display_name);
                console.log(response);
            }
        });
    }
    var api = new SpotifyWebApi("");
    $('#login').on('click', function (e) {
        e.preventDefault();
        api.requestAuthorizationToken();
    });
});
//# sourceMappingURL=TestScript.js.map