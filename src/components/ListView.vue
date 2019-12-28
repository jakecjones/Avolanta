<template>
    <section class="list-view">
      <div class="container">
        <template v-if="lists.length < 0">
          Create your first list
          <input class="home-input" type="text" placeholder="list name" v-model="listTitle">
          <button @click="addList(listTitle)" class="list-view__add">add list</button>
        </template>
        <template v-else>
          <div class="list-view__lists">
            <template v-for="(display, idx) in lists">
              <div :key="idx" class="list-view__list-item">
                <div class="list-view__list-item-container">{{display.title[0]}}</div>
                <div class="list-view__list-title">{{display.title}}</div>
              </div>

            </template>
          </div>
          <input class="home-input" type="text" placeholder="list name" v-model="listTitle">
          <button @click="addList(listTitle)" class="list-view__add">add list</button>
        </template>
      </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'


export default {
  name: 'list-view',
  data () {
    return {
      listTitle: null
    }
  },
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

    addList(listTitle){

      const payload = {
        title: listTitle
      }

      this.$store.dispatch('ADD_LIST', payload)
    }

  },
  created() {
  }
}
</script>

<style lang="scss">

.list-view {
  width: 100%;

&__add {
  width: 150px;
  background-color: #373542;
  color: #fff;
  padding: 2vw;
  border-radius: 50px;
  font-size: 4vw;
}

&__lists {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
}

&__list-item-container {
  width: 100%;
  height: 39vw;
  overflow: hidden;
  background-color: #e6ffee;
  margin: 2vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.09) 2px 2px 5px 0px;
  font-size: 16vw;
  color: #9dc1aa;
  text-transform: uppercase;
  font-weight: bolder;

}

&__list-item {
  width: 39vw;
  height: auto;
  overflow: hidden;
  margin: 2vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
}

// &__list-title {
//   font-size: 30vw;
// }
    input {
        // background-color: red;
    }
}
</style>
