const pg = require('pg')
const env = require('../config')

const config = env['dbConfig']

const pool = new pg.Pool(config)

module.exports = pool