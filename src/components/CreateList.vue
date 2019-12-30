<template>
    <section class="list-view">
      <div class="container">
          <div class="controls">
            <div @click="$router.go(-1)" class="controls__action">
              <img src="../../static/back-arrow.svg" alt="">
            </div>
          </div>
          <div class="controls">
            <input class="controls__title" v-model="listTitle" @keydown="saveList()" placeholder="List Title">
            <div class="controls__action">
              <img src="../../static/plus.svg" alt="">
            </div>
          </div>
          <div class="controls">
            <textarea @keydown="saveList()" cols="30" rows="2" placeholder="Description" v-model="listDescription"></textarea>
          </div>
          <div class="controls">
            <div class="controls__sub-title">Tasks</div>
          </div>
          <div class="controls">
            <div class="tasks">
              <div v-for="(display, idx) in tasks" :key="idx" class="controls__task-list">
                <div v-if="tasks.length != idx + 1" class="controls__task-border"></div>
                <div class="controls__task-checked"></div>
                <input class="task-input" type="text" v-model="display.title">
              </div>
            </div>
          </div>
      </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'


export default {
  name: 'list-view',
  data () {
    return {
      listTitle: null,
      listDescription: null
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

    saveList(){

      const payload = {
        title: this.listTitle,
        description: this.listDescription
      }

      // const payload = {
      //   title: listTitle
      // }
      setTimeout(this.autosave(payload), 1000)

      // this.$store.dispatch('ADD_LIST', payload)
    },
    autosave(payload){
      this.$store.dispatch('SAVE_LIST', payload)
    }
    // saveList(){
    //   this.$store.dispatch('SAVE_LIST', payload)
    // }

  },
  created() {
    let path = this.$route.path.split('/create-list/')[1]
    path != 'null'
    ? this.listTitle = path
    : this.listTitle = 'Untitled'

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

textarea {
}

// &__list-title {
//   font-size: 30vw;
// }
    input {
        // background-color: red;
    }
}
</style>
