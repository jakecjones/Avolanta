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
      activeList: {}
    },
    getters: {
        lists: state => state.lists,
        tasks: state => state.tasks,
        activeList: state => state.activeList
    },
    mutations: {
      loadList(state, payload) {
          state.lists = []
          state.lists = payload
      },
      loadTask(state, payload) {
        state.tasks = []
        state.tasks = payload
    },
      activeList(state, payload) {
        state.activeList = {}
        state.activeList = payload
    }
    },
    actions: {
      LOAD_LISTS(context) {

        db.collection("lists")
        .onSnapshot(function(querySnapshot) {
          const payload = []
            querySnapshot.forEach(function(doc) {
              payload.push(doc.data())
            });
            context.commit('loadList', payload)
        });
      },
      LOAD_TASKS(context) {
        db.collection("tasks")
        .onSnapshot(function(querySnapshot) {
          const payload = []
            querySnapshot.forEach(function(doc) {
              payload.push(doc.data())
            });
            context.commit('loadTask', payload)
        });
      },
      FIRST_LIST(context, payload) {
        const createdAt = new Date()
        db.collection("lists").add({
          createdAt: createdAt,
          title: payload.title,
          description: null
        })
        .then((docRef) => {
          db.collection('lists').doc(docRef.id).update({
            id: docRef.id
          })
        })
      },
      FETCH_LIST(context, payload) {
        db.collection("lists").doc(payload).get()
        .then((docRef) => {
          context.commit('activeList', docRef.data())
        })

      },
      ADD_LIST(context) {
        context;
        const createdAt = new Date()
        db.collection("lists").add({
          createdAt: createdAt,
          title: null,
          description: null
        })
        .then((docRef) => {
          db.collection('lists').doc(docRef.id).update({
            id: docRef.id
          })
        })
      },
      SAVE_LIST(context, payload) {
        // const createdAt = new Date()
        db.collection("lists").doc(payload.id).set(payload, {merge: true})

      },
    }
});

