<template>
  <div id="app">
    <br />
    <todo></todo>
  </div>
</template>

<script>
import ToDo from './components/ToDo.vue';

export default {
  name: 'App',
  components: {
    todo: ToDo,
  },
};
</script>

<style scoped></style>
