const state = {
    formattedAddress: localStorage.formattedAddress || '',
    tips:[],
    // city:localStorage.city || ""
};
const mutations = {
  CHANG_CITY_LOCATION(state, formattedAddress) {
    state.formattedAddress = localStorage.formattedAddress = formattedAddress;
  },
  //保存搜索的城市信息
  CHANGE_TIPS(state,tips){
            state.tips = tips
          //  state.city = localStorage.city =  tips[0].district
  }
};
const actions = {
  getCityLocation({ commit }) {
    if (!localStorage.formattedAddress) {
      commit('CHANG_CITY_LOCATION', '定位中...');
      AMap.plugin('AMap.Geolocation', function() {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete);
        AMap.event.addListener(geolocation, 'error', onError);

        function onComplete(data) {
          // data是具体的定位信息
          commit('CHANG_CITY_LOCATION', data.formattedAddress);
          console.log(111111,data);
        }

        function onError(data) {
          // 定位出错
        }
      });
    } else {
    }
  },
  //城市搜索
  AutoComplete({commit},keyword){
      //keyword 搜索关键字
    AMap.plugin('AMap.Autocomplete', function(){
        // 实例化Autocomplete
        var autoOptions = {
          //city 限定城市，默认全国
          city: '全国'
        }
        var autoComplete= new AMap.Autocomplete(autoOptions);
        autoComplete.search(keyword, function(status, result) {
          // 搜索成功时，result即是对应的匹配数据
          console.log(status, result);
          if(result.info === "OK")
          commit("CHANGE_TIPS",result.tips)
        })
      })
  }
};
export default {
  state,
  mutations,
  actions,
};
