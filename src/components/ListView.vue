<template>
    <section class="list-view">
      <div class="container">
        <template v-if="lists.length == 0">
          Create your first list
          <input class="home-input" type="text" placeholder="list name" v-model="listTitle">
          <button @click="addList(listTitle)" class="list-view__add">add list</button>
        </template>
        <template v-else>
          <div class="controls">
            <div class="controls__title">My Lists</div>
            <div @click="createList()" class="controls__action">
              <img src="../../static/plus.svg" alt="">
            </div>
          </div>
          <div class="list-view__lists">
            <template v-for="(display, idx) in lists">
              <template v-if="display.title != null">
                <div :key="idx" class="list-view__list-item" @click="$router.push('/list/' + display.id)">
                  <div class="list-view__list-item-container">{{display.title[0]}}</div>
                  <div class="list-view__list-title">{{display.title}}</div>
                </div>
              </template>
              <template v-else>
                <div :key="idx" class="list-view__list-item" @click="$router.push('/list/' + display.id)">
                  <div class="list-view__list-item-container">U</div>
                  <div class="list-view__list-title">Untitled</div>
                </div>
              </template>
            </template>
          </div>
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

    createList() {
      this.$store.dispatch('ADD_LIST')
    },
    addList(listTitle){

      const payload = {
        title: listTitle
      }

      this.$store.dispatch('FIRST_LIST', payload)
    }

  },
  created() {
  }
}
</script>

<style lang="scss">

$break-small: 600px;

.list-view {
  width: 100%;

&__add {
  width: 150px;
  background-color: #373542;
  color: #fff;
  padding: 5px 20px;
  border-radius: 50px;
  font-size: 14px;
  @media screen and (max-width: $break-small) {
    padding: 2vw;
    border-radius: 50px;
    font-size: 4vw;
  }

}

&__lists {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  align-items: baseline;
}

&__list-item-container {
  width: 120px;
  height: 120px;
  overflow: hidden;
  background-color: #e6ffee;
  margin: 2vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.09) 2px 2px 5px 0px;
  font-size: 24px;
  color: #9dc1aa;
  text-transform: uppercase;
  font-weight: bolder;
  transition: 1.5s all cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover {
    background-color: #d6f0de;
  }
  @media screen and (max-width: $break-small) {
    width: 36vw;
    height: 36vw;
    font-size: 16vw;
    &:hover {
      background-color: #e6ffee;
    }
  }
}

&__list-item {
  cursor: pointer;
  width: 140px;
  height: auto;
  overflow: hidden;
  margin: 2vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: $break-small) {
    width: 39vw;
  }
}

&__list-title {
  font-size: 11px;
  font-family: 'ProximaNova-Thin', 'Avenir', sans-serif;

}
// }
    input {
        // background-color: red;
    }
}
</style>
