const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        res.status(401).json({ message: 'You need to be logged in to perform this action' });
    } else {
        next();
    }
};

module.exports = withAuth;