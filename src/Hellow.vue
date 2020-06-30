<template>
  <div :class="$style.hellow">
    hel343434low
    <el-button type="primary">主要按钮</el-button>
    <img src="./assets/header1.png" alt="">
  </div>
</template>
<script>

export default {
  name: 'Hello',
  mounted() {
    console.log(111, this.$route);
    // import('element-ui/lib/dialog')
    console.log(process.env.NODE_ENV);
    
  }
}
</script>
<style lang="scss" module>
.hellow {
  color: green;
  background: url('./assets/header1.png');
}
</style>