import Vue from "vue";
import Vuex from "vuex";

import { DialogProgrammatic as Dialog } from "buefy";

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
    removeAcc({ commit, state }, login) {
      if (
        state.accs
          .map((acc) => acc.login.toLowerCase())
          .includes(login.toLowerCase())
      ) {
        Dialog.confirm({
          title: `Delete account ${login}`,
          message: `Are you sure you want to delete ${login} ?`,
          type: "is-danger",
          onConfirm: () => {
            commit("removeAcc", login);
            Dialog.alert({
              type: "is-success",
              message: `Account ${login} deleted successfully!`,
            });
          },
        });
      } else {
        Dialog.alert({
          type: "is-danger",
          message: `Account ${login} isn't added in the first place!`,
        });
      }
    },
    addAcc({ commit, state }, acc) {
      /**
       * Since level is going to be fetched separately each time an account is added,
       * Simply checking by using `Array.includes()` is not going to work as intended.
       * Hence, this solution.
       */
      if (
        state.accs
          .map((acc) => acc.login.toLowerCase())
          .includes(acc.login.toLowerCase())
      ) {
        Dialog.alert({
          message: `Account ${acc.login} is already added!`,
          type: "is-danger",
        });
      } else {
        commit("addAcc", acc);
        Dialog.alert({
          message: `Account ${acc.login} added successfully!`,
          type: "is-success",
        });
      }
    },
  },
});
