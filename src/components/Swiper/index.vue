<template>
    <div id="container">
        <mt-swipe :auto="4000" class="entries">
  <mt-swipe-item>1</mt-swipe-item>
  <mt-swipe-item>2</mt-swipe-item>
  <mt-swipe-item>3</mt-swipe-item>
</mt-swipe>
           <!--轮播图-->
            <!-- <div id="container"> -->
                <!-- 分类 -->
                <!-- <div class="entries">
                    <div class="entry_wrap">
                        <div class="foodentry">
                            <div class="img_wrap">
                                <img src="@/assets/img/1.jpeg">
                            </div>
                            <span>美食</span>
                        </div>
                        <div class="foodentry">
                            <div class="img_wrap">
                                <img src="@/assets/img/1.jpeg">
                            </div>
                            <span>美食</span>
                        </div>
                        <div class="foodentry">
                            <div class="img_wrap">
                                <img src="@/assets/img/1.jpeg">
                            </div> -->
                            <!-- <span>美食</span>
                        </div>
                        <div class="foodentry">
                            <div class="img_wrap">
                                <img src="@/assets/img/1.jpeg">
                            </div>
                            <span>美食</span>
                        </div>
                        <div class="foodentry">
                            <div class="img_wrap">
                                <img src="@/assets/img/1.jpeg">
                            </div>
                            <span>美食</span>
                        </div>
                        <div class="foodentry">
                            <div class="img_wrap">
                                <img src="@/assets/img/1.jpeg">
                            </div>
                            <span>美食</span>
                        </div> -->
                        <!-- <div class="foodentry">
                            <div class="img_wrap">
                                <img src="@/assets/img/1.jpeg">
                            </div>
                            <span>美食</span>
                        </div>
                        <div class="foodentry">
                            <div class="img_wrap">
                                <img src="@/assets/img/1.jpeg">
                            </div>
                            <span>美食</span>
                        </div>
                        <div class="foodentry">
                            <div class="img_wrap">
                                <img src="@/assets/img/1.jpeg">
                            </div> -->
                            <!-- <span>美食</span>
                        </div>
                        <div class="foodentry">
                            <div class="img_wrap">
                                <img src="@/assets/img/1.jpeg">
                            </div>
                            <span>美食</span>
                        </div>
                    </div> -->
                <!-- </div>
            </div> -->
    </div>
</template>
<script>
import { Swipe, SwipeItem } from 'mint-ui';
export default {
    name:"Swiper"
}
</script>
<style scoped>
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
            padding-top: 0.7vw;
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
      
</style>