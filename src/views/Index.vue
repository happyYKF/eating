<template>
   <div class="index">

       <router-view></router-view>
        <!--头部-->
        <TabBar/>
    </div>
</template>
<script>
export default {
    name:"Index",
    components:{
        TabBar:()=>import("@/components/Tabbar")
    }
}
</script>
<style scoped>
      .index {
            width: 100%;
            height: calc(100% - 45px);
        }


        .home {
            width: 100%;
            height: 100%;
            overflow: auto;
            box-sizing: border-box;
        }
        .header,
        .search_wrap {
            background-color: #009eef;
            padding: 10px 16px;
        }
        .header .address_map {
            color: #fff;
            font-weight: bold;
        }
        .address_map i {
            margin: 0 3px;
            font-size: 18px;
        }
        .address_map span {
            display: inline-block;
            width: 80%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .search_wrap .shop_search {
            /* margin-top: 10px; */
            background-color: #fff;
            padding: 10px 0;
            border-radius: 4px;
            text-align: center;
            color: #aaa;
        }

        .search_wrap {
            position: sticky;
            top: 0px;
            z-index: 999;
            box-sizing: border-box;
        }

        .fixedview {
            width: 100%;
            position: fixed;
            top: 0px;
            z-index: 999;
        }
        /****************swiper************************************************/
        .entries {
            background: #fff;
            height: 47.2vw;
            text-align: center;
            overflow: hidden;
        }
        .foodentry {
            width: 20%;
            float: left;
            position: relative;
            margin-top: 2.933333vw;
        }
        .foodentry .img_wrap {
            position: relative;
            display: inline-block;
            width: 12vw;
            height: 12vw;
        }
        .img_wrap img {
            width: 100%;
            height: 100%;
        }
        .foodentry span {
            display: block;
            color: #666;
            font-size: 0.32rem;
        }
        /* 推荐商家 */
        .shoplist-title {
            display: flex;
            align-items: flex;
            justify-content: center;
            height: 9.6vw;
            line-height: 9.6vw;
            font-size: 16px;
            color: #333;
            background: #fff;
        }
        .shoplist-title:after,
        .shoplist-title:before {
            display: block;
            content: "一";
            width: 5.333333vw;
            height: 0.266667vw;
            color: #999;
        }
        .shoplist-title:before {
            margin-right: 3.466667vw;
        }
        .shoplist-title:after {
            margin-left: 3.466667vw;
        }

        .fixedview {
            width: 100%;
            position: fixed;
            top: 0px;
            z-index: 999;
        }
        /* 商家列表 */
        .index-container {
            background: #fff;
            color: #666;
            padding: 4vw 0;
            border-bottom: 0.133333vw solid #eee;
        }
        .index-shopInfo {
            display: flex;
            justify-content: flex-start;
            padding: 0 2.666667vw;
            align-items: stretch;
        }
        .logo_container {
            width: 17.333333vw;
            height: 17.333333vw;
        }
        .logo_container img {
            display: block;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 0.133333vw solid rgba(0, 0, 0, 0.08);
            border-radius: 0.533333vw;
        }
        .index_main {
            display: flex;
            justify-content: space-between;
            overflow: hidden;
            flex-direction: column;
            padding-left: 2.666667vw;
            font-size: 0.2rem;
            flex-grow: 1;
        }
        .index_shopname {
            align-items: center;
            color: #333;
            font-weight: 700;
            font-size: 0.9rem;
        }
        .index_shopname i {
            background: #ffe800;
            margin-right: 1.333333vw;
            padding: 0.266667vw 0.666667vw;
            text-align: center;
            white-space: nowrap;
            font-size: 0.6rem;
        }
        .index_shopname span {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .index-rateWrap {
            display: flex;
            align-items: center;
            overflow: hidden;
            justify-content: space-between;
        }

        .index-rateWrap .rate {
            margin-right: 1.066667vw;
        }
        .index-moneylimit {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
        .index-moneylimit .index-distanceWrap {
            color: #999;
        }
        .delivery {
            display: flex;
            align-items: center;
            font-size: 0.6rem;
            margin-left: 1.066667vw;
        }
        .delivery .icon-hollow {
            color: #fff;
            background-color: #2395ff;
            padding: 2px;
            box-sizing: border-box;
        }
        
</style>