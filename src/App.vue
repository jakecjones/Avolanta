<template>
  <div id="app">
    <div class="container">
      <img class="logo" src="../static/avolanta-logo.svg">
    </div>
    <router-view />

  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
    
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
$darkColor: #373542;

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;

  .logo {
    width: 80%;
    margin: 20px auto 40px auto;
  }


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
  padding: 4vw 2vw;
}
.home-input {
  width: 80%;
  background-color: #e6ffee;
  border-radius: $borderRadius;
  border-top-left-radius: 0;
  text-align: center;
  font-size: 5vw;
  margin: 30px auto;
}
</style>
