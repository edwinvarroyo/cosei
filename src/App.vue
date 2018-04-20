<template>
  <v-app
    dark
    id="inspire"
  >
    <v-navigation-drawer
      fixed
      clipped
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
      <v-icon class="mx-3">fab fa-youtube</v-icon>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">COSEI</span>
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
                  <v-flex xs12>
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
                  <v-flex xs12>
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
      </v-layout>
      <v-spacer></v-spacer>
      <v-layout row align-center style="max-width: 650px">
        <v-text-field
          placeholder="Buscar..."
          single-line
          v-model="toSearch"
          append-icon="search"
          :append-icon-cb="() => {}"
          color="white"
          hide-details
          v-on:keyup.enter='search'
        ></v-text-field>
      </v-layout>
    </v-toolbar>
    <v-content>
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
    nombre: '',
    lastname: '',
    password: '',
    email: '',
    Libros: '',
    snackbar: false,
    succes: 'green',
    enviando: false,
    toSearch: '',
    drawer: true,
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
      this.coseiResponse = ''
      console.log(this.toSearch)
      var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
      var targetUrl = 'http://148.206.79.169/F/MB4MQ3RCAUTE5REMFRCPBN2GNKIYKK6N89B1F4XB2TVINE78C9-17845?func=find-b&request=' + this.toSearch + '&find_code=WRD&adjacent=N&x=48&y=11'
      console.log(Data.proxyUrl + targetUrl)
      axios.get(proxyUrl + targetUrl)
        .then(res => {
          this.getLibros(res.data)
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
      console.log('rows', rows)
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
      console.log(libros)
      this.Libros = libros
      this.coseiResponse = ''
    },
    menu: function (index) {
      this.$router.push('/' + index)
    },
    registro: function () {
      this.enviando = true
      this.enviando = false
      this.dialog = false
      this.snackbar = true
    }
  }
}
</script>
<style>
.progress {
  margin-left: 43% !important;
}
</style>
