<template>
  <div >
    <div>
      <Aa>
        <div slot="hhh">1111</div>
      </Aa>
      <Bb />
    </div>
    <router-view></router-view>
    <img src="./assets/1.jpg" alt="">
  </div>
</template>
<script>
// import  { t } from 'module/test'
// import('./assets/jinnang.png').then(v=>console.log(v))
import Aa from './Aa.vue'
import Bb from './Bb.vue'

export default {
  name: 'Hellow',
  components: { Aa, Bb },
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
  mounted(){
    console.log(this);
    
  }

}
</script>
<style lang="scss" module>
body,
html {
  height: 100%;
  margin: 0;
}
</style>