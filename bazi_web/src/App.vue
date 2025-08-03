<template>
  <div><MainHome/></div>
</template>
<script>
import MainHome from "./components/MainHome.vue";

export default {
  name: 'App',
  components: {MainHome},
}
</script>
<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  height: 100%;
}
</style>