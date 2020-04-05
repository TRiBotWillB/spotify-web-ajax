export default class SpotifyWebApi {
    clientKey: string;
    authToken: string;

    constructor(clientKey: string) {
        this.clientKey = clientKey;
    }

    /*
        Requests the Spotify API Auth Token
     */
    requestAuthorizationToken() {
        let clientId = "49e069c3f05e4de8857551e8946774d7";
        let responseType = "token";
        let redirectUri = "http://localhost:5000/callback";
        let scope = encodeURIComponent('streaming user-read-email user-read-private user-modify-playback-state');

        let url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${scope}`;

        window.location.replace(url);
    }

    log() {
        console.log('well dafuq');
    }

    /*
        Sets the Authorization token, saved in a cookie in case of refresh.
     */
    setAuthorizationToken(auth_token: string) {
        this.authToken = auth_token;
        document.cookie = `auth_token: ${auth_token}`;
    }
}

