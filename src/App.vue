<template>
  <div id="app">
    <vaside></vaside>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import aside from './components/aside/aside'
export default {
  name: 'app',
  data() {
    return {

    };
  },
  components: {
    vaside:aside,
  }
}
</script>
<style scoped>
@import "./assets/css/reset.css";
</style>
