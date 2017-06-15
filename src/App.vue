<template>
  <div id="app">
    <vaside></vaside>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <vtoast class="toast"></vtoast>
  </div>
</template>

<script>
import aside from './components/aside/aside'
import toast from './components/toast/toast'
export default {
  name: 'app',
  data() {
    return {

    };
  },
  components: {
    vaside:aside,
    vtoast:toast,
  }
}
</script>
<style scoped>
@import "./assets/css/reset.css";
.toast{
  position: fixed;
  top: 80%;
  left: 50%;
  transform: translate(-50%,0);
}
</style>
