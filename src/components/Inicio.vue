<template>
  <v-container>
    <div v-if='searchprogress'>
      <v-layout v-if='searchprogress' class='searchprogress' row justify-space-around>
        <v-flex xs2>
          <v-progress-circular :size="80" :width="7" indeterminate color="red"></v-progress-circular>
        </v-flex>
      </v-layout>
    </div>
     <div grid-list-md v-else>
      <v-layout row wrap>
        <v-flex xs3 offset-xs4>
          <h3>Buscador</h3>
        </v-flex>
        <v-flex xs10 offset-xs1>
          <v-text-field
            solo
            placeholder="Buscar..."
            single-line
            v-model="toSearch"
            append-icon="search"
            :append-icon-cb="search"
            color="white"
            hide-details
            v-on:keyup.enter='search'
          ></v-text-field>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>
<script>
import axios from 'axios'
import Data from '../assets/Data'
export default {
  data: () => ({
    toSearch: '',
    searchprogress: false
  }),
  methods: {
    search: function () {
      this.searchprogress = true
      var targetUrl = 'http://148.206.79.169/F/6FX47H7NT3LEQGU9M2E4T4NE81C1PMETKB612RINDXDH4BYUL3-21773?func=find-b&request=' + this.toSearch + '&find_code=WRD&adjacent=N&x=51&y=11'
      axios.get(Data.proxyUrl + targetUrl)
        .then(res => {
          if (res.status === 200) {
            this.getLibros(res.data)
          }
        })
        .catch(function (error) {
          console.log('err', error)
        })
    },
    getLibros (data) {
      var parser = new DOMParser()
      var doc = parser.parseFromString(data, 'text/html')
      var libros = []
      var rows = doc.getElementsByTagName('table')[3].rows
      for (var i = 1; i < rows.length; i++) {
        var libro = {}
        var libroinfo = rows[i].cells
        for (var j = 0; j < libroinfo.length; j++) {
          if (j === 0) {
            if (libroinfo[j].getElementsByTagName('a')[0]) {
              libro.ver = libroinfo[j].getElementsByTagName('a')[0].href
            }
          }
          if (j === 1) {
            libro.autor = libroinfo[j].innerHTML.replace(/&nbsp;|<br>/g, '')
          }
          if (j === 2) {
            var titulo = libroinfo[j].innerHTML
            var n = titulo.search('/')
            if (n > 0) {
              titulo = libroinfo[j].innerHTML.substring(0, n)
            }
            libro.titulo = titulo.replace(/&nbsp;/g, '')
          }
          if (j === 3) {
            if (libroinfo[j].getElementsByTagName('a')[0]) {
              libro.coleccion = libroinfo[j].getElementsByTagName('a')[0].href
            }
          }
          if (j === 4) {
            libro.clasificacion = libroinfo[j].innerHTML.replace(/&nbsp;|<br>/g, ' ')
            if (libro.clasificacion.substring(0, 3) === 'DVD' || libro.clasificacion.substring(0, 2) === 'VC' || libro.clasificacion.substring(0, 2) === 'VV') {
              libro.tipo = 'Pelicula'
              libro.icon = 'movie'
            } else {
              libro.tipo = 'Libro'
              libro.icon = 'book'
            }
          }
          if (j === 5) {
            libro.year = libroinfo[j].innerHTML
          }
          if (j === 6) {
            libro.seccion = libroinfo[j].innerHTML
          }
          if (j === 7) {
            libro.tema = libroinfo[j].innerHTML
          }
        }
        libros.push(libro)
      }
      this.Libros = libros
      this.$router.replace('/')
      this.$router.push({name: 'resultados', params: { Libros: this.Libros }})
      this.searchprogress = false
    }
  }
}
</script>
