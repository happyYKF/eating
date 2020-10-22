<template>
  <div>
       <ELEheader>
      <h1 class="header-title">{{shopInfos.shopTypeName}}</h1>
    </ELEheader>
      <ul class="ulTop" style=" padding-top: 3rem;">
          <li>
             {{ shopInfos.addTime | date}}
          </li>
      </ul>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "ShopDetail",
  components: {
    ELEheader: () => import("@/components/common/ELEheader"),
  },
  data() {
      return {
          shopInfos:{}
      }
  },
  async mounted() {
    console.log(this.$route.params.shopid);
    const { data } = await axios.get(
      "/ele/shopInfo/" + this.$route.params.shopid
    );
    console.log(data.shopInfo);
        if(data.ok===1){
            this.shopInfos = data.shopInfo
        }
  },
};
</script>
<style scoped>

</style>