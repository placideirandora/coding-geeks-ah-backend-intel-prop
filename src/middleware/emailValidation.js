import Joi from 'joi';

export default {
  /**
     * @description validates request body before registration
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object} validation oject
     */

  emailValidation(req, res, next) {
    const emailSchema = Joi.object().keys({
      email: Joi.string()
        .email({ minDomainAtoms: 2 })
        .required(),
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
