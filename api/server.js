const express = require('express');
const bodyParser = require('body-parser');
const db = require('./module/db2');
const fs = require('fs');
const md5 = require('md5');
const tools = require('./module/tools');
const upPic = require('./module/upPic');
const app = express();
const mongodb = require('mongodb');
app.use(bodyParser.json());
app.use(express.static(__dirname + '/upload'));
app.post('/login', async (req, res) => {
  try {
    //接收账号与密码
    const { adminName, passWord } = req.body;
    //根据账号与密码查找管理员
    const info = await db.findOne('adminList', {
      adminName,
      passWord: md5(passWord + '(*^(*&^(*&)'),
    });
    //插入数据
    await db.insertOne('adminLog', {
      adminName,
      logType: info ? 1 : 2,
      detail: '登录信息：' + (info ? '成功' : '失败'),
      addTime: Date.now(),
    });
    //返会结果
    if (info) {
      //更新管理员最后登录的时间
      await db.updateOne(
        'adminList',
        { _id: info._id },
        { $set: { loginTime: Date.now() } }
      );
      //登录成功
      res.json({
        ok: 1,
        msg: '登陆成功',
        token: tools.encode({ adminName }),
      });
    } else {
      //登录失败
      tools.json(res, -1, '账号或密码错误');
    }
  } catch (err) {
    tools.json(res, -1, err);
  }
});
//除了login请求以外，都会执行该路由，如果路由没问题继续向下匹配
app.all('*', (req, res, next) => {
  //3 为过期了  2为解析失败
  const token = req.headers.authorization;
  const { ok, msg } = tools.decode(token);
  if (ok === 1) next();
  else {
    tools.json(res, 2, msg);
  }
});
//获得管理员登陆日志
app.get('/adminLog', async (req, res) => {
  let pageIndex = req.query.pageIndex / 1;
  const response = await db.page('adminLog', {
    sort: {
      addTime: -1,
    },
    pageIndex,
  });
  res.json(response);
});
//获得管理员列表
app.get('/adminList', async (req, res) => {
  let pageIndex = req.query.pageIndex / 1;
  const response = await db.page('adminList', {
    sort: {
      addTime: -1,
    },
    pageIndex,
    limit: 1,
  });
  res.json(response);
});
//根据ID删除日志
app.delete('/adminLog/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await db.deleteOneById('adminLog', id);
    tools.json(res, 1, '删除成功');
  } catch (e) {
    tools.json(res, -1, '删除失败');
  }
});

//添加店铺类别
app.post('/shopTypeList', (req, res) => {
  upPic(req, 'shopTypePic', async function({ ok, msg, params }) {
    if (ok === 1) {
      await db.insertOne('shopTypeList', {
        shopTypeName: params.shopTypeName,
        shopTypePic: params.newPicName,
        addTime: Date.now(),
      });
      tools.json(res, 1, '上传成功');
    } else {
      tools.json(res, -1, msg);
    }
  });
});
//获得店铺列表
app.get('/shopTypeList', async (req, res) => {
  const pageIndex = req.query.pageIndex;
  const keyWord = req.query.keyWord || '';
  let whereObj = {};
  if (keyWord) {
    whereObj = {
      shopTypeName: new RegExp(keyWord),
    };
  }
  const response = await db.page('shopTypeList', {
    pageIndex,
    whereObj,
    sort: {
      addTime: -1,
    },
    limit: 5,
  });
  res.json(response);
});
//修改店铺类别
app.put('/shopTypeList', (req, res) => {
  upPic(req, 'shopTypePic', async function({ ok, msg, params }) {
    if (ok === 3) {
      tools.json(res, -1, msg);
    } else {
      const upObj = {
        $set: { shopTypeName: params.shopTypeName },
      };
      //如果成功上传图片
      if (ok === 1) {
        const shopTypeInfo = await db.findOneById(
          'shopTypeList',
          params.shopTypeId
        );
        const result = await tools.deletePic(shopTypeInfo.shopTypePic); //删除
        upObj.$set.shopTypePic = params.newPicName;
      }
      await db.updateOneById('shopTypeList', params.shopTypeId, upObj);
      tools.json(res, 1, '修改成功');
    }
  });
});

//获得所有店铺类别
app.get('/allshopTypeList', async (req, res) => {
  const shopTypeList = await db.find('shopTypeList', {
    sort: {
      addTime: -1,
    },
  });
  res.json({
    ok: 1,
    shopTypeList,
  });
});

app.post('/shopList', (req, res) => {
  upPic(req, 'shopPic', async function({ ok, msg, params }) {
    if (ok === 1) {
      //根据店铺类别ID获得店铺类别信息
      const shopTypeInfo = await db.findOneById(
        'shopTypeList',
        params.shopTypeId
      );
      await db.insertOne('shopList', {
        shopName: params.shopName,
        shopPic: params.newPicName,
        shopTypeId: shopTypeInfo._id,
        shopTypeName: shopTypeInfo.shopTypeName,
        addTime: Date.now(),
      });
      tools.json(res, 1, '上传成功');
    } else {
      tools.json(res, -1, msg);
    }
  });
});
app.get('/shopList', async (req, res) => {
  let pageIndex = req.query.pageIndex / 1;
  const response = await db.page('shopList', {
    sort: {
      addTime: -1,
    },
    pageIndex,
    limit: 20,
  });
  res.json(response);
});

app.get('shopInfo/:id', async (req, res) => {
  const shopInfo = await db.findOneById('shopList', req.query.id);
  res.json({
    ok: 1,
    shopInfo,
  });
});
//删除商品
app.delete('/shopList/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await db.deleteOneById('shopList', id);
    tools.json(res, 1, '删除成功');
  } catch (e) {
    tools.json(res, -1, '删除失败');
  }
});
//根据店铺类别ID查找店铺信息
app.get('/shopList/:shopTypeId', async (req, res) => {
  const shopList = await db.find('shopList', {
    whereObj: {
      //传的是一个字符串，接收是一个对象所以要转换
      shopTypeId: mongodb.ObjectId(req.params.shopTypeId),
    },
  });
  console.log(shopList), res.json({ ok: 1, shopList });
});
//添加店铺类别
app.post('/goodsTypeList', async (req, res) => {
  //根据店铺ID获得店铺信息
  const shopInfo = await db.findOneById('shopList', req.body.shopId);
  console.log(shopInfo,req.body.goodsTypeName,req.body.shopId);
 await db.insertOne('goodsTypeList', {
    goodsTypeName: req.body.goodsTypeName,
    shopId: shopInfo._id,
    shopName:shopInfo.shopName,
    shopTypeName: shopInfo.shopTypeName,
    shopTypeId: shopInfo.shopTypeId,
    addTime: Date.now(),
  });
  res.json({
    ok:1,
    msg:"插入成功"
  })
});
//获去店铺类别
app.get("/goodsTypeList", async (req,res)=>{
  const pageIndex = req.query.pageIndex
  console.log(pageIndex);
  const response = await db.page("goodsTypeList",{
    pageIndex,
    sort:{ //排序
      addTime:-1
    },
    limit:2
  })
  res.json(response)
})











app.listen(80, function() {
  console.log('success');
});
