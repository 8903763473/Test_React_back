const userService = require('../service/userService');

exports.createUser = async (req, res) => {
    try {
        const userData = req.body;
        const savedUser = await userService.createUser(userData);
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        console.log(req.body);
        const userData = req.body;
        const result = await userService.loginUser(userData);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await userService.getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
