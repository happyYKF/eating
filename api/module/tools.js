const jwt = require('jwt-simple');
const KEY = '199712';
const fs = require('fs');
const path = require('path');
const request = require('request');
const querystring = require('querystring');
module.exports = {
  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  // sentCode() {
  //     const queryData = querystring.stringify({
  //       mobile:"1231312",
  //       tpl_id:"111",
  //       tpl_value:"#code#=1235231",
  //       key:"您申请的ApiKey"
  //     })
  //     const queryUrl = “http://v.juh

  // },
  getNowTime() {
    var date = new Date();
    return (
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1).toString().padStart(2, 0) +
      '-' +
      date
        .getDate()
        .toString()
        .padStart(2, 0) +
      ' ' +
      date
        .getHours()
        .toString()
        .padStart(2, 0) +
      ':' +
      date
        .getMinutes()
        .toString()
        .padStart(2, 0) +
      ':' +
      date
        .getSeconds()
        .toString()
        .padStart(2, 0)
    );
  },

  async deletePic(picName) {
    return new Promise((resolve, reject) => {
      fs.unlink(path.resolve(__dirname, '../upload/' + picName), function(err) {
        if (err) {
          reject(1); //失败
        } else {
          resolve('0'); //成功
        }
      });
    });
  },

  json(res, ok = -1, msg = '网络连接错误') {
    res.json({
      ok,
      msg,
    });
  },
  encode(payload) {
    return jwt.encode(
      {
        //展开传入的用户名，并添加时间戳  进行合并
        ...payload,
        ...{
          creatTime: Date.now(),
        },
      },
      KEY
    );
  },
  //解析token
  decode(token) {
    try {
      const info = jwt.decode(token, KEY);
      //十分钟过期
      const times = 60 * 60 * 1000;
      if (Date.now() - info.creatTime > times) {
        return {
          ok: 3,
          msg: 'token过期了',
        };
      } else {
        return {
          ok: 1,
          msg: 'token正常',
        };
      }
    } catch (e) {
      return {
        ok: 2, //token 解析失败
        msg: 'token 解析失败了',
      };
    }
  },
};
