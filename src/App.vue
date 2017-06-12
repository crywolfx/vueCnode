<template>
  <div id="app">
    <vheader></vheader>
    <router-view></router-view>
    <vcontent></vcontent>
    <vfooter></vfooter>
  </div>
</template>

<script>
  import header from './components/header/header'
  import footer from './components/footer/footer'
  import content from './components/content/index'
export default {
  name: 'app',
  data() {
    return {

    };
  },
  components: {
      vheader:header,
      vfooter:footer,
      vcontent:content,
  }
}
</script>

<style scoped>

</style>
