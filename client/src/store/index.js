import Vue from "vue";
import Vuex from "vuex";

import axios from "axios";
import { DialogProgrammatic as Dialog } from "buefy";

// Not needed in production
// axios.defaults.baseURL = "http://localhost:5000";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accs: JSON.parse(window.localStorage.getItem("accs")) || [],
  },
  mutations: {
    addAcc(state, { login, level }) {
      state.accs.push({ login, level });
    },
    removeAcc(state, login) {
      state.accs = state.accs.filter((acc) => acc.login !== login);
    },
    hydrate(state, accs) {
      state.accs = accs;
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
          onConfirm: async () => {
            let data = await axios
              .delete(`/api/acc/remove/${login}`)
              .then((res) => res.data);
            if (data.error) {
              Dialog.alert({
                essage: `Something went wrong: ${data.message}.
                Check your internet connection (u MaTb)`,
                type: "is-danger",
              });
            } else {
              commit("removeAcc", data.removedAcc.login);
              window.localStorage.setItem("accs", JSON.stringify(state.accs));
              Dialog.alert({
                type: "is-success",
                message: `Account ${data.removedAcc.login} removed successfully!`,
              });
            }
          },
        });
      } else {
        Dialog.alert({
          type: "is-danger",
          message: `Account ${login} isn't added in the first place!`,
        });
      }
    },
    async addAcc({ commit, state }, acc) {
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
        let data = await axios
          .get(`/api/acc/add/${acc.login}/${acc.level}`)
          .then((res) => res.data);
        if (data.error) {
          Dialog.alert({
            essage: `Something went wrong: ${data.message}.
            Check your internet connection (u MaTb)`,
            type: "is-danger",
          });
        } else {
          commit("addAcc", data.addedAcc);
          window.localStorage.setItem("accs", JSON.stringify(state.accs));
          Dialog.alert({
            message: `Account ${data.addedAcc.login} added successfully!`,
            type: "is-success",
          });
        }
      }
    },
    async hydrate({ commit }) {
      let data = await axios.get("/api/acc/all").then((res) => res.data);
      if (data.error) {
        Dialog.alert({
          message: `Something went wrong: ${data.message}.
            Check your internet connection (u MaTb)`,
          type: "is-danger",
        });
      } else {
        commit("hydrate", data.accs);
      }
    },
  },
});
