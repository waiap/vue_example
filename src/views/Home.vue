<template>
  <div class="home">
    <Shop/>
  </div>
</template>

<script>
// @ is an alias to /src
import Shop from '@/components/Shop.vue'

export default {
  name: 'home',
  components: {
    Shop
  }
}
</script>
