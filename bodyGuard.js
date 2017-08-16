const bodyGuard = (function () {
  /**
   * @func allow
   * @param {role} - Either a string or array of allowed permissions. The 'whitelist'
   */
  const allow = role => {
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
  
  // Allow all but these groups
  const block = role => {
    return function (req, res, next) {
      if (typeof role === 'object') {
        role.indexOf(req.user.permissions) > 0
          : res.status(403).send({ message: 'Not Authorized' })
          ? next()
      } else if (typeof role === 'string') {
        role === req.user.permissions
          ? res.status(403).send({ message: 'Not Authorized' })
          : next()
      } else {
        res.status(403).send({ message: 'Not Authorized' })
      }
  }
  return { allow, block }
})()

module.exports = bodyGuard
