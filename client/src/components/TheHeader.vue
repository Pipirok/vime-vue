<template>
  <b-navbar type="is-dark has-background-primary-dark">
    <template #brand>
      <b-navbar-item href="/">
        <h3 class="is-size-4">Vime Accs</h3>
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item href="https://github.com/Pipirok/vime-accounts">
        <b-icon type="is-light" icon="github"></b-icon>
      </b-navbar-item>
    </template>
    <template #end>
      <div class="container">
        <b-navbar-item href="/manage">
          <b-button type="is-primary is-dark is-medium">Manage</b-button>
        </b-navbar-item>
      </div>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: "TheHeader",
};
</script>

<style>
.navbar-menu {
  background: #552fbc;
}
</style>
