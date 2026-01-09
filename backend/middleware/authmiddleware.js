const jwt = require("jsonwebtoken");
const AdminModel = require("../model/adminModel");
const UserModel = require("../model/userModel");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        let user = await UserModel.findById(decoded.id);
        if (user) {
            req.user = user;
            return next();
        }

        let admin = await AdminModel.findById(decoded.id);
        if (admin) {
            req.admin = admin;
            return next();
        }

        return res.status(404).json({ message: "User not found" });

    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;
