import Joi from 'joi';
import rules from '../helpers/schema';

const { validationRules } = rules;
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
      firstName: validationRules.firstName,
      lastName: validationRules.lastName,
      userName: validationRules.userName,
      email: validationRules.email,
      password: validationRules.password,
      confirmPassword: validationRules.confirmPassword
    });

    const options = {
      language: {
        key: '{{key}} '
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

  emailValidation(req, res, next) {
    const emailSchema = Joi.object().keys({
      email: validationRules.email
    });

    const options = {
      language: {
        key: '{{key}} '
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

  passwordValidation(req, res, next) {
    const passwordSchema = Joi.object().keys({
      password: validationRules.password,
      confirmPassword: validationRules.confirmPassword
    });

    const options = {
      language: {
        key: '{{key}} '
      }
    };
    const { error } = Joi.validate(req.body, passwordSchema, options);
    if (error) {
      return res.status(400).json({
        status: 'failed',
        error: error.details[0].message
      });
    }
    next();
  },
  signInValidation(req, res, next) {
    const loginSchema = Joi.object().keys({
      email: validationRules.email,
      password: validationRules.loginPassword
    });
    const options = {
      language: {
        key: '{{key}} '
      }
    };
    const { error } = Joi.validate(req.body, loginSchema, options);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message

      });
    }
    next();
  }
};
