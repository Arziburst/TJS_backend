export const checkRole = (role) => (req, res, next) => {
    if (req.userRole === role) {
        next();
    } else {
        res.status(403).json({ message: 'Not permitted' });
    }
};
