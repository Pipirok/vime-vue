<template>
  <main-layout>
    <template v-if="accsExist">
      <h3 class="is-size-3">Accs:</h3>
      <div class="tile is-ancestor block">
        <div class="tile is-parent">
          <b-field>
            <b-select v-model="sort" rounded icon="sort">
              <option value="0" selected>High to low</option>
              <option value="1" selected>Low to high</option>
              <option value="2">Below 5</option>
              <option value="3">Unregistered</option>
            </b-select>
          </b-field>
        </div>
        <div class="tile is-parent">
          <b-button
            @click="selectRandom"
            type="is-primary"
            :disabled="!accsToShowExist"
          >
            Random
          </b-button>
        </div>
      </div>
      <account-list v-if="accsToShowExist">
        <account-list-item
          v-for="(acc, i) in accsToShow"
          :key="i"
          :acc="acc"
        ></account-list-item>
      </account-list>
      <template v-else>
        <div class="block">
          <p class="is-size-4">No accs found. <br />Try another sort</p>
        </div>
      </template>
    </template>
    <template v-else>
      <h2 class="is-size-2">Nothing here yet!</h2>
    </template>
  </main-layout>
</template>

<script>
import { mapState } from "vuex";
import AccountList from "../components/AccountList.vue";
import AccountListItem from "../components/AccountListItem.vue";
import MainLayout from "../components/MainLayout.vue";
export default {
  components: { MainLayout, AccountList, AccountListItem },
  name: "Index",
  data() {
    return {
      sort: 0,
    };
  },
  computed: {
    ...mapState({
      allAccs: (state) => state.accs,
    }),
    accsToShow() {
      let currentAllAccs = this.allAccs || [];

      // For some reason, checking for numeral types doesn't work
      switch (this.sort) {
        case "0":
          return currentAllAccs.sort((acc1, acc2) => acc2.level - acc1.level);
        case "1":
          return currentAllAccs.sort((acc1, acc2) => acc1.level - acc2.level);
        case "2":
          return currentAllAccs.filter((acc) => acc.level <= 5);
        case "3":
          return currentAllAccs.filter((acc) => acc.level === -1);
        default:
          return currentAllAccs.sort((acc1, acc2) => acc2.level - acc1.level);
      }
    },
    accsExist() {
      return this.allAccs.length > 0;
    },
    accsToShowExist() {
      return this.accsToShow.length > 0;
    },
  },
  methods: {
    selectRandom() {
      let randomAcc =
        this.accsToShow[Math.floor(Math.random() * this.accsToShow.length)];
      this.$buefy.dialog.alert(
        `Your random account: ${randomAcc.login} ${
          randomAcc.level !== -1 ? `(lvl ${randomAcc.level})` : "(unregistered)"
        }`
      );
    },
  },
};
</script>
