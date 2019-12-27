import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

import firebaseConfig from '../../config/firebase'

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.use(firebase)

const db = firebase.firestore()

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
      lists: [],
      tasks: [],
      test: 'this is a test'
    },
    getters: {
        lists: state => state.lists,
        tasks: state => state.tasks,
        test: state => state.test
    },
    mutations: {
      loadList(state, payload) {
          state.lists = []
          state.lists = payload
      }
    },
    actions: {
      LOAD_LISTS(context) {

        db.collection("lists")
        .onSnapshot(function(querySnapshot) {
          const payload = []
            querySnapshot.forEach(function(doc) {
              payload.push(doc.data())
                // cities.push(doc.data().name);
            });
            context.commit('loadList', payload)

            // console.log("Current cities in CA: ", cities.join(", "));
        });

        // .onSnapshot(function (doc){
        //   const payload = doc.data()
        //   context.commit('loadList', payload)
        // })

        //   .onSnapshot(function(doc) {
        //     const payload = doc.data()
        //     context.commit('loadList', payload)

        //     // window.console.log("Current data: ", doc.data());
        // });


      }
    }
});

