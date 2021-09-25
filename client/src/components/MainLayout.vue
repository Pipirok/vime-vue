<template>
  <div class="container-fluid main-container">
    <the-header></the-header>
    <main class="main container pt-5 has-text-light">
      <slot>Main content</slot>
    </main>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheFooter from "./TheFooter.vue";
import TheHeader from "./TheHeader.vue";
export default {
  components: { TheHeader, TheFooter },
  name: "MainLayout",
};
</script>

<style>
.main-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main {
  flex-grow: 1;
}
</style>
