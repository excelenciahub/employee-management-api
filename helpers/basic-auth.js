const jwt = require("jsonwebtoken");

const basicAuth = async (req, res, next) => {
    // make authenticate path public
    // if (req.path === '/users/authenticate') {
    //     return next();
    // }

    // check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer ') === -1) {
        return res.status(401).json({ message: 'Missing authorization Header' });
    }

    // verify auth credentials
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, value) => {
        if (err) res.status(500).json({ error: 'failed to authenticate token' })
        req.user = value
        next()
    });
}

module.exports = basicAuth;