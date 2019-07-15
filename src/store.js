import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pageNames: [],
    pageInfo: [],
    answers: [],
    blankPage: {
      title: 'waiting',
      description: 'loading...'
    },
    curPage: 0,
    colors: [
      '#413B3D', '#130656', '#584EA1', '#3F8DCC', '#00BED2', '#48B85E', '#82C55D', '#FFCB05', '#FEBE2A', '#F8962A', '#F04E45', '#413B3D', '#413B3D', '#413B3D'
    ],
    buttons: [
      { left: null, right: 'Start', class: 'active' },
      { left: 'Tilbage', right: 'Næste', class: 'transparent' },
      { left: 'Tilbage', right: 'Næste', class: 'transparent' },
      { left: 'Tilbage', right: 'Næste', class: 'transparent' },
      { left: 'Tilbage', right: 'Næste', class: 'transparent' },
      { left: 'Tilbage', right: 'Næste', class: 'transparent' },
      { left: 'Tilbage', right: 'Næste', class: 'transparent' },
      { left: 'Tilbage', right: 'Næste', class: 'transparent' },
      { left: 'Tilbage', right: 'Næste', class: 'transparent' },
      { left: 'Tilbage', right: 'Næste', class: 'transparent' },
      { left: 'Tilbage', right: 'Næste', class: 'transparent' },
      { left: 'Tilbage', right: 'Næste', class: 'transparent' },
      { left: 'Tilbage', right: 'Beregn', class: 'transparent' }
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
    },
    toNext (context) {
      context.state.curPage < context.state.pageNames.length - 1 && context.state.curPage++
    },
    toPrev (context) {
      context.state.curPage > 0 && context.state.curPage--
    },
    gotoPage (context, pageNum) {
      context.state.curPage = pageNum
    },
    setAnswer (context, ans) {
      console.log('ans')
    }
  },
  getters: {
    curPageInfo: state => {
      const page = state.pageInfo[state.curPage]
      return {
        ...page,
        button: state.buttons[state.curPage],
        color: state.colors[state.curPage],
        pagename: state.pageNames[state.curPage]
      } || state.blankPage
    },
    actionType: state => {
      if (state.pageInfo.length) {
        return state.pageInfo[state.curPage].type || null
      }
    },
    actions: state => {
      if (state.pageInfo.length) {
        return state.pageInfo[state.curPage].oneOf || null
      }
    }
  }
})
