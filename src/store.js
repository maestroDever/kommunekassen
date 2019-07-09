import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pageInfo: [],
    curPage: 0,
    colors: [
      '#130656', '#584EA1', '#3F8DCC', '#00BED2', '#48B85E', '#82C55D', '#FFCB05', '#FEBE2A', '#F8962A', '#F04E45', '#413B3D', '#413B3D', '#413B3D'
    ]
  },
  mutations: {
    SET_DATA (state, data) {
      state.pageInfo = data
    }
  },
  actions: {
    setData (context, data) {
      context.commit('SET_DATA', data)
    }
  },
  getters: {
    pageInfo: state => state.pageInfo[state.curPage]
  }
})
