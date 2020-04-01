// TODO ANY
export const checkRole = (role: string) => (req: any, res: any, next: any) => {
    if (req.userRole === role) {
        next();
    } else {
        res.status(403).json({ message: 'Not permitted' });
    }
};
