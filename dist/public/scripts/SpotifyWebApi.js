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
    SpotifyWebApi.prototype.log = function () {
        console.log('well dafuq');
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