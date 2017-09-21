/**
 * @module colander
 */

/**
 * @param {JSON object} - Options object with modelName and propertyName properties
 * @return {object} - returns an object with functions as properties
 */
const colander = (function (options = { modelName: 'user', propertyName: 'permissions' }) {
  /**
   * @func allow
   * @param {role} - Either a string or array of allowed permissions. The 'whitelist'
   */
  const allow = role => {
    return function (req, res, next) {
      if (typeof role === 'object') {
        return (role.indexOf(req[options.modelName][options.propertyName]) >= 0)
          ? next()
          : res.status(403).send({
            message: 'Not authorized'
          })
      } else if (typeof role === 'string') {
        return (role === req[options.modelName][options.propertyName])
          ? next()
          : res.status(403).send({
            message: 'Not authorized'
          })
      } else {
        return res.status(403).send({
          message: 'Not authorized'
        })
      }
    }
  }

  // Allow all but these groups
  /**
   * @func block
   * @param {string || array} - roles/groups/permissions disallowed on route
   */
  const block = role => {
    return function (req, res, next) {
      if (typeof role === 'object') {
        return (role.indexOf(req[options.modelName][options.propertyName]) >= 0)
          ? res.status(403).send({ message: 'Not Authorized' })
          : next()
      } else if (typeof role === 'string') {
        return (role === req[options.modelName][options.propertyName])
          ? res.status(403).send({ message: 'Not Authorized' })
          : next()
      } else {
        return res.status(403).send({ message: 'Not Authorized' })
      }
    }
  }
  return { allow, block }
})()


const defaults = {
  modelName: 'user',
  propertyName: 'permissions'
}

const rejection = {
  message: 'Not Authorized'
}

class Colander {
  constructor (options = defaults) {
    this.modelName = options.modelName
    this.propertyName = options.propertyName
  }

  this.allow (role) {
    return function (req, res, next) {
      if (typeof role === 'string') {
        return (role === req[this.modelName][this.propertyName])
          ? next()
          : res.status(403).send(rejection)
      } else if (typeof role === 'object') {
        return (role.indexOf(req[this.modelName][this.propertyName]) >= 0)
          ? next()
          : res.status(403).send(rejection)
      } else {
        res.status(403).send(rejection)j
      }
    }
  }

  this.block (role) {
    return function (req, res, next) {
      if (typeof role === 'string') {
        return (role === req[this.modelName][this.propertyName])
          ? res.status(403).send(rejection)
          : next()
      } else if (typeof role === 'object') {
        return (role.indexOf(req[this.modelName][this.propertyName]) >= 0)
          ? res.status(403).send(rejection)
          : next()
      } else {
        return res.status(403).send(rejection)
      }
    }
  }
}

module.exports = Colander
