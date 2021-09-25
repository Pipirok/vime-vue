import Vue from "vue";
import Vuex from "vuex";

//import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accs: [
      { login: "Pipirok", level: 12 },
      { login: "dawwaq", level: 13 },
      { login: "uHnocTop", level: 1 },
      { login: "uHnocTaop", level: 1 },
      { login: "uHnocTxop", level: 1 },
      { login: "uHnocTzop", level: -1 },
    ],
  },
  mutations: {
    addAcc(state, { login, level }) {
      state.accs.push({ login, level });
    },
    removeAcc(state, login) {
      state.accs = state.accs.filter((acc) => acc.login !== login);
    },
  },
  actions: {
    removeAcc({ commit }, login) {
      commit("removeAcc", login);
    },
  },
});
