<template>
  <v-app
    id="inspire"
  >
    <v-navigation-drawer
      fixed
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile v-for="item in items" :key="item.text" @click="menu(item.index)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-subheader class="mt-3 grey--text text--darken-1">Booklist</v-subheader>
        <v-list>
          <v-list-tile v-for="item in items2" :key="item.text" avatar @click="">
            <v-list-tile-avatar>
              <img :src="`https://randomuser.me/api/portraits/men/${item.picture}.jpg`" alt="">
            </v-list-tile-avatar>
            <v-list-tile-title v-text="item.text"></v-list-tile-title>
          </v-list-tile>
        </v-list>
        <v-list-tile class="mt-3" @click="">
          <v-list-tile-action>
            <v-icon color="grey darken-1">add_circle_outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">Browse Channels</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon color="grey darken-1">settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">Manage Subscriptions</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="red"
      dense
      fixed
      clipped-left
      app
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <img src='http://cosei.uam.mx/images/logos/1.png' class='logo' hidden/>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title" @click="home">COSEI</span>
      </v-toolbar-title>
      <v-layout row justify-center hidden-sm-and-down>
        <v-dialog v-model="dialog" persistent max-width="500px">
          <v-btn color="black" outline dark slot="activator">Registrarse</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">Registro Usuario</span>
            </v-card-title>
            <v-card-text v-if="!enviando">
              <v-container grid-list-md>
                <v-layout wrap >
                  <v-flex xs12 sm6 >
                    <v-text-field label="Nombre" v-model='nombre' required></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 >
                    <v-text-field label="Apellido" v-model='lastname' hint="Opcional"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="Email" v-model='email' required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="Contraseña" type="password" v-model='password' required></v-text-field>
                  </v-flex>
                  <v-flex xs12 hidden>
                    <v-select
                      label="Intereses"
                      multiple
                      autocomplete
                      chips
                      :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                    ></v-select>
                  </v-flex>
                </v-layout>
              </v-container>
              <small>*Campos Requeridos</small>
            </v-card-text>
            <div v-else>
              <div class="progress">
                <v-progress-circular indeterminate :size="70" :width="7" color="red"></v-progress-circular>
              </div>
            </div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="dialog = false">Cerrar</v-btn>
              <v-btn color="blue darken-1" flat @click.native="registro">Enviar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialog" persistent max-width="500px">
          <v-btn color="black" outline dark slot="activator">Iniciar Sesión</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">Iniciar Sesión</span>
            </v-card-title>
            <v-card-text v-if="!enviando">
              <v-container grid-list-md>
                <v-layout wrap >
                  <v-flex xs12>
                    <v-text-field label="Email" v-model='email' required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="Contraseña" type="password" v-model='password' required></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
              <small>*Campos Requeridos</small>
            </v-card-text>
            <div v-else>
              <div class="progress">
                <v-progress-circular indeterminate :size="70" :width="7" color="red"></v-progress-circular>
              </div>
            </div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="dialog = false">Cerrar</v-btn>
              <v-btn color="blue darken-1" flat @click.native="registro">Enviar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-layout v-if='searchprogress' class='searchprogress' row justify-space-around>
        <v-flex xs2>
          <v-progress-circular :size="80" :width="7" indeterminate color="red"></v-progress-circular>
        </v-flex>
      </v-layout>
      <router-view v-else></router-view>
      <v-snackbar
        :timeout="4000"
        :color="succes"
        :multi-line= 'true'
        :bottom = 'true'
        :absolute = 'false'
        class= 'snackbar'
        v-model="snackbar"
      >
        Hola! {{ nombre }}
        <v-btn dark flat @click.native="snackbar = false">Cerrar</v-btn>
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'
import Data from './assets/Data'
export default {
  data: () => ({
    dialog: false,
    searchprogress: false,
    nombre: '',
    lastname: '',
    password: '',
    email: '',
    Libros: '',
    snackbar: false,
    succes: 'green',
    enviando: false,
    toSearch: '',
    drawer: null,
    items: [
      {icon: 'trending_up', text: 'Populares', index: 'populares'},
      { icon: 'history', text: 'Historial', index: 'historial' },
      { icon: 'favorite', text: 'Favoritos', index: 'favoritos' },
      { icon: 'library_books', text: 'Booklists', index: 'booklist' }
    ],
    items2: [
      { picture: 28, text: 'Joseph' },
      { picture: 38, text: 'Apple' },
      { picture: 48, text: 'Xbox Ahoy' },
      { picture: 58, text: 'Nokia' },
      { picture: 78, text: 'MKBHD' }
    ]
  }),
  props: {
    source: String
  },
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
    },
    menu: function (index) {
      this.$router.push('/' + index)
    },
    registro: function () {
      this.enviando = true
      this.enviando = false
      this.dialog = false
      this.snackbar = true
    },
    home: function () {
      this.$router.push('/')
    }
  }
}
</script>
<style>
.progress {
  margin-left: 43% !important;
}
.searchprogress {
  margin-top: 20vh !important;
}
.logo{
  position: relative;
  height: 100%;
}
</style>
