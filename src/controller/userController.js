const userService = require('../service/userService');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const userData = req.body; // { name, email, password }
        const savedUser = await userService.createUser(userData);
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Login a user
exports.loginUser = async (req, res) => {
    try {
        const userData = req.body; // { email, password }
        const result = await userService.loginUser(userData);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
