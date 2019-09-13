// Permissions for create
const createUser = (req, res, next) => {
  req.permissions = 'CREATE_USER';
  next();
};
const createArticle = (req, res, next) => {
  req.permissions = 'CREATE_ARTICLE';
  next();
};

// Permissions for update
const updateUser = (req, res, next) => {
  req.permissions = 'UPDATE_USER';
  next();
};
const updateUserRole = (req, res, next) => {
  req.permissions = 'UPDATE_USER_ROLE';
  next();
};
const updateArticle = (req, res, next) => {
  req.permissions = 'UPDATE_ARTICLE';
  next();
};

// Permissions for delete
const deleteUser = (req, res, next) => {
  req.permissions = 'DELETE_USER';
  next();
};
const deleteArticle = (req, res, next) => {
  req.permissions = 'DELETE_ARTICLE';
  next();
};

// Permissions for read
const readReport = (req, res, next) => {
  req.permissions = 'READ_REPORT';
  next();
};

export {
  createArticle,
  createUser,
  updateUser,
  updateUserRole,
  updateArticle,
  deleteUser,
  deleteArticle,
  readReport
};
