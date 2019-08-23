import Joi from 'joi';
import { validationRules, options } from '../helpers/schema';

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
      confirmPassword: validationRules.confirmPassword,
      role: validationRules.role
    });

    const { error } = Joi.validate(req.body, userSchema, options);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message.replace(/\\|(")/g, '')
      });
    }
    next();
  },

  emailValidation(req, res, next) {
    const emailSchema = Joi.object().keys({
      email: validationRules.email
    });

    const { error } = Joi.validate(req.body, emailSchema, options);
    if (error) {
      return res.status(400).json({
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

    const { error } = Joi.validate(req.body, passwordSchema, options);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message
      });
    }
    next();
  },
  loginValidation(req, res, next) {
    const loginSchema = Joi.object().keys({
      email: validationRules.email,
      password: validationRules.loginPassword
    });
    const { error } = Joi.validate(req.body, loginSchema, options);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message.replace(/\\|(")/g, '')
      });
    }
    next();
  },
  profileValidation(req, res, next) {
    const profileSchema = Joi.object().keys({
      userName: validationRules.username,
      bio: validationRules.bio,
    });

    const { error } = Joi.validate(req.body, profileSchema, options);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message.replace(/\\|(")/g, '')
      });
    }
    next();
  },
  imageValidation(req, res, next) {
    let filename;
    if (req.files.image) {
      filename = req.files.image.path;
      const name = filename.split('/')[filename.split('/').length - 1];
      if (!name.match(/(.jpg|.png|jpeg)$/g)) {
        return res.status(400).json({
          error: 'Image must be of these format .jpg .png .jpeg'
        });
      }
    }
    next();
  },
  createArticleValidation(req, res, next) {
    const createArticleSchema = Joi.object().keys({
      title: validationRules.title,
      description: validationRules.description,
      body: validationRules.body,
      category: validationRules.category,
      tags: validationRules.tags,
    });
    const { error } = Joi.validate(req.body, createArticleSchema, options);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message.replace(/\\|(")/g, '')
      });
    }
    next();
  },
  updateRoleValidation(req, res, next) {
    const updateRoleSchema = Joi.object().keys({
      role: validationRules.roles
    });
    const { error } = Joi.validate(req.body, updateRoleSchema, options);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message.replace(/\\|(")/g, '')
      });
    }
    next();
  },
  idInParamsValidation(req, res, next) {
    const idSchema = Joi.object().keys({
      id: validationRules.id,
    });

    const { error } = Joi.validate(req.params, idSchema, options);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message
      });
    }
    next();
  },
};
