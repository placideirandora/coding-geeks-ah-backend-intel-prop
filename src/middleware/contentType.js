const contentType = (req, res, next) => {
  if (!req.is('multipart/form-data')) {
    return res.status(415).send({
      error: 'Wrong content-type. Please change it to multipart/form-data and try again.'
    });
  }
  next();
};

export default contentType;
