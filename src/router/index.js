import Vue from 'vue'
import Router from 'vue-router'
import Populares from '../components/Populares'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Populares',
      component: Populares
    }
  ]
})
