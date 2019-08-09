
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
<<<<<<< HEAD
      firstName: Joi.string()
        .min(2)
        .required()
        .regex(/^[A-Za-z]*$/)
        .error((errors) => {
          errors.forEach((err) => {
            // eslint-disable-next-line default-case
            switch (err.type) {
              case 'string.regex.base':
                err.message = 'First name cannot contain number or special characters';
                break;
              case 'any.required':
                err.message = 'First name is required';
                break;
              case 'string.min':
                err.message = 'First name must be at least 2 characters long';
                break;
              case 'string.base':
                err.message = 'First name must be a string';
                break;
            }
          });
          return errors;
        }),
      lastName: Joi.string()
        .min(2)
        .required()
        .regex(/^[A-Za-z]*$/)
        .error((errors) => {
          errors.forEach((err) => {
            // eslint-disable-next-line default-case
            switch (err.type) {
              case 'string.regex.base':
                err.message = 'Last name cannot contain number or special characters';
                break;
              case 'any.required':
                err.message = 'Last name is required';
                break;
              case 'string.min':
                err.message = 'Last name must be at least 2 characters long';
                break;
              case 'string.base':
                err.message = 'Last name must be a string';
                break;
            }
          });
          return errors;
        }),
      userName: Joi.string()
        .alphanum()
        .min(2)
        .required()
        .regex(/^[A-Za-z]+[A-Z-a-z-0-9]*$/)
        .error((errors) => {
          errors.forEach((err) => {
            // eslint-disable-next-line default-case
            switch (err.type) {
              case 'string.regex.base':
                err.message = 'User name cannot begin with a number';
                break;
              case 'any.required':
                err.message = 'User name is required';
                break;
              case 'string.alphanum':
                err.message = 'User name must contain only alpha-numeric characters';
                break;
              case 'string.min':
                err.message = 'User name must be at least 2 characters long';
                break;
              case 'string.base':
                err.message = 'User name must be a string';
                break;
            }
          });
          return errors;
        }),
      email: Joi.string()
        .email({ minDomainAtoms: 2 })
        .required(),
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
=======
      firstName: validationRules.firstName,
      lastName: validationRules.lastName,
      userName: validationRules.userName,
      email: validationRules.email,
      password: validationRules.password,
      confirmPassword: validationRules.confirmPassword,
>>>>>>> feat(reset password): implement ttl feedbacks
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

  emailValidation(req, res, next) {
    const emailSchema = Joi.object().keys({
      email: validationRules.email,
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

  passwordValidation(req, res, next) {
    const passwordSchema = Joi.object().keys({
      password: validationRules.password,
      confirmPassword: validationRules.confirmPassword,
    });

    const options = {
      language: {
        key: '{{key}} ',

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
};
