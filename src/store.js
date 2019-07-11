import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pageNames: [],
    pageInfo: [],
    blankPage: {
      title: 'waiting',
      description: 'loading...'
    },
    curPage: 0,
    colors: [
      '#413B3D', '#130656', '#584EA1', '#3F8DCC', '#00BED2', '#48B85E', '#82C55D', '#FFCB05', '#FEBE2A', '#F8962A', '#F04E45', '#413B3D', '#413B3D', '#413B3D'
    ],
    buttons: [
      { left: null, right: 'Start' },
      { left: 'Tilbage', right: 'Næste' },
      { left: 'Tilbage', right: 'Næste' },
      { left: 'Tilbage', right: 'Næste' },
      { left: 'Tilbage', right: 'Næste' },
      { left: 'Tilbage', right: 'Næste' },
      { left: 'Tilbage', right: 'Næste' },
      { left: 'Tilbage', right: 'Næste' },
      { left: 'Tilbage', right: 'Næste' },
      { left: 'Tilbage', right: 'Næste' },
      { left: 'Tilbage', right: 'Næste' },
      { left: 'Tilbage', right: 'Næste' },
      { left: 'Tilbage', right: 'Næste' },
      { left: 'Tilbage', right: 'Næste' }
    ],
    icons: [
      'icon_scenarios',
      'icon_city_council',
      'icon_scenarios',
      'icon_budget_daycare',
      'icon_budget_culture_and_freetime',
      'icon_budget_traffic_and_ways',
      'icon_budget_nature_and_climate',
      'icon_budget_health',
      'icon_budget_cash_and_unemployment_benefits',
      'icon_budget_town_hall_and_administration',
      'icon_budget_elderly_and_disabled',
      'icon_budget_business_and_entrepreneurship',
      'icon_projects_concert_venue',
      'icon_projects_dining_houses_in_schools',
      'icon_city_council'
    ]
  },
  mutations: {
    SET_DATA (state, data) {
      state.pageInfo = Object.values(data)
      state.pageNames = Object.keys(data)
    }
  },
  actions: {
    setData (context, data) {
      context.commit('SET_DATA', data)
    }
  },
  getters: {
    pageInfo: state => state.pageInfo[state.curPage] || state.blankPage
  }
})
