<template>
  <v-container fill-height>
    <v-layout justify-center align-center>
      <v-flex xs12>
        <v-expansion-panel popout>
          <v-expansion-panel-content v-for="(item,i) in Libros" :key="i">
            <div slot="header"><v-icon >{{item.icon}}</v-icon>  {{item.titulo}}</div>
            <v-card>
              <v-card-text>
              <div v-if="item.tipo == 'Libro'">Autor: {{item.autor}}</div><div v-if="item.tipo == 'Pelicula'">Director: {{item.autor}}</div>
              <br/>
              Clasificacion: {{item.clasificacion}}
            </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
      <router-view/>
    </v-layout>
  </v-container>
</template>

<script>
// import axios from 'axios'
// import Data from '../assets/Data'
export default {
  props: ['Libros'],
  data: () => ({
  }),
  methods: {
  }
}
</script>
<style>
</style>
