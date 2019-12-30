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
      activeList: {},
      activeTask: {}
    },
    getters: {
        lists: state => state.lists,
        tasks: state => state.tasks,
        activeList: state => state.activeList,
        activeTask: state => state.activeTask
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
    },
      activeTask(state, payload) {
        state.activeTask = {}
        state.activeTask = payload
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
      LOAD_TASKS(context, payload) {
        db.collection("tasks").where("lid", "==", payload).orderBy('createdAt')
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
      FETCH_TASK(context, payload) {
        db.collection("tasks").doc(payload).get()
        .then((docRef) => {
          context.commit('activeTask', docRef.data())
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
      ADD_TASK(context, payload) {
        context;
        const createdAt = new Date()
        db.collection("tasks").add({
          createdAt: createdAt,
          title: null,
          description: null,
          lid: payload,
          status: 'open'
        })
        .then((docRef) => {
          db.collection('tasks').doc(docRef.id).update({
            id: docRef.id
          })
        })
      },
      UPDATE_TASK(context, payload) {
        // const createdAt = new Date()
        payload.status == 'open'
        ? db.collection("tasks").doc(payload.id).update({
          status: 'complete'
        })
        : db.collection("tasks").doc(payload.id).update({
          status: 'open'
        })

      },
      SAVE_LIST(context, payload) {
        // const createdAt = new Date()
        db.collection("lists").doc(payload.id).set(payload, {merge: true})
      },
      SAVE_TASK(context, payload) {
        // const createdAt = new Date()
        db.collection("tasks").doc(payload.id).set(payload, {merge: true})
      },
    }
});

