<template>
  <div id="app">
      integrador
  </div>
</template>

<script>
export default {
  name: 'Integration',
  mounted() {
      document.dispatchEvent(new Event('payment_wall_load_app'));
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>