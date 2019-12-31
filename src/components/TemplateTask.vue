<template>
    <section class="list-view">
      <div class="container">
          <div class="controls">
            <div @click="$router.go(-1)" class="controls__action">
              <img src="../../static/back-arrow.svg">
            </div>
          </div>
          <div class="controls">
            <input class="controls__title" v-model="activeTask.title" @keyup="saveTask()" placeholder="Task name">

            <div v-if="activeTask.status == 'open'" @click="updateTask(activeTask); activeTask.status = 'completed'" class="controls__action">
                <div class="controls__task-checked">
                  <img src="../../static/checkmark-color.svg">
                </div>
            </div>

            <div @click="updateTask(activeTask); activeTask.status = 'open'" v-else class="controls__action">
              <div class="controls__task-checked-active">
                <img src="../../static/checkmark.svg">
              </div>
            </div>

          </div>

          <div v-if="activeTask.status == 'complete'" class="controls">
            <span class="completed">completed</span>
          </div>
          
          <section class="options">
            <span>Priority</span>
            <div @click="toolsActive = !toolsActive">
              <img class="options__icon" v-if="activeTask.priority == null" src="../../static/priority.svg">
              <div v-else-if="activeTask.priority == 'low'" class="tool tools-low spacer">Low</div>
              <div v-else-if="activeTask.priority == 'medium'" class="tool tools-medium spacer">Medium</div>
              <div v-else-if="activeTask.priority == 'high'" class="tool tools-high spacer">High</div>

              <div class="tools" :class="{'tools-active' : toolsActive}">
                <div @click="changePriority('low')" class="tool tools-low">Low</div>
                <div @click="changePriority('medium')" class="tool tools-medium">Medium</div>
                <div @click="changePriority('high')" class="tool tools-high">High</div>
              </div>
            </div> 
            <!-- <div @click="getDatePicker()"> -->
              <span @click="getDatePicker()">Due Date</span>   
              <div v-if="activeTask.dueDate == null" @click="getDatePicker()" class="options__icon">
                <img src="../../static/date.svg">
              </div> 
              <span v-else class="spacer due-date">{{activeTask.dueDate.split(' ')[0].substring(0, 3)}} {{activeTask.dueDate.split(' ')[1]}}</span>
            <!-- </div>  -->
          </section>

          <div class="controls">
            <textarea @keyup="saveTask()" cols="30" rows="2" placeholder="Description" v-model="activeTask.description"></textarea>
          </div>
      </div>
      <section class="options">
        <div @click="deleteTask()" class="options__action">
          <img src="../../static/trash.svg">
        </div>      
      </section>
      <section class="datepicker" :class="{'datepicker-active' : datePicker}">

        <div class="datepicker-absolute">
          <div class="datepicker__title">{{months[new Date().getMonth()]}}</div>
          <!-- {{new Date().getDaysInMonth()}} -->
          <div class="datepicker__calender">
            <div v-for="(display, idx) in week" class="datepicker__week" :key="idx">{{display}}</div>
          </div>
          <div class="datepicker__calender">

            <div @click="chooseDate(display, idx)" v-for="(display, idx) in days" class="datepicker__day" :key="idx">
              <span v-if="activeDay == idx" class="active-day">{{idx + 1}}</span>
              <span v-else >{{idx + 1}}</span>
            </div>
          </div>
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
      toolsActive: false,
      activeDay: null,
      days: 31,
      week: {
      0: "SUN",
      1: "MON",
      2: "TUE",
      3: "WED",
      4: "THR",
      5: "FRI",
      6: "SAT"
      },
      months: {
      0: "January",
      1: "February",
      2: "March",
      3: "April",
      4: "May",
      5: "June",
      6: "July",
      7: "August",
      8: "September",
      9: "October",
      10: "November",
      11: "December"
      }
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
      'activeTask',
      'datePicker',
    ])
  },
  methods: {

    saveList(){
      setTimeout(this.autosaveList, 3000)
    },
    saveTask(){
      setTimeout(this.autosaveTask, 3000)
    },
    autosaveList(){
      this.$store.dispatch('SAVE_LIST', this.activeList)
    },
    autosaveTask(){
      this.$store.dispatch('SAVE_TASK', this.activeTask)
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
    deleteTask(){
      this.$store.dispatch('DELETE_TASK', this.activeTask)
    },
    getDatePicker(){
      this.$store.commit('datePicker')
    },
    chooseDate(display, idx){
      this.activeDay = idx
      let month = this.months[new Date().getMonth()]
      let day = idx + 1

      const payload = {
        day: day,
        month: month,
        id: this.$route.path.split('/task/')[1],
        changeClient: this.activeTask.dueDate = `${month} ${day}`
      }
      this.$store.dispatch('CHOOSE_DATE', payload)
    },
    changePriority(key) {
      const payload = {
        key: key,
        id: this.$route.path.split('/task/')[1]
      }
      return {
        key: this.activeTask.priority = key,
        updateDatabase: this.$store.dispatch('CHANGE_PRIORITY', payload)
      }
      
    }
  },
  created() {
    let path = this.$route.path.split('/task/')[1]
    this.$store.dispatch('FETCH_TASK', path)
  }
}
</script>

<style lang="scss" scoped>

$break-small: 600px;


.active-day {
  background-color: #fff;
  color: #3ec196;
  width: 100%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}
.due-date {
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-family: 'ProximaNova-Thin', 'Avenir', sans-serif;
  position: relative;
  margin-top: 2px;
  margin-left: 10px;
  background-color: #e6ffee;
  color: #3ec196;
  padding: 3px 5px;
  border-radius: 50px;
}
.datepicker {
  position: fixed;
  bottom: 0;
  height: 0;
  overflow: hidden;
  width: 101%;
  background-color: #3ec196;
  left: 0;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;

  flex-direction: column;
  transition: all .5s cubic-bezier(0.86, 0, 0.07, 1);

  .datepicker-absolute {
    position: absolute;
    top: 20px;
  }

  &__calender {
    width: 90%;
    height: auto;
    margin: 0 auto;
    display: flex;
    flex-flow: wrap;
    color: #fff;
  }
  &__day {
    width: 12.8vw;
    height: 12.8vw;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'ProximaNova-Thin', 'Avenir', sans-serif;
  }

  &__week {
    width: 12.8vw;
    height: 12.8vw;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'ProximaNova-Bold', 'Avenir', sans-serif;
    font-weight: bolder;
    font-size: 10px;
    color: #b5e3c8;
  }
  &__title {
    width: 85%;
    display: flex;
    align-items: center;
    justify-content: left;
    font-size: 18px;
    padding: 4vw 0 2vw 0;
    font-weight: bolder;
    font-family: 'ProximaNova-Bold', 'Avenir', sans-serif;
    color: #fff;
    margin: 0 auto;


  }
}

.datepicker-active {
  height: 70%;
}

.list-view {
  width: 100%;

.controls {
  &__task-checked {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0 !important;
    background-color: #fff;
    border: .09rem dashed #b5e3c8;
  } 
  &__task-checked-active {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0 !important;
    background-color: #fff;
    background-color: #b5e3c8;
    border: .09rem solid #b5e3c8;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 80%;
      height: 80%;
    }
  } 
}



&__lists {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
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
