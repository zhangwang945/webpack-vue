
<script>
import Cc from './Cc'
// import dd from 'dd'
// console.log(dd);
// var a,bbbb
export default {
  name: 'dfdfdf',
  data() {
    return {
      a1: 1,
      a2: 2
    }
  },
  computed: {
    result() {
      const { a1, a2 } = this
      console.log(9999);

      return a1 + a2
    }
  },
  render(h) {
    const v = h('div', {
      attrs: {
        aa: 33
      }
    },
      [
        h(Cc, {
          props: {
            zz: 11
          }
        })
      ]
    )
    return v
  }
}
</script>