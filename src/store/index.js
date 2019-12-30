import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import router from '../router'


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
      activeTask: {},
      siteNotification: {
        active: false,
        message: null
      }
    },
    getters: {
        lists: state => state.lists,
        tasks: state => state.tasks,
        activeList: state => state.activeList,
        activeTask: state => state.activeTask,
        siteNotification: state => state.siteNotification
    },
    mutations: {
      siteNotification(state, payload){
          const message = payload + ' deleted'

          payload != null
          ? setTimeout(() => ({active: state.siteNotification.active = true , message: state.siteNotification.message = message}), 750)
          : setTimeout(() => ({active: state.siteNotification.active = true , message: state.siteNotification.message = 'Untitled Deleted'}), 750)
      },
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
          return {
            updateID: db.collection('lists').doc(docRef.id).update({
              id: docRef.id
            }),
            changeRoute: router.push('/list/' + docRef.id)
          }

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

      DELETE_LIST(context, payload) {
        // const createdAt = new Date()
        const messagePayload = payload.title
        return {
          delete: db.collection("lists").doc(payload.id).delete()
          .then(()=> {
            db.collection("tasks").where("lid", "==", payload.id)
            .onSnapshot(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                  doc.ref.delete()
                });
            });
          }),
          route: router.push('/'),
          notification: context.commit('siteNotification', messagePayload)
        }
      },
      DELETE_TASK(context, payload) {
        // const createdAt = new Date()
        const messagePayload = payload.title + ' deleted'
        return {
          delete: db.collection("tasks").doc(payload.id).delete(),
          route: router.push('/list/' + payload.lid),
          notification: context.commit('siteNotification', messagePayload)
        }
      },

    }
});



