import Vue from 'vue'
import Router from 'vue-router'
import Populares from '../components/Populares'
import Resultados from '../components/Resultados'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Populares',
      component: Populares
    },
    {
      path: '/resultados',
      name: 'resultados',
      component: Resultados,
      props: true
    }
  ]
})
