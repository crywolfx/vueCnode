<template>
  <div id="app">
    <vheader></vheader>
    <router-view></router-view>
    <vfooter></vfooter>
  </div>
</template>

<script>
  import header from './components/header/header'
  import footer from './components/footer/footer'
export default {
  name: 'app',
  data() {
    return {

    };
  },
  components: {
      vheader:header,
      vfooter:footer,
  }
}
</script>

<style scoped>

</style>
