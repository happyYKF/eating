const jwt = require("jwt-simple")

//生成token 
//第一个参数是你要荷载的内容payload 第二个参数是key（钥匙）
const key = "1997"
const token = jwt.encode({
    adminName:"yangkaifeng",
    creatTime:Date.now(), //生成时间
},key)
console.log(token);

//解密token
const info= jwt.decode(token,key)
console.log(info);

//获取的当前时间
const nowTime = Date.now();
console.log(nowTime);
// 当前时间减去token 的时间
if((nowTime - info.creatTime) > 10*60*1000){
    console.log("过期了");
}else{
    console.log("正常的");
}