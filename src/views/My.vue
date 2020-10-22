<template>
  <div>
    欢迎{{ phoneCode }}到来
    <input type="button" value="退出" @click="outLogin" />
  </div>
</template>
<script>
export default {
  name: "My",
  data() {
    return {
      phoneCode: "",
    };
  },
  created() {
    this.phoneCode = localStorage.phoneCode;
  },
  methods: {
    outLogin() {
      //清除缓存 返回至登录界面
      this.$store.commit("OUT_LOGIN");
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
</style>