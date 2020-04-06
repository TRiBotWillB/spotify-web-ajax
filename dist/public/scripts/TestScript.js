import SpotifyWebApi from "./SpotifyWebApi.js";
window.onSpotifyWebPlaybackSDKReady = function () {
    window.spotifyWebPlaybackSDKReady = true;
};
$(function () {
    var api = new SpotifyWebApi("");
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
        api.setAuthorizationToken(token);
        api.play([
            "spotify:track:6Ep6BzIOB9tz3P4sWqiiAB",
            "spotify:track:4eLSCSELtKxZwXnFbNLXT5"
        ]);
    }
    $('#login').on('click', function (e) {
        e.preventDefault();
        api.requestAuthorizationToken();
    });
});
//# sourceMappingURL=TestScript.js.map