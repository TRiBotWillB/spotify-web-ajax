export default class SpotifyWebApi {
    clientKey: string;
    authToken: string;
    player: any;
    webPlayerDeviceId: string;

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

    play(uris:any) {
        let urisStr = JSON.stringify(uris);

        console.log('data', `{"uris": "${uris}"}`);

        if (this.player === undefined && window.spotifyWebPlaybackSDKReady) {
            if (this.authToken !== undefined) {
                if(this.webPlayerDeviceId !== undefined) {
                    let self = this;

                    $.ajax({
                        url: "https://api.spotify.com/v1/me/player/play?device_id=" + self.webPlayerDeviceId,
                        type: "PUT",
                        data: `{"uris": ${urisStr} }`,
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('Authorization', 'Bearer ' + self.authToken);
                        },
                        success: function (data) {
                            console.log(data)
                        },
                        error: function (jqXHR, exception) {
                            // Implement some error messages here,
                            // Spotify provides some insites within the API, e.g. 403 = no premium
                        }
                    });
                } else {
                    // No device ID, try setting up the player then try again after 500ms
                    this.setupPlayer();

                    setTimeout(() => {
                       this.play(uris);
                    }, 500);
                }
            } else {
                console.log('No Authorization token found.');
            }
        } else {
            // Wait 200ms and try again
            setTimeout(() => {
                this.play(uris);
            }, 200);
        }
    }

    setupPlayer() {
        const player = new Spotify.Player({
            name: 'Spotify Web Player',
            getOAuthToken: (cb: any) => {
                cb(this.authToken);
            }
        });

        // Error handling
        player.addListener('initialization_error', (e: Spotify.Error) => {
            console.error(e.message);
        });
        player.addListener('authentication_error', (e: Spotify.Error) => {
            console.error(e.message);
        });
        player.addListener('account_error', (e: Spotify.Error) => {
            console.error(e.message);
        });
        player.addListener('playback_error', (e: Spotify.Error) => {
            console.error(e.message);
        });

        // Playback status updates
        player.addListener('player_state_changed', (state: any) => {
            console.log(state);
        });

        // Ready
        player.addListener('ready', (data) => {
            console.log('Ready with Device ID', data.device_id);
            this.webPlayerDeviceId = data.device_id;
        });

        // Not Ready
        player.addListener('not_ready', (data) => {
            console.log('Device ID has gone offline', data.device_id);
            this.webPlayerDeviceId = undefined;
        });

        // Connect to the player!
        player.connect();
    }

    /*
        Sets the Authorization token, saved in a cookie in case of refresh.
     */
    setAuthorizationToken(auth_token: string) {
        this.authToken = auth_token;
        document.cookie = `auth_token: ${auth_token}`;
    }
}

