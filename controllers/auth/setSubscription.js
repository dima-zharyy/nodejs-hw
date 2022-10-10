const { User, subscriptionJoiSchema } = require('../../model/auth');

const setSubscription = async (req, res, next) => {
  try {
    const subscription = req.body;
    const { error } = subscriptionJoiSchema.validate(subscription);

    if (error) {
      error.status = 400;
      throw error;
    }

    const { _id } = req.user;
    const result = await User.findByIdAndUpdate(_id, subscription, {
      new: true,
    });

    res.json({
      status: 'success',
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = setSubscription;
