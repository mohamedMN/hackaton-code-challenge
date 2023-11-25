const isLogin = (req, res, next) => {
  // console.log("req.isAuthenticated() ", req.isAuthenticated());
  if (req.session.user) {
    return next();
  } else {
    return res.status(401).json({ message: "you have to Login first" }); // User is not authenticated
  }
};

module.exports = {
  isLogin,
};
