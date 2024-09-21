const Feedback = require('../model/feedbackModel');

exports.createFeedback = async (feedbackData) => {
    const feedback = new Feedback(feedbackData);
    return feedback.save();
};

exports.getFeedbacks = async () => {
    return Feedback.find();
};

exports.getFeedbackById = async (id) => {
    return Feedback.findById(id);
};
