import express from "express";

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/callback', (req, res, next) => {

    const {error, state, access_token, expires_in} = req.query;

    // Access Token is sent in a hash fragment - read from client side
    // Error is sent normally, read it here and display an error message

    let at = req.query['#access_token'];

    console.log(req.params);

    console.log('CALLBACK!');

    if (error) {
        console.log('ERROR!');

        return res.render('index', {error: error});
    } else if (at) {

        console.log('NO ERROR!');

        return res.render('index', {
            access_token: at,
            expires_in: expires_in
        });
    }

    return res.redirect('/');
})


export = router;