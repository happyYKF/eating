// 连接数据库
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
//连接数据库
function _connect() {
  return new Promise((resolve, reject) => {
    mongoClient.connect(
      'mongodb://127.0.0.1:27017',
      { useUnifiedTopology: true },
      (err, client) => {
        if (err) reject('连接数据失败');
        //指定操作的数据库
        else resolve(client.db('ele'));
      }
    );
  });
}

module.exports = {
  //插入
  async insertOne(collName, insertObj) {
    //连接要操作的数据库
    const db = await _connect();
    return new Promise((resolve, reject) => {
      //collName 插入的集合  insertObj要插入的内容
      db.collection(collName).insertOne(insertObj, (err, result) => {
        if (err) reject('插入失败');
        else resolve('插入成功');
      });
    });
  },
  //查找
  async findOne(collName, whereObj) {
    const db = await _connect();
    return new Promise((resolve, reject) => {
      db.collection(collName).findOne(whereObj, (err, result) => {
        if (err) reject('查找失败');
        else resolve(result);
      });
    });
  },
  //
  async findOneById(collName, id) {
    const db = await _connect();
    return new Promise((resolve, reject) => {
      db.collection(collName).findOne(
        {
          _id: mongodb.ObjectId(id),
        },
        (err, result) => {
          if (err) reject('查找失败');
          else resolve(result);
        }
      );
    });
  },
  async find(collName, obj = {}, cb) {
    // 解构赋值。
    const { skip = 0, limit = 0, sort = {}, whereObj = {} } = obj;
    const db = await _connect();
    return new Promise((resolve, reject) => {
      db.collection(collName)
        .find(whereObj)
        .limit(limit)
        .skip(skip)
        .sort(sort)
        .toArray((err, results) => {
          if (err) reject('获取信息失败');
          else resolve(results);
        });
    });
  },
  //按照ID来更新图片
  async updateOneById(collName, Id, upObj) {
    //连接数据库
    const db = await _connect();
    return new Promise((resolve, reject) => {
      db.collection(collName).updateOne(
        { _id: mongodb.ObjectId(Id) },
        upObj,
        function(err, result) {
          if (err) reject('更新失败');
          else resolve('更新成功');
        }
      );
    });
  },
  //更新一条信息
  async updateOne(collName, whereObj, upObj) {
    //连接数据库
    const db = await _connect();
    return new Promise((resolve, reject) => {
      db.collection(collName).updateOne(whereObj, upObj, function(err, result) {
        if (err) reject('更新失败');
        else resolve('更新成功');
      });
    });
  },
  //count查询记录条数
  async count(collName, whereObj = {}) {
    const db = await _connect();
    return new Promise((resolve, reject) => {
      db.collection(collName)
        .countDocuments(whereObj)
        .then((count) => {
          resolve(count);
        });
    });
  },
  //分页查询
  async page(
    collName,
    { whereObj = {}, pageIndex = 1, sort = {}, limit = 5 } = {}
  ) {
    console.log(limit);
    let pageSum = 1;
    const count = await this.count(collName, whereObj);
    pageSum = Math.ceil(count / limit);
    if (pageSum < 1) pageSum = 1;
    if (pageIndex < 1) pageIndex = 1;
    if (pageIndex > pageSum) pageIndex = pageSum;
    const result = await this.find(collName, {
      whereObj,
      sort,
      limit,
      skip: (pageIndex - 1) * limit,
    });
    return {
      ok: 1,
      [collName]: result,
      pageIndex,
      pageSum,
    };
  },

  //根据ID进行数据的删除
  async deleteOneById(collName, id) {
    const db = await _connect();
    return new Promise((resolve, reject) => {
      db.collection(collName).deleteOne(
        {
          _id: mongodb.ObjectId(id),
        },
        function(err, reuslts) {
          if (err) reject('删除失败');
          else resolve('删除成功');
        }
      );
    });
  },
};
