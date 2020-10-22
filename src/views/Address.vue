<template>
  <div class="address">
    <!--头部-->
    <ELEheader>
      <h1 class="header-title">请选择收货地址</h1>
    </ELEheader>
    <div class="city_search">
      <div class="search">
        <span class="city">
          北京
          <i class="iconfont iconicon"></i>
        </span>
        <i class="iconfont iconxingtaiduICON_sousuo--"></i>
        <input type="text" @input="getLocation" placeholder="请输入地址" />
      </div>

      <div>
        <div class="title">当前定位</div>
        <div class="des">
          <i class="iconfont icondaohang"></i>
          <span>{{$store.state.Citylocation.formattedAddress}}</span>
        </div>
      </div>
    </div>
    <div class="area">
      <ul
        class="area_list"
        v-for="(item, index) in $store.state.Citylocation.tips"
        :key="item.id + index"
        @click="changeLocation(index)"
      >
        <li>
          <h4>{{ item.district }}</h4>
          <p>{{ item.name + item.address }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "Address",
  components:{
      ELEheader:()=>import("@/components/common/ELEheader")
  },
  methods: {
    getLocation(e) {
      console.log();
      this.$store.dispatch("AutoComplete", e.target.value);
    },
    //调用该函数改变缓存中的地址  可以通过当前循环值的index获取到index所指定的地址信息
    changeLocation(index) {
      //拿到index调用状态管理中更改地址的函数

      this.$store.commit(
        "CHANG_CITY_LOCATION",
        this.$store.state.Citylocation.tips[index].district +
        this.$store.state.Citylocation.tips[index].name +
        this.$store.state.Citylocation.tips[index].address
      );
      // 获取并改变当前地址后可以进行页面的跳转
      this.$router.push('/')
    },
    //路由守卫  退出当前浏览器后清空搜索记录
    beforeRouteLeave(to, from, next) {
      this.$store.commit("CHANGE_TIPS", []);
      next();
    },
  },
};
</script>
<style scoped>
.address {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
}

.city_search {
  background-color: #fff;
  padding: 10px 20px;
  color: #333;
}

.search {
  background-color: #eee;
  height: 40px;
  border-radius: 10px;
  box-sizing: border-box;
  line-height: 40px;
}
.search .city {
  padding: 0 10px;
}
.city i {
  margin-right: 10px;
}
.search input {
  margin-left: 5px;
  background-color: #eee;
  outline: none;
  border: none;
}

.area {
  margin-top: 16px;
  background: #fff;
}
.area li {
  border-bottom: 1px solid #eee;
  padding: 8px 16px;
  color: #aaa;
}
.area li h4 {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.title {
  margin: 10px 0;
  font-size: 12px;
}
.des i {
  color: #009eef;
}
.des span {
  color: #333;
  font-weight: bold;
  margin-left: 5px;
  display: inline-block;
  width: 90%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/****************头部*******************************************/

</style>