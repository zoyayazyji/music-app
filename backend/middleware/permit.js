const permit = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.sendStatus(401);
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).send("Unauthorized");
    }
    next();
  };
};

module.exports = permit;
