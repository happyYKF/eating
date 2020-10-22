import Vue from 'vue';
import Vuex from 'vuex';
import users from './users/index';
import Citylocation from "./Citylocation"
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    users,Citylocation
  },
});
