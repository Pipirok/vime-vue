<template>
  <li class="acc-list-item block">
    <b-button
      @click="removeAcc"
      icon-left="delete"
      class="is-danger mr-1"
    ></b-button
    >{{ acc.login }}:
    <span class="">{{ level }}</span>
    <hr />
  </li>
</template>

<script>
export default {
  name: "AccountListItem",
  props: {
    acc: {
      type: Object,
    },
  },
  computed: {
    level() {
      return this.acc.level !== -1 ? this.acc.level : "unregistered";
    },
  },
  methods: {
    removeAcc() {
      this.$buefy.dialog.confirm({
        type: "is-danger",
        title: `Delete account ${this.acc.login} ?`,
        message: `Warning: if you delete account ${this.acc.login}, it will be gone from the list. You can always add it again, though.`,
        onConfirm: () => {
          this.$store.dispatch("removeAcc", this.acc.login);
        },
      });
    },
  },
};
</script>

<style scoped>
.acc-list-item {
  width: 100%;
}
</style>
