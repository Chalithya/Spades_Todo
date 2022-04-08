const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    //checking json web token and verifying it
    if (token) {

        jwt.verify(token, 'secret', (err, decodeToken) => {

            if (err) {

                console.log(err.message);
            } else {

                console.log(decodeToken);
                next();
            }
        })
    } else {

        alert('No token');
        console.log('No token');
        res.redirect('/login');
        
    }
}

module.exports = { requireAuth };