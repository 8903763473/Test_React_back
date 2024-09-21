const feedbackService = require('../service/feedbackService');

exports.submitFeedback = async (req, res) => {
    try {
        const feedback = await feedbackService.createFeedback(req.body);
        res.status(201).json(feedback);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.listFeedbacks = async (req, res) => {
    try {
        const feedbacks = await feedbackService.getFeedbacks();
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
