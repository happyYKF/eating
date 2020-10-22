import axios from 'axios';

const state = {
  token: localStorage.token || null,
  phoneCode: localStorage.phoneCode || null,
};

const mutations = {
  CHANGE_TOKEN(state, { token, phoneCode }) {
    state.token = localStorage.token = token;
    state.phoneCode = localStorage.phoneCode = phoneCode;
  },
  OUT_LOGIN(state) {
    localStorage.clear();
    state.token = state.phoneCode = null;
    console.log("我退出了");
  },
};
const actions = {
  //验证码校验
  async getLogin({ commit },vm) {
    const { data } = await axios.post('/ele/login', {phoneCode:vm.phoneCode, code:vm.code });
    if (data.ok === 1) {
      commit('CHANGE_TOKEN', { token: data.token, phoneCode: vm.phoneCode });
     
        vm.$router.push("/")
    } else {
      alert(data.msg);
    }
  },
};
export default {
  state,
  mutations,
  actions,
};