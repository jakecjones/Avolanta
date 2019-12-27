import Vue from 'vue'
import App from './App.vue'

import Vuex from 'vuex'
import { store } from './store'
import router from './router'

Vue.use(Vuex)

// static data
// db.collection("lists").get().then((querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//       window.console.log(`${doc.id} => ${doc.data().test}`);
//   });
// });

// realtime data
// db.collection("lists").doc("test")
//   .onSnapshot(function(doc) {
//     window.console.log("Current data: ", doc.data());
// });

Vue.config.productionTip = true

// new Vue({
//   el: '#app',
//   router,
//   store,
//   components: { App },
//   template: '<App/>'
// })

new Vue({
  render: h => h(App),
  store,
  router,
  components: { App },
}).$mount('#app')

// new Vue({
//   el: '#app',
//   router,
//   store,
//   components: { App },
//   template: '<App/>'
// })
