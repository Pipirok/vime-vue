<template>
  <main-layout>
    <div class="tile is-parent">
      <b-button @click="recache" type="is-primary"> Recache </b-button>
    </div>
    <div class="tile">
      <div class="tile is-parent">
        <form-add-account></form-add-account>
      </div>
      <div class="tile is-parent">
        <form-remove-account></form-remove-account>
      </div>
    </div>
  </main-layout>
</template>

<script>
import FormAddAccount from "../components/FormAddAccount.vue";
import FormRemoveAccount from "../components/FormRemoveAccount.vue";
import MainLayout from "../components/MainLayout.vue";
export default {
  components: { MainLayout, FormRemoveAccount, FormAddAccount },
  name: "Manage",
  methods: {
    recache() {
      this.$store.dispatch("recache");
    },
  },
};
FormAddAccount;
</script>

<style></style>
