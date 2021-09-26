<template>
  <div class="p-3 mb-5 is-block has-background-info-dark">
    <h2 class="is-size-2">Add</h2>
    <hr />
    <p class="is-size-5 pb-3">
      Enter account name below, click add, view information about the account
      and choose whether to add it or not.
    </p>
    <b-field>
      <b-input
        icon="account-plus"
        placeholder="Login to add"
        v-model="loginToAdd"
      ></b-input>
      <b-button type="is-primary" :disabled="!loginIsValid" @click="addAccount"
        >Add</b-button
      >
    </b-field>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "FormAddAccount",
  data() {
    return {
      loginToAdd: "",
    };
  },
  computed: {
    loginIsValid() {
      let login = this.loginToAdd;
      if (login.match(/[^A-Za-z0-9_]/g)) {
        return false;
      }
      if (login.length < 3) {
        return false;
      }
      if (login.length > 17) {
        return false;
      }
      return true;
    },
  },
  methods: {
    /**
     * Should probably move this to store's actions, will do that later.
     */
    addAccount() {
      axios
        .get(`https://api.vimeworld.ru/user/name/${this.loginToAdd}`)
        .then((response) => response.data)
        .then((accInfo) => {
          if (accInfo.length > 0) {
            this.$buefy.dialog.confirm({
              title: `Add ${accInfo[0].username} ?`,
              message: `Do you want to add ${accInfo[0].username} which is on level ${accInfo[0].level} ?`,
              onConfirm: () => {
                this.$store.dispatch("addAcc", {
                  login: accInfo[0].username,
                  level: accInfo[0].level,
                });
              },
            });
          } else {
            this.$buefy.dialog.confirm({
              title: `Add ${this.loginToAdd} ?`,
              message: `Do you want to add ${this.loginToAdd} which is unregistered ?`,
              onConfirm: () => {
                this.$store.dispatch("addAcc", {
                  login: this.loginToAdd,
                  level: -1,
                });
              },
            });
          }
        })
        .then(() => {
          // Cleanup
          this.loginToAdd = "";
        });
    },
  },
};
</script>

<style></style>
