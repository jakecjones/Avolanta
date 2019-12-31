<template>
    <section class="list-view">
      <div class="container">
          <div class="controls">
            <div @click="$router.go(-1)" class="controls__action">
              <img src="../../static/back-arrow.svg" alt="">
            </div>
          </div>
          <div class="controls">
            <input class="controls__title" v-model="activeList.title" @keyup="saveList()" placeholder="List name">
            <div @click="createTask()" class="controls__action">
              <img src="../../static/plus.svg" alt="">
            </div>
          </div>
          <div class="controls">
            <textarea @keyup="saveList()" cols="30" rows="2" placeholder="Description" v-model="activeList.description"></textarea>
          </div>
          <div class="controls">
            <div class="controls__sub-title">Tasks</div>
          </div>
          <div class="controls">
            <div class="tasks">
                <template v-if="tasks.length == 0">
                  <span @click="createTask()" class="trigger">add new task <img src="../../static/plus.svg"></span>
                  
                </template>
              <div v-for="(display, idx) in tasks" :key="idx" class="controls__task-list">
                  <div v-if="tasks.length != idx + 1" class="controls__task-border"></div>
                  <div @click="updateTask(display)" v-if="display.status == 'open'" class="controls__task-checked">
                    <img src="../../static/checkmark-color.svg">
                  </div>

                  <div @click="updateTask(display)" v-else class="controls__task-checked-active">
                    <img src="../../static/checkmark.svg">
                  </div>

                  <input @keyup="saveTask(display)" @keydown.enter="createTask(idx)" class="task-input" type="text" v-model="display.title" :ref="idx" placeholder="task name">

                  <div v-if="display.priority == 'low'" class="priority tools-low">Low</div>
                  <div v-else-if="display.priority == 'medium'" class="priority tools-medium">Medium</div>
                  <div v-else-if="display.priority == 'high'" class="priority tools-high">High</div>

                  <div class="controls__more" @click="$router.push('/task/' + display.id)">
                    <img src="../../static/more.svg">
                  </div>
              </div>
            </div>
          </div>
      </div>
      <section class="options">
        <div @click="deleteList()" class="options__action">
            <img src="../../static/trash.svg">
        </div>      
      </section>
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
      'test',
      'activeList',
    ])
  },
  methods: {

    saveList(){
      setTimeout(this.autosaveList, 3000)
    },
    saveTask(payload){
      setTimeout(this.autosaveTask(payload), 3000)
    },
    autosaveList(){
      this.$store.dispatch('SAVE_LIST', this.activeList)
    },
    autosaveTask(payload){
      this.$store.dispatch('SAVE_TASK', payload)
    },
    updateTask(payload, key){
      this.$store.dispatch('UPDATE_TASK', payload, key)
    },
    createTask(){
      this.$store.dispatch('ADD_TASK', this.activeList.id)
    },
    changeStatus(){
      this.$store.dispatch('ADD_TASK', this.activeList.id)
    },
    deleteList(){
    var q = prompt("This will delete all substasks as well. Do you still wish to delete?", "yes");

      if (q == 'yes') {
        this.$store.dispatch('DELETE_LIST', this.activeList)
      }
    },
  },
  created() {
    let path = this.$route.path.split('/list/')[1]
    this.$store.dispatch('FETCH_LIST', path)
    this.listTitle = path
    this.$store.dispatch('LOAD_TASKS', path)
  }
}
</script>

<style lang="scss" scoped>
$break-small: 600px;

.priority {
  position: absolute;
  top: 2px;
  left: 100%;
  margin-left: 10px;

    text-transform: uppercase;
    font-size: 10px;
    border-radius: 50px;
    font-family: 'ProximaNova-Bold', 'Avenir', sans-serif;
    padding: 5px 10px;
}

  .tool {
    position: absolute;
    margin: 0;
    font-size: 10px;
    padding: 3px 5px;
    @media screen and (max-width: $break-small) {
      font-size: 5px;
    }
  }

.list-view {
  width: 100%;


&__lists {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
}




    input {
        // background-color: red;
    }
}
</style>
