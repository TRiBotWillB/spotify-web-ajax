import SpotifyWebApi from "./SpotifyWebApi.js";


$(function () {
    console.log('Hehe', window.location.hash);

    if (window.location.hash) {
        let token = window.location.hash.substring(14, window.location.hash.indexOf('&'));

        console.log('token', token);

        $.ajax({
            url: 'https://api.spotify.com/v1/me',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function (response) {
                $('#titleHeader').text(`Hello, ${response.display_name}`);
                console.log(response);
            }
        });


    }

    let api = new SpotifyWebApi("");

    $('#login').on('click', (e) => {
        e.preventDefault();


        api.requestAuthorizationToken();
    });
});