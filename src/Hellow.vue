<template>
  <div :class="$style.hellow">
    hel343434low
    <Button type="primary">主要按钮</Button>
  </div>
</template>
<script>

import { Button } from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import 'element-ui/lib/dialog'
// import './style.css'

export default {
  name: 'Hello',
  components: { Button },
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
}
</style>