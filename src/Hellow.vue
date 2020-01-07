<template>
  <div :class="$style.hellow">hel343434low</div>
</template>
<script>


export default {
  name: 'Hellow',
  mounted() {
    console.log(this.$route);
  }
}
</script>
<style lang="scss" module>
.hellow {
  color: green;
}
</style>