<template>
  <div id="app">
    <Nav></Nav>
    <transition name="fade" mode="out-in">
      <router-view class="router-view"></router-view>
    </transition>
    
    
  </div>
</template>

<script>
import Nav from './components/Nav'

export default {
  name: 'app',
  components: {
    Nav
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.fade-enter{
  opacity: 0;
}
.fade-leave{
  opacity: 1;
}
.fade-leave-active{
  opacity: 0;
  transition: opacity 0.4s;
}
.fade-enter-active{
  transition: opacity 0.4s;
}
.router-view{
  height: calc(100vh - 49px);
}
</style>
