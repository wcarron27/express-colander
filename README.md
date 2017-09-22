# express-colander
Quick little express middleware for authorization.

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)


### Installation
1. `npm install express-colander`

### Dependencies
[Passport.js](http://passportjs.org)

[Passport-jwt](https://github.com/themikenicholson/passport-jwt)

[Passport-local](https://github.com/jaredhanson/passport-local')

Express-colander currently relies on the existence of an object attached to the request like req.body or req.headers. It defaults to `req.user`. Colander then looks for the provided property on that object. It defaults to `permissions`.

So, if you have an object like so:
```
req: {
  user: {
    username: 'blah',
    email: 'email@blah.com',
    password: 'aas12347lkjhk@hlkjhasdjh#ha__09blkjga74',
    permissions: 'admin'
  }
}
```
You can just create a new instance of express-colander.

If you use a different request object, you'll need to pass and object to the class instance:
```
const Colander = require('express-colander')
const col = new Colander({
  modelName: 'account',
  propertyName: 'roles'
})
```
###### Note:
This is designed under the constraints of my own development. As such, it's main focus is to provide easy authorization for Express apps using Passport.js, Mongoose (yeah, I know, MongoDB sucks), and JWT based authentication. If you're interested in using this with other libraries, message me on Github.

### Usage
There are two methods, and only two provided by express-colander: `allow` and `block`. Think of them as whitelists and blacklists, respectively.

#### Allow
```
const express = require('express')
const Colander = require('express-colander')
const colander = new Colander()
const app = express()

/* Pass array to colander */
app.get(
  '/unencrypted-credit-card-info',
  passport.authenticate('jwt', { session: false}),
  colander.allow(['admin', 'editor']),
  (req, res) => {

    // Route logic here

  })

/* OR - pass a string */
app.get(
  '/your-browser-history',
  passport.authenticate('jwt', { session: false }),
  colander.allow('literallyNobodyEver'),
  (req, res) => {

    // Route logic here

  })
```

#### Block
```
const express = require('express')
const Colander = require('express-colander')
const colander = new Colander()
const app = express()

/* Block using string */
app.get(
  '/file-with-all-of-my-passwords',
  passport.authenticate('jwt', { session: false }),
  colander.block('guest'),
  (req, res) => {

    // Route logic here

  })

/* OR - block an array  */
app.post(
  '/ad-on-craiglist-personals',
  passport.authenticate('jwt', { session: false }),
  colander.block(['guest', 'minors', 'parents', 'grandparents', 'anyoneICareAbout']),
  (req, res) => {

    // Route logic here

  })
```

### Contributing
Hey there. This is a side-project I started out of boredom. However, I'll probably develop it as I go along. Right now it's a bit of a mess, but feel free to jump in!

Things I ask of you:
1. Write descriptive commit messages
2. Submit a pull request on the `develop` branch
3. Make sure you've run `npm run build` before you commit. 

### Roadmap
#### 0.2.0
1. Eslint configuration || Prettier integration
2. Git hooks maybe || at least github permissions on the repo level

#### 1.0.0
1. Enable configuration
2. Test suite
3. Stricter, official contribution guide
4. Refactor into cleaner modules

#### 2.0.0
1. Additional drivers/options for configuration
2. More tests
3. Locked dependency versions
