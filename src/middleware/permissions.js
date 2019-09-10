// Permissions for create
const createUser = (req, res, next) => {
  req.permissions = 'create user';
  next();
};
const createArticle = (req, res, next) => {
  req.permissions = 'create article';
  next();
};

// Permissions for update
const updateUser = (req, res, next) => {
  req.permissions = 'update user';
  next();
};
const updateUserRole = (req, res, next) => {
  req.permissions = 'update user role';
  next();
};
const updateArticle = (req, res, next) => {
  req.permissions = 'update article';
  next();
};

// Permissions for delete
const deleteUser = (req, res, next) => {
  req.permissions = 'delete user';
  next();
};
const deleteArticle = (req, res, next) => {
  req.permissions = 'delete article';
  next();
};

// Permissions for read
const readReport = (req, res, next) => {
  req.permissions = 'read report';
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
