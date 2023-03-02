//import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/main.scss'
import "normalize.css"
//import 'virtual:windi.css'
import App from './App.vue'

//import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'

import {viteSSR} from "vite-ssr/vue"
import {createHead} from "@vueuse/head"



// const router = createRouter({
//   history:createWebHistory(),
//   routes
// })

// const app = createApp(App)

// app.use(createPinia())
// app.use(router).mount('#app')




export default viteSSR(
  App,
  {
    routes
  },
  ({app,router})=>{
    const head=createHead();

    app.use(createPinia())
    app.use(head)
    return {
      head
    }
  }
)