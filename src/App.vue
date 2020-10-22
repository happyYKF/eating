<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
*{
    padding:0;
    margin:0;
  }
  #app {
            width: 100%;
            height: 100%;
            font-size: 14px;
            background: #f1f1f1;
        }


        .index {
            width: 100%;
            height: calc(100% - 45px);
        }
</style>
