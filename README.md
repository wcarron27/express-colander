# express-colander
Quick little express middleware for authorization.

### Installation
1. `npm install express-colander`

### Dependencies
[Passport.js](http://passportjs.org)
[Passport-jwt](https://github.com/themikenicholson/passport-jwt)
[Passport-local](https://github.com/jaredhanson/passport-local')

Express-colander relies on the existence of a property attached to the `req` object of an Express.js request.
It is a role based authorization model, and uses the `req.user` object provided by the passport middlwares above. It currently checks the 'permissions' attribute of the req.user object.
This is currently not configurable; but configuration is on the way. See the roadmap below for more details.


### Usage
There are two methods, and only two provided by express-colander: `allow` and `block`. Think of them as whitelists and blacklists, respectively.

#### Allow
```
const express = require('express')
const colander = require('express-colander')
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
const colander = require('express-colander')
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
