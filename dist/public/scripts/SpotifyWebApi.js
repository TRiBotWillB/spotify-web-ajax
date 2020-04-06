var SpotifyWebApi = /** @class */ (function () {
    function SpotifyWebApi(clientKey) {
        this.clientKey = clientKey;
    }
    /*
        Requests the Spotify API Auth Token
     */
    SpotifyWebApi.prototype.requestAuthorizationToken = function () {
        var clientId = "49e069c3f05e4de8857551e8946774d7";
        var responseType = "token";
        var redirectUri = "http://localhost:5000/callback";
        var scope = encodeURIComponent('streaming user-read-email user-read-private user-modify-playback-state');
        var url = "https://accounts.spotify.com/authorize?client_id=" + clientId + "&response_type=" + responseType + "&redirect_uri=" + redirectUri + "&scope=" + scope;
        window.location.replace(url);
    };
    SpotifyWebApi.prototype.play = function (uris) {
        var _this = this;
        var urisStr = JSON.stringify(uris);
        console.log('data', "{\"uris\": \"" + uris + "\"}");
        if (this.player === undefined && window.spotifyWebPlaybackSDKReady) {
            if (this.authToken !== undefined) {
                if (this.webPlayerDeviceId !== undefined) {
                    var self_1 = this;
                    $.ajax({
                        url: "https://api.spotify.com/v1/me/player/play?device_id=" + self_1.webPlayerDeviceId,
                        type: "PUT",
                        data: "{\"uris\": " + urisStr + " }",
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('Authorization', 'Bearer ' + self_1.authToken);
                        },
                        success: function (data) {
                            console.log(data);
                        },
                        error: function (jqXHR, exception) {
                            // Implement some error messages here,
                            // Spotify provides some insites within the API, e.g. 403 = no premium
                        }
                    });
                }
                else {
                    // No device ID, try setting up the player then try again after 500ms
                    this.setupPlayer();
                    setTimeout(function () {
                        _this.play(uris);
                    }, 500);
                }
            }
            else {
                console.log('No Authorization token found.');
            }
        }
        else {
            // Wait 200ms and try again
            setTimeout(function () {
                _this.play(uris);
            }, 200);
        }
    };
    SpotifyWebApi.prototype.setupPlayer = function () {
        var _this = this;
        var player = new Spotify.Player({
            name: 'Spotify Web Player',
            getOAuthToken: function (cb) {
                cb(_this.authToken);
            }
        });
        // Error handling
        player.addListener('initialization_error', function (e) {
            console.error(e.message);
        });
        player.addListener('authentication_error', function (e) {
            console.error(e.message);
        });
        player.addListener('account_error', function (e) {
            console.error(e.message);
        });
        player.addListener('playback_error', function (e) {
            console.error(e.message);
        });
        // Playback status updates
        player.addListener('player_state_changed', function (state) {
            console.log(state);
        });
        // Ready
        player.addListener('ready', function (data) {
            console.log('Ready with Device ID', data.device_id);
            _this.webPlayerDeviceId = data.device_id;
        });
        // Not Ready
        player.addListener('not_ready', function (data) {
            console.log('Device ID has gone offline', data.device_id);
            _this.webPlayerDeviceId = undefined;
        });
        // Connect to the player!
        player.connect();
    };
    /*
        Sets the Authorization token, saved in a cookie in case of refresh.
     */
    SpotifyWebApi.prototype.setAuthorizationToken = function (auth_token) {
        this.authToken = auth_token;
        document.cookie = "auth_token: " + auth_token;
    };
    return SpotifyWebApi;
}());
export default SpotifyWebApi;
//# sourceMappingURL=SpotifyWebApi.js.map