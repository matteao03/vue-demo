<template>
  <div class="layout">
    <router-view/>
    <TheFooter/>
  </div>
</template>

<script>
// @ is an alias to /src
import TheFooter from '@/components/layout/TheFooter.vue'

export default {
  name: 'layout',
  components: {
    TheFooter
  }
}
</script>

<style lang="scss" scoped>
.layout{
  height: calc(100vh - 50px);
}
</style>

