import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    const JWT_SECRET = process.env.JWT_SECRET || "58BQgyvWqGt8rP5mQWXtPBXLmLeJ/lJtLXTuQab7BaI=";
    console.log(JWT_SECRET);
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });

    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('jwt', token, {
        httpOnly: true, // to prevent XSS attacks
        secure: true, // always use secure cookies in production
        sameSite: 'None', // must be 'None' to enable cross-site delivery
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        // domain is omitted to allow the browser to set it to the current domain
    });
}

export default generateTokenAndSetCookie;