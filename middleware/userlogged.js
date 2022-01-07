const requiresLogin = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.isLoggedIn = true;
    return next();
  }
  if (req.method === "POST"){
    if(!req.body.path){
      req.session.returnTo = req.headers.referer
      res.redirect("/login");
      return next();
    }
    req.session.returnTo = req.body.path;
    res.locals.isLoggedIn = false;
    next();
  }else{
    req.session.returnTo = req.originalUrl;
    req.body.path = undefined;
    res.locals.isLoggedIn = false;
    res.redirect("/login");
    next();
}
};

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) return next();
  res.redirect("/");
};

module.exports = { requiresLogin, isLoggedIn };
