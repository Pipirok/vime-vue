<template>
  <footer class="footer has-text-light has-background-black">
    <div class="container has-text-centered">
      <p class="is-size-3">
        Made by <a href="https://github.com/Pipirok">Pipirok</a>
      </p>
      <hr />
      <p class="is-size-4">Technologies used:</p>
      <ul>
        <li v-for="(tech, i) in techs" :key="i">
          <a :href="tech.href">{{ tech.name }}</a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  name: "TheFooter",
  data() {
    return {
      techs: [
        { name: "Vue 2", href: "https://vuejs.org" },
        { name: "Vuex", href: "https://vuex.vuejs.org" },
        { name: "Vue-router", href: "https://router.vuejs.org" },
        { name: "Buefy", href: "buefy.org" },
        { name: "Node", href: "https://nodejs.org" },
        { name: "Express", href: "https://expressjs.com" },
        { name: "Prisma", href: "https://prisma.io" },
        { name: "PostgreSQL", href: "https://postgresql.org" },
      ],
    };
  },
};
</script>
