<template>
  <div class="xx" :class="$style.hellow">
    <span class="tt">hel343434low</span>
    <el-button type="primary">主要按钮</el-button>
    <img src="~assets/header1.png" alt />
  </div>
</template>
<script>
import { test } from "module/test";
export default {
  name: "Hello",
  mounted() {
    console.log(111, this.$route);
    // import('element-ui/lib/dialog')
    console.log(process.env.NODE_ENV);
    test();
  },
};
</script>



<style lang="scss" module>
@import "global";
.hellow {
  background: url("~assets/jinnang.png");
}
</style>