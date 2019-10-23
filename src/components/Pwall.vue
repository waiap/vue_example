<template>
  <div id="app">
  </div>
</template>

<script>
export default {
  name: 'Pwall',
  mounted() {
      document.dispatchEvent(new Event('payment_wall_load_app'));
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>