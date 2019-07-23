import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pageNames: [],
    pageInfo: [],
    answers: [],
    stackAnswers: [],
    results: [],
    blankPage: {
      title: 'waiting',
      description: 'loading...'
    },
    isNew: { flag: true, id: 0 },
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
    },
    SAVE_RESULT (state, result) {
      if (state.isNew.flag) {
        state.stackAnswers.push([...state.answers])
        state.results.push({ ...result, id: state.results.length })
      } else {
        state.stackAnswers.splice(state.isNew.id, 0, [...state.answers])
        state.results.splice(state.isNew.id, 0, { ...result, id: state.isNew.id })
      }
      localStorage.setItem('results', JSON.stringify(state.results))
    },
    selectAnswer (state, data) {
      state.isNew = data
      if (!data.flag) {
        state.answers = state.stackAnswers[data.id]
        state.results.splice(data.id, 1)
        state.stackAnswers.splice(data.id, 1)
      }
    },
    clearAnswers (state) {
      state.isNew = { flag: true }
      state.answers.splice(1, state.answers.length - 1)
    },
    resetAnswers (state) {
      state.isNew = { flag: true }
      state.answers = []
      state.stackAnswers = []
      state.results = []
      localStorage.removeItem('answers')
      localStorage.removeItem('results')
    }
  },
  actions: {
    setData (context, data) {
      context.commit('SET_DATA', data)
    },
    toNext (context) {
      const curPage = context.state.curPage
      const curAnswer = context.state.answers[curPage]
      if (curAnswer === '' || curAnswer === undefined || curAnswer === null) {
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
      if (ans === '') return
      const pagename = context.state.pageNames[context.state.curPage]
      const answer = new Map([[pagename, ans * 1]])
      context.commit('SET_ANSWER', Object.fromEntries(answer))
    },
    gotoResult (context, val) {
      if (val) {
      const submitData = context.state.answers.reduce((acc, cur) => ({ ...acc, ...cur }), {})
      Axios.post('https://api.businesslogic.online/execute',
        submitData,
        {
          headers: {
            'X-Auth-Token': 'e11e754ffc8c4bad8539bac2ea48b294',
            'Content-Type': 'application/json'
          }
        }).then(response => {
        context.commit('SAVE_RESULT', response.data)
        context.commit('TO_NEXT')
      })
      } else {
        context.commit('GOTO', context.state.pageNames.length - 1)
      }
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
        const currentPage = state.pageInfo.length && state.pageInfo[state.curPage]
        if (currentPage.type === 'number') return 0
        else if (currentPage.type === 'integer') return currentPage.default || ''
      }
    },
    pageType: state => {
      const diff = state.pageNames.length - state.curPage
      if (diff === state.pageNames.length) {
        return 'first'
      } else if (diff === 1) {
        return 'result'
      } else if (diff === 2) {
        return 'last'
      } else {
        return 'normal'
      }
    },
    resultsInOrder: state => {
      return [ ...state.results ].sort((a, b) => {
        return (a.total < b.total) ? 1 : -1
      })
    }
  }
})
