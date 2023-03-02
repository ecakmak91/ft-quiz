import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './assets/main.scss'

import "normalize.css"
// import 'virtual:windi.css'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'


const router = createRouter({
  history:createWebHistory(),
  routes
})

const app = createApp(App)

app.use(createPinia())
app.use(router).mount('#app')