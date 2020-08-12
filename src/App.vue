<template>
  <div>
    <div :class="$style.hhh">
      <!-- <Aa>
        <div slot="hhh">1111</div>
      </Aa>
      <Bb /> -->
    </div>
    <router-view></router-view>
    <!-- <img src="~assets/1.jpg" alt=""> -->
  </div>
</template>
<script>
// import Aa from './Aa.vue'
// import Bb from './Bb.vue'
// import { Button } from 'element-ui'

export default {
  name: 'App',
  // components: { Aa, Bb },
  data() {
    return {
      show: true
    }
  },
  computed: {
  },
  methods: {
    handle() {
      console.log(888);

      this.show = !this.show
    }
  },
  mounted() {
    console.log(11111);
    // fetch('/api/v5/home/index').then((a)=>{
    //   console.log(a.json());
    // }).catch(()=>{
    // })
  }

}
</script>
<style lang="scss" module>
// @import "math";

body,
html {
  height: 100%;
  margin: 0;
}
.hhh {
  font-weight: bold;
}
</style>