<template>
  <div class="container m-auto">
    <header>
      <RouterLink to="/" class="logo">
        <img alt="Fast Track logo" src="https://www.fasttrack-solutions.com/_nuxt/img/logo.f6d466a.svg"/>
      </RouterLink>
      
    </header>
    <RouterView></RouterView>
    <!-- {{ 
      $router.getRoutes()
    }} -->
  </div>
</template>
<script setup>
  import { RouterLink, RouterView } from 'vue-router'
</script>
<style lang="scss">

  header{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 2em;
    z-index: 4;
    position: relative;
    .logo{
      width: 160px;
      box-sizing: border-box;
      img{
        width: 100%;
      }
    }
  }
  

  .fade-enter {
    opacity: 0;
}

.fade-enter-active {
    transition: opacity 2s ease;
}

.fade-leave {

}

.fade-leave-active {
    transition: opacity 2s ease;
    opacity: 0;
}
@media only screen and (max-width: 650px) {
  .logo {
    background: rgba(255,255,255,.5);
    padding: 1em;
    width: 250px;
  }
  header{
    margin: 2em 0 0.5em;
  }
}
  
</style>

