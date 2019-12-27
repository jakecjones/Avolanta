<template>
    <section class="list-view">
        <template v-if="lists.length > 0">
            Create your first list
            <input type="text" placeholder="list name">
            <button>add list</button>
            {{lists.length}}
        </template>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'


export default {
  name: 'list-view',
  components: {
    // HelloWorld
  },
  computed: {
    ...mapGetters([
      'lists',
      'tasks',
      'test'
    ])
  },
  methods: {

  },
  created() {
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.list-view {
    input {
        background-color: red;
    }
}
</style>
