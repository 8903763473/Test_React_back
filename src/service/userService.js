const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create a new user
exports.createUser = async (userData) => {
    const { name, email, password } = userData;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ name, email, password: hashedPassword });
        const savedUser = await newUser.save();
        return savedUser;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Login a user
exports.loginUser = async (userData) => {
    const { email, password } = userData;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }
        // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const userObject = JSON.stringify(user.toObject());
        const UserData = userObject;
        return { user: UserData };
    } catch (error) {
        throw new Error(error.message);
    }
};
