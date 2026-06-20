const Joi = require('joi');

const validateTodoPatch = (req, res, next) => {
  // Define the schema for partial updates
  const schema = Joi.object({
    // completed must be a boolean (true/false) if provided
    completed: Joi.boolean().messages({
      'boolean.base': 'The completed field must be either true or false.'
    }),
    // task must be a string between 3 and 100 characters if provided
    task: Joi.string().min(3).max(100).messages({
      'string.base': 'The task field must be a string.',
      'string.empty': 'The task field cannot be empty.',
      'string.min': 'The task field must be at least 3 characters long.',
      'string.max': 'The task field must be at most 100 characters long.'
    })
  }).or('completed', 'task'); // At least one of the fields must be provided

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details[0].message
    });
  }
  next();
};

module.exports = validateTodoPatch;