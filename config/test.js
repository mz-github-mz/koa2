module.exports = {
    env: 'test',
    dbConfig: {
        user: 'mfspmtest1',
        database: 'mofang_spm',
        password: 'mfspmtest1',
        host: '192.168.67.6',
        port: '15432',
        poolSize: 5,
        poolIdleTimeout: 30000,
        reapIntervalMillis: 10000
    }

}