const dev = require('./dev')
const test = require('./test')
const release = require('./release')

module.exports = {
    development: dev,
    test,
    release
}[process.env.NODE_ENV || 'development']