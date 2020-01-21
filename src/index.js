import App from './App.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
// import 'element-ui/lib/dialog';
// import { Button } from 'element-ui'
// import 'element-ui/lib/button'
// import 'element-ui/lib/dialog'
// import el from 'element-ui'
// console.log(Button);

Vue.use(VueRouter)

const routes = [
    { path: '/foo', component: () => import(/* webpackChunkName:"Hellow" */'./Hellow.vue') },
]
const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})
new Vue({
    el: '#app',
    router,
    render: h => h(App),
    // components: { App }
})
if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}
// if (module.hot) {
//     module.hot.accept('./print.js', function () {
//         console.log('Accepting the updated printMe module!');
//         // printMe();
//     })
// }