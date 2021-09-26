<template>
  <div class="p-3 mb-3 is-block has-background-danger-dark">
    <h2 class="is-size-2">Remove</h2>
    <hr />
    <p class="is-size-5 pb-3">
      Enter account name below, click remove, view information about the account
      and choose whether to remove it or not.
    </p>
    <b-field>
      <b-autocomplete
        v-model="loginToRemove"
        :open-on-focus="true"
        placeholder="Login to remove"
        :data="filteredAccs"
        field="acc.login"
        icon="account-minus"
        @select="(option) => (selectedLoginToRemove = option)"
      ></b-autocomplete>
      <b-button
        :disabled="!selectedLoginToRemove"
        @click="removeAcc"
        type="is-primary"
        >Remove</b-button
      >
    </b-field>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "FormRemoveAccount",
  data() {
    return {
      selectedLoginToRemove: null,
      loginToRemove: "",
    };
  },
  computed: {
    ...mapState({
      allAccs: (state) => state.accs,
    }),
    allAccsLogins() {
      return this.allAccs.map((acc) => acc.login);
    },
    filteredAccs() {
      return this.allAccsLogins.filter(
        (acc) =>
          acc.toLowerCase().indexOf(this.loginToRemove.toLowerCase()) >= 0
      );
    },
  },
  methods: {
    removeAcc() {
      this.$store.dispatch("removeAcc", this.selectedLoginToRemove);
      this.loginToRemove = "";
      this.selectedLoginToRemove = null;
    },
  },
};
</script>

<style></style>
