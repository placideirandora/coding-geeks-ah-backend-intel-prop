import Joi from 'joi';

export default {
  /**
     * @description validates request body before registration
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object} validation oject
     */

  signupValidation(req, res, next) {
    const userSchema = Joi.object().keys({
      firstName: Joi.string()
        .alphanum()
        .min(4)
        .max(20)
        .required(),
      lastName: Joi.string()
        .alphanum()
        .min(4)
        .max(20)
        .required(),
      userName: Joi.string()
        .alphanum()
        .min(3)
        .max(15)
        .required(),
      email: Joi.string()
        .email({ minDomainAtoms: 2 })
        .required(),
      password: Joi.string()
        .required()
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case 'string.regex.base':
                err.message = 'password must be at least 8 characters containing at least a number, Upper and lower cases';
                break;
              default:
                break;
            }
          });
          return errors;
        }),

      confirmPassword: Joi.string()
        .valid(Joi.ref('password')).error(() => 'Passwords must much')
    });

    const options = {
      language: {
        key: '{{key}} ',

      }
    };
    const { error } = Joi.validate(req.body, userSchema, options);
    if (error) {
      return res.status(400).json({
        status: 'failed',
        error: error.details[0].message
      });
    }
    next();
  },
};
