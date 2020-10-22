const express = require('express');
//接收模块
const bodyParser = require('body-parser');
const db = require('./module/db2');
const tools = require('./module/tools');
const { Logger } = require('mongodb');
const app = express();
app.use(bodyParser.json());
// 引入图片的静态资源
app.use(express.static(__dirname+"/upload"))
//发送验证码
app.post('/sendCode', async (req, res) => {
  console.log(req);
  try {
    // 接收手机号
    const phoneCode = req.body.phoneCode;
    const codeInfo = await db.findOne('userCodeList', {
      phoneCode,
    });
    //判断后台返会的数据是否有值
    if (codeInfo) {
      const time = Date.now() - codeInfo.sendTime;
      //判断验证码是否过期  当前时间减去发送时间 是否大于设置的过期时间
      if (time > 60 * 1000) {
        // 模拟生成随机的验证码
        const code = tools.getRandom(100000, 999999);
        //更新电话号码和发送时间
        await db.updateOne(
          'userCodeList',
          { phoneCode },
          {
            $set: {
              code,
              sendTime: Date.now(),
            },
          }
        );
        res.json({ ok: 1, code, msg: '发送验证码成功' });
      } else {
        //不要频繁操作
        tools.json(
          res,
          -1,
          '请不要发送太频繁。请在' +
            (60 - Number.parseInt(time / 1000)) +
            '秒后再次发送'
        );
      }
    } else {
      //没有值需要发送信息
      // 发送验证码
      const code = tools.getRandom(100000, 999999);
      await db.insertOne('userCodeList', {
        code,
        phoneCode,
        sendTime: Date.now(),
      });
      // await tools.sendCode(phoneCode,code);
      // tools.json(res,code,1,"发送验证码成功");
      res.json({
        ok: 1,
        code,
        msg: '发送验证码成功',
      });
    }
  } catch (msg) {
    res.json({
      ok: -1,
      msg,
    });
  }
});
//登录
app.post('/login', async (req, res) => {
  // 传进来的值
  const { phoneCode, code } = req.body;
  //查询数据库是否有该验证码和手机号
  const codeInfo = await db.findOne('userCodeList', {
    code: code / 1,
    phoneCode,
  });
  if (codeInfo) {
    //用户存在进行验证码的时间对比看是否过期
    if (Date.now() - codeInfo.sendTime > 10 * 1000) {
      tools.json(res, -1, '验证码过期');
    } else {
      await db.insertOne('userList', {
        phoneCode,
        // 登录时间
        regTime: Date.now(),
        //最后登录时间
        lastTime: Date.now(),
      });
    }
    res.json({
      ok: 1,
      token: tools.encode({
        phoneCode,
      }),
      msg: '登陆成功',
    });
  } else {
    tools(res, -2, '验证码错误');
  }
});

app.get('/search', async (req, res) => {
  const keyword = req.query.keyword;
  if (keyword.length > 0) {
    const shopList = await db.find('shopList', {
      whereObj: {
        shopName: new RegExp(keyword),
      },
    });
    console.log(shopList);
    res.json({
      ok: 1,
      shopList,
    });
  } else {
    res.json({
      ok: 1,
      shopList: [],
    });
  }
});

app.get("/shopInfo/:shopId",async (req,res)=>{
      console.log(req.params);
      const shopId = req.params.shopId;
      console.log(shopId);
      const shopInfo = await db.findOneById("shopList",shopId)
      res.json({
        ok:1,
        shopInfo
      })
})


app.listen(8090, function() {
  console.log('success');
});
