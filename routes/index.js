const router = require('koa-router')()
const Dict = require('../utils/Dict')
const pgPool = require('../db')

router.get('/', async (ctx, next) => {
  console.log(process.env.NODE_ENV)
  await ctx.render('index', {
    content: '魔方埋点项目'
  })
})

router.get('/spm', (ctx, next) => {
  const query = ctx.query
  const spm = query.spm
  const spmArr = spm.split('.')
  const [project, platform, module, page, eventType, item] = spmArr.map(item => item && Number(item))
  const _evt = Dict['eventType'][eventType]
  if(spm && spmArr.length === 6){
    ctx.body = '已发送'
    // 操作数据库
    // pgPool.connect((isErr, client, done) => {
    //     if(isErr){
    //         console.log('error:', isErr.message)
    //         return
    //     }
    //     client.query(`insert into base ("spm", "eventType", "project", "platform", "module", "page", "item") values ($1::text, $2::text, $3::int2, $4::int2, $5::int2, $6::int2, $7::int2)`, [spm, _evt, project, platform, module, page, item], (isErr, rst) => {
    //         done()
    //         if(isErr){
    //             console.log('error:', isErr.message)
    //         } else {
    //             console.log('success:', rst)
    //         }
    //     })
    // })
} else {
    ctx.body = 'spm传输数据错误'
    next()
}

router.post('/querySearch', async (ctx, next) => {
  const {project} = ctx.request.body
  try{
      const data = await getData(`select * from base where project=${project}`)
      console.log('error: ', data)
      ctx.body = data
  } catch(e) {
      ctx.body = e.message
  }
})

function getData(query){
  return new Promise((resolve, reject) => {
      pgPool.connect((isErr, client, done) => {
          if(isErr){
              console.log('error:', isErr.message)
              reject()
              return
          }
          client.query(query, async (isErr, rst) => {
              done()
              if(isErr){
                  console.log('error:', isErr.message)
                  reject()
              } else {
                  console.log('success:', rst.rows)
                  resolve(rst.rows)
              }
          })
      })
  })
}




})

module.exports = router
