/*
 * Simple defaults based upon my own use case
 */
const defaults = {
  modelName: 'user',
  propertyName: 'permissions'
}

/*
 * Simple object to send as a response when case fails
 */
const rejection = {
  message: 'Not Authorized'
}

/** Class representing the Colander middleware */
class Colander {
  /**
   * Create a colander
   * @param {Object} options - The request properties Colander will use for authorization
   */
  constructor (options = defaults) {
    this.modelName = options.modelName
    this.propertyName = options.propertyName
  }


  /**
   * Allow these roles to access the endpoint
   * @param {string || array} role - Allowed roles
   */
  allow (role) {
    return (req, res, next) => {
      if (typeof role === 'string') {
        return (role === req[this.modelName][this.propertyName])
          ? next()
          : res.status(403).send(rejection)
      } else if (typeof role === 'object') {
        return (role.indexOf(req[this.modelName][this.propertyName]) >= 0)
          ? next()
          : res.status(403).send(rejection)
      } else {
        res.status(403).send(rejection)
      }
    }
  }

  /**
   * Prevent these roles from accessing the endpoint
   * @param {string || array} role - Allowed roles
   */
  block (role) {
    return (req, res, next) => {
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
