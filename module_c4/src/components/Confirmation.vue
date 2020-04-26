<template>
  <div class="alert alert-success alert-dismissible fade show" role="alert">
    <b-alert variant="success" show>{{ message }}</b-alert>
    <button
      type="button"
      class="close"
      data-dismiss="alert"
      aria-label="Close"
      @click="closeWindow"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>
<script>
export default {
  props: ['message'],

  methods: {
    closeWindow() {
      this.$emit('close-window');
    },
  },
};
</script>
