const path = require('path');
const fs = require('fs');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const views = require('koa-views');
const Router = require('koa-router');
const router = new Router();

router.post('/changepassword', async (ctx) => {
    const body = ctx.request.body;
    const userfile = fs.readFileSync('/file/svn/svnrepos/conf/passwd').toString();
    const pattern = new RegExp(`${body.username} = ${body.password}`)
    if (!pattern.test(userfile)) {
        ctx.body = JSON.stringify(
            {
                code: -1,
                data: '账号密码不存在',
                msg: '账号密码不存在'
            }
        );
    } else {
        const nuserfile = userfile.replace(`${body.username} = ${body.password}`, `${body.username} = ${body.npassword}`)
        fs.writeSync('/file/svn/svnrepos/conf/passwd', nuserfile);
        ctx.body = JSON.stringify(
            {
                code: 0,
                data: '修改成功',
                msg: '修改成功'
            }
        );
    }

})

router.get('/login', async (ctx) => {
    await ctx.render('login')
})
router.get('/', async (ctx) => {
    await ctx.render('app')
})
router.get('/**', async (ctx) => {
    await ctx.render('app')
})
const app = new Koa();
app.use(bodyParser());
app.use(serve(path.join(__dirname, 'public'), {
    maxage: 365 * 24 * 60 * 60 * 1000
}));
app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))
app.use(router.routes()).use(router.allowedMethods())

app.listen(3002);