const isNotLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect(`/login`);
}

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) return next();
  res.redirect("/");
}

module.exports = { isNotLoggedIn, isLoggedIn };
