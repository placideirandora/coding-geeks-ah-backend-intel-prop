import Joi from 'joi';

export default {
  /**
     * @description validates request body before registration
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object} validation oject
     */

  passwordValidation(req, res, next) {
    const emailSchema = Joi.object().keys({
      password: Joi.string()
        .required()
        .regex(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/)
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case 'string.regex.base':
                err.message = 'Password must be at least 8 characters with at least a number, Upper and lower cases special character';
                break;
              default:
                break;
            }
          });
          return errors;
        }),

      confirmPassword: Joi.string()
        .required()
        .valid(Joi.ref('password'))
        .error((errors) => {
          errors.forEach((err) => {
            // eslint-disable-next-line default-case
            switch (err.type) {
              case 'any.allowOnly':
                err.message = 'Passwords must much';
                break;
              case 'any.required':
                err.message = 'Confirm password is required';
                break;
              case 'string.base':
                err.message = 'Confirm password must be a string';
                break;
            }
          });
          return errors;
        }),
    });
    const options = {
      language: {
        key: '{{key}} ',

      }
    };
    const { error } = Joi.validate(req.body, emailSchema, options);
    if (error) {
      return res.status(400).json({
        status: 'failed',
        error: error.details[0].message
      });
    }
    next();
  },
};
