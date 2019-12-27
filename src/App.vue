<template>
  <div id="app">
    <router-view />

    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import firebase from './main'

export default {
  name: 'app',
  components: {
    // HelloWorld
  },
  methods: {
    getLists(){
      this.$store.dispatch('LOAD_LISTS')
    }
  },
  created() {
    this.getLists()
  }
}
</script>

<style lang="scss">
$borderRadius: 10px;

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}

.container {
  display: flex;
  width: 90%;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
}

input {
  border: none;
  outline: none;
  padding: 2vw;
}
.home-input {
  width: 50%;
  background-color: #e6ffee;
  border-radius: $borderRadius;
  border-top-left-radius: 0;
  text-align: center;
  font-size: 2vw;
}
</style>
