<template>
    <section class="list-view">
      <div class="container">
          <template v-if="lists.length > 0">
              Create your first list
              <input class="home-input" type="text" placeholder="list name">
              <button>add list</button>
              {{lists.length}}
          </template>
        </div>
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

.list-view {
  width: 100%;



    input {
        // background-color: red;
    }
}
</style>
