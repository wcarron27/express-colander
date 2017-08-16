const bodyGuard = (function () {
  const allow = (role) => {
    return function (req, res, next) {
      if (typeof role === 'object') {
        role.indexOf(req.user.permissions) >= 0
          ? next()
          : res.status(403).send({
            message: 'Not authorized'
          })
      } else if (typeof role === 'string') {
        role !== req.user.permissions
          ? next()
          : res.status(403).send({
            message: 'Not authorized'
          })
      } else {
        res.status(403).send({
          message: 'Not authorized'
        })
      }
    }
  }
  return { allow }
})()

module.exports = bodyGuard
