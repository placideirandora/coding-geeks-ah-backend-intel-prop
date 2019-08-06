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
        // eslint-disable-next-line no-useless-escape
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
        .required(),
      confirmPassword: Joi.string()
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
        .valid(Joi.ref('password'))
        .required()
        .strict()
    });

    const options = {
      language: {
        key: '{{key}} '
      }
    };
    const { error } = Joi.validate(req.body, userSchema, options);
    if (error) {
      res.status(400).json({
        status: 'failled',
        message: error.details[0].message
      });
    }
    next();
  },
};
