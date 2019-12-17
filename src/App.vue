<template>
  <div :class="$style.xx">
    <img src="~assets/header1.png" alt />
    <img src="./assets/img/body1.png" alt />
    rrr
    <router-view></router-view>
    <!-- <img src="./assets/jinnang.png" alt=""> -->
  </div>
</template>
<script>
// import  { t } from 'module/test'
// console.log(t, 999);

// import('./assets/jinnang.png').then(v=>console.log(v))
export default {
  name: 'Hellow',
  mounted() {
  }
}
</script>
<style module lang="scss">
body,
html {
  height: 100%;
  margin: 0;
}
body {
  overflow: hidden;
}
img {
  width: 100%;
}
.xx {
  height: 100%;
  overflow: hidden;
  color: red;
  box-sizing: border-box;
}
</style>