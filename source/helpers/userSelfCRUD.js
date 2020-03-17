export const userSelfCRUD = (req, res, next) => {
    if (req.params.hash === req.session.user.hash) {
        next();
    } else {
        res.status(403).json({ message: 'Not permitted' });
    }
};
