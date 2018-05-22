import Vue from 'vue'
import Router from 'vue-router'
import Populares from '../components/Populares'
import Resultados from '../components/Resultados'
import Inicio from '../components/Inicio'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: Inicio
    },
    { path: '*', component: Inicio }
  ]
})
