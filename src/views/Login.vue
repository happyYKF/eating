<template>
  <div class="login">
    <div class="logo">
      <img src="@/assets/img/logo.png" alt="my login image" />
    </div>
    <!-- 手机号 -->
    <div class="text_group">
      <div :class="{ input_group: true, 'is-invalid': phoneId_invalid }">
        <input type="input" placeholder="手机号" v-model="phoneCode" />
      </div>
      <div class="invalid-feedback" v-if="phoneId_invalid">请输入手机号</div>
    </div>
    <!-- 验证码 -->
    <div class="text_group">
      <div :class="{ input_group: true, 'is-invalid': phoneId_invalid }">
        <input type="input" placeholder="验证码" v-model="code" />
        <button @click="getCode">获取验证码</button>
      </div>
      <div class="invalid-feedback" v-if="phoneId_invalid">请输入验证码</div>
    </div>
    <div class="login_des">
      <p>
        新用户登录即自动注册，并表示已同意
        <span>《用户服务协议》</span>和<span>《隐私权政策》</span>
      </p>
    </div>
    <!-- 登录按钮 -->
    <div class="login_btn">
      <button @click="login">登录</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      phoneId_invalid: false,
      phoneCode: "",
      sendCode: "",
      code: "",
    };
  },
  methods: {
    async getCode() {
      // 手机号长度是否符合标准
      console.log(this.phoneCode);
      if (this.phoneCode.length == 11) {
        this.phoneId_invalid = false;
        //正则表达式判断电话号码是否符合标准
        let exp = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (exp.test(this.phoneCode) === true) {
          console.log("输入手机号码正确");
          const { data } = await axios.post("/ele/sendCode", {
            phoneCode: this.phoneCode,
          });
          console.log(data);

          if (data.ok === 1) {
            this.sendCode = data.code;
          } else {
            alert(data.msg);
          }
        } else {
          this.phoneId_invalid = false;
          alert("请输入正确的手机号");
        }
      } else {
        this.phoneId_invalid = true;
      }
    },
    async login() {
      console.log( this.phoneCode,this.code);
      this.$store.dispatch("getLogin",this)
      // console.log(this.$store.users);
      // if(this.$store.users.stateCode)
      // if (this.code == this.sendCode) {
      //   const { data } = await axios.post("/ele/login", {
      //     phoneCode: this.phoneCode,
      //     code: this.code,
      //   });
      //   if (data.ok === 1) {
      //     //将token存入本地缓存中
      //     localStorage.token = data.token;
      //     localStorage.phoneCode = this.phoneCode;
      //     this.$router.push("/")
      //     // console.log(this.$route);
      //   }
      // } else if(data.ok === -1){
      //   alert("验证码已过期")
      // }else{
      //    alert("请输入正确的验证码")
      // }
    },
  },
};
</script>
<style scoped>
.login {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  background: #fff;
}
.logo {
  text-align: center;
}
.logo img {
  width: 150px;
}
.text_group,
.login_des,
.login_btn {
  margin-top: 20px;
}
.login_des {
  color: #aaa;
  line-height: 22px;
}
.login_des span {
  color: #4d90fe;
}
.login_btn button {
  width: 100%;
  height: 40px;
  background-color: #4cd96f;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  border: none;
  outline: none;
}
.login_btn button[disabled] {
  background-color: #8bda81;
}

.input_group {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.input_group input {
  height: 100%;
  width: 60%;
  border: none;
  outline: none;
}
.input_group button {
  border: none;
  outline: none;
  background: #fff;
}
.input_group button[disabled] {
  color: #aaa;
}
.is-invalid {
  border: 1px solid red;
}
.invalid-feedback {
  color: red;
  padding-top: 5px;
}
</style>