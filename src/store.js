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
      { left: 'Tilbage', right: 'Beregn', class: 'transparent' },
      { left: 'Start forfra', right: '', class: 'transparent' }
    ]
  },
  mutations: {
    SET_DATA (state, data) {
      state.pageInfo = Object.values(data)
      state.pageNames = Object.keys(data)
      if (localStorage.getItem('answers')) state.answers = JSON.parse(localStorage.getItem('answers'))
      const resultPage = {
        title: 'Stemmeprocent',
        description: 'Byråd med højeste stemmeprocent vinder',
        pagename: 'Stemmeprocent',
        type: 'result'
      }
      state.pageInfo.push(resultPage)
      state.pageNames.push('city_council')
    },
    SET_ANSWER (state, answer) {
      Vue.set(state.answers, state.curPage, answer)
      localStorage.setItem('answers', JSON.stringify(state.answers))
    },
    TO_NEXT (state) {
      state.curPage < state.pageNames.length - 1 && state.curPage++
    },
    TO_PREV (state) {
      state.curPage > 0 && state.curPage--
    },
    GOTO (state, pageNum) {
      state.curPage = pageNum
    }
  },
  actions: {
    setData (context, data) {
      context.commit('SET_DATA', data)
    },
    toNext (context) {
      const curPage = context.state.curPage
      const curAnswer = context.state.answers[curPage]
      if (!curAnswer) {
        alert('Nah')
        return
      }
      context.commit('TO_NEXT')
    },
    toPrev (context) {
      context.commit('TO_PREV')
    },
    gotoPage (context, pageNum) {
      context.commit('GOTO', pageNum)
    },
    setAnswer (context, ans) {
      const pagename = context.state.pageNames[context.state.curPage]
      const answer = new Map([[pagename, ans]])
      context.commit('SET_ANSWER', Object.fromEntries(answer))
    }
  },
  getters: {
    curPageInfo: state => {
      const page = state.pageInfo[state.curPage]
      return {
        ...page,
        button: state.buttons[state.curPage],
        color: state.colors[state.curPage],
        pagename: state.pageNames[state.curPage],
        icon: state.pageNames[state.curPage]
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
    },
    curAnswer: state => {
      if (state.answers.length > state.curPage) {
        return Object.values(state.answers[state.curPage])[0]
      } else {
        return ''
      }
    },
    isLastPage: state => state.curPage === state.pageNames.length - 1
  }
})
