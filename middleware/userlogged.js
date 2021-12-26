function isNotLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  res.redirect(`/login`);
}

function isLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) return next();
  res.redirect("/");
}

module.exports = { isNotLoggedIn, isLoggedIn };
