import jwt from 'jsonwebtoken'

const auth = (req, res, next) => { 
    const {token} = req.headers;

    if (!token) {
        return res.json({ success: false, message: 'No token provided' });
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.id;
        console.log("Token from header:", req.headers.token);

        next();

    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: 'Invalid token' });
    }
}

export default auth;