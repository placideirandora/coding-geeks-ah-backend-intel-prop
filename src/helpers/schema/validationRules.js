/* eslint-disable default-case */
import Joi from 'joi';

export default {
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

  loginPassword: Joi.string()
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

  role: Joi.string()
    .valid('user', 'admin')
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'any.allowOnly':
            err.message = 'role must be either user or admin';
            break;
        }
      });
      return errors;
    }),

  bio: Joi.string()
    .min(20)
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'string.min':
            err.message = 'bio must be at least 20 characters long';
            break;
          case 'string.base':
            err.message = 'bio must be a string';
            break;
        }
      });
      return errors;
    }),
  username: Joi.string()
    .alphanum()
    .min(2)
    .regex(/^[A-Za-z]+[A-Z-a-z-0-9]*$/)
    .error((errors) => {
      errors.forEach((err) => {
        // eslint-disable-next-line default-case
        switch (err.type) {
          case 'string.regex.base':
            err.message = 'User name cannot begin with a number';
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

  title: Joi.string().trim()
    .required()
    .min(10)
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'string.min':
            err.message = 'Title must have atleast 10 characters';
            break;
        }
      });
      return errors;
    }),

  description: Joi.string().trim()
    .required()
    .min(10)
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'any.required':
            err.message = 'Description is required';
            break;
          case 'string.min':
            err.message = 'Description must have at least 10 characters';
            break;
        }
      });
      return errors;
    }),
  body: Joi.string().trim()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'any.required':
            err.message = 'Body is required';
            break;
        }
      });
      return errors;
    }),
  comment: Joi.string().trim()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'any.required':
            err.message = 'Comment is required';
            break;
        }
      });
      return errors;
    }),
  updateTitle: Joi.string().trim()
    .min(10),

  updateBody: Joi.string().trim(),

  updateDescription: Joi.string().trim()
    .min(10),

  category: Joi.string(),

  tags: Joi.string(),

  roles: Joi.string()
    .required()
    .valid('user', 'admin')
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'any.required':
            err.message = 'Role is required';
            break;
          case 'any.allowOnly':
            err.message = 'Role must be either user or admin';
            break;
        }
      });
      return errors;
    }),
  articleId: Joi.number(),
  id: Joi.number(),

  commentId: Joi.number().integer()
    .required(),
  reason: Joi.string().trim()
    .required()
    .min(5)
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'any.required':
            err.message = 'Reason is required';
            break;
          case 'string.min':
            err.message = 'Reason must have atleast 5 characters';
            break;
        }
      });
      return errors;
    }),
  reportId: Joi.number().integer()
    .required(),
  articleSlug: Joi.string()
    .required(),

  comments: Joi.string().strict().trim()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'string.base':
            err.message = 'Comment must be a string';
            break;
        }
      });
      return errors;
    }),

  start: Joi.number().integer()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'any.required':
            err.message = 'Start Index is required';
            break;
        }
      });
      return errors;
    }),
  stop: Joi.number().integer()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'any.required':
            err.message = 'Stop Index is required';
            break;
        }
      });
      return errors;
    })

};
