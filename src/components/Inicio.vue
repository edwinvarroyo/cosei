<template>
  <div>
    <div>
      <v-toolbar
        color="red"
        dark
        tabs
      >
        <v-text-field
          append-icon="search"
          label="Buscar"
          solo-inverted
          class="mx-3"
          flat
          v-model="toSearch"
          :append-icon-cb="search"
          color="red"
          hide-details
          v-on:keyup.enter='search'
        ></v-text-field>
        <v-tabs
          slot="extension"
          v-model="tabs"
          centered
          slider-color="white"
          color="transparent"
        >
          <v-tab
            v-for="n in dbs"
            :key="n.db"
          >
            {{ n.db }}
          </v-tab>
        </v-tabs>
      </v-toolbar>
      <div v-if='searchprogress'>
        <v-layout v-if='searchprogress' class='searchprogress' row justify-space-around>
          <v-flex xs2>
            <v-progress-circular :size="80" :width="7" indeterminate color="red"></v-progress-circular>
          </v-flex>
        </v-layout>
      </div>
      <v-tabs-items v-model="tabs" v-else>
        <v-tab-item>
          <v-card>
            <v-card-text>
              <v-container fill-height>
                <v-layout justify-center align-center row>
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
                </v-layout>
              </v-container>
              <div class="text-xs-center">
                <v-container>
                  <v-layout justify-center>
                    <v-flex xs8>
                      <v-pagination :length="pages" v-model="page" color='red' circle></v-pagination>
                    </v-flex>
                  </v-layout>
                </v-container>
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Data from '../assets/Data'
export default {
  data: () => ({
    toSearch: '',
    Libros: [],
    regis: 0,
    pages: 0,
    page: 1,
    searchprogress: false,
    dbs: [
      {db: 'General'},
      {db: 'Libros'},
      {db: 'Audiovisual'},
      {db: 'Revistas'},
      {db: 'Proyectos'},
      {db: 'UAM'}
    ]
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
      var registros = doc.getElementsByTagName('table')[2].rows[0].cells[0].innerHTML
      registros = registros.replace('(', '#')
      var R = registros.search('#')
      this.regis = registros.substring(R - 4, R - 1)
      if (this.regis % 15 !== 0) {
        this.pages = Math.trunc(this.regis / 15) + 1
      } else {
        this.pages = Math.trunc(this.regis / 15) 
      }
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
      this.page = 1
      // this.$router.replace('/')
      // this.$router.push({name: 'resultados', params: { Libros: this.Libros }})
      this.searchprogress = false
    }
  }
}
</script>
