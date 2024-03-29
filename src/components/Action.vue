<template>
  <div class="action">
    <div v-if="actionType === 'integer'" class="buttons-wrapper">
      <button
        class="button"
        v-for="action in actions"
        :key="curPage + '_' + action.const"
        @click="handleAnswer(action.const)"
        ref="actionElement"
        :class="action.const === curAnswer ? 'active' : ''"
      >
        {{ action.title }}
      </button>
    </div>
    <div v-else-if="actionType === 'number'" class="input-wrapper">
      <input type="number" class="answer-input" v-model="answer" ref="inputField" @keyup.enter="enterHandle" @keydown.esc="escHandle">
      <span style="display: block; margin: 1em; font-size: 1.4em;">mio. kr.</span>
    </div>
    <div v-else class="result-wrapper">
      <div
        class="result-card"
        v-for="(result, index) in resultsInOrder"
        :key="index"
      >
        <div class="result-card--title">Byråd {{result.id + 1}}</div>
        <div class="result-card--score">{{result.total | floatFilter}}</div>
        <div class="result-card--percent">%</div>
        <div class="result-card--edit" @click="editAnswers(result.id)">Redigér</div>
      </div>
      <div class="result-card" style="height: 10em;" @click="createNew" v-if="results.length < 6">
        Opret nyt byråd
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
export default {
  name: 'Action',
  props: {
    token: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters(['actionType', 'actions', 'curAnswer', 'resultsInOrder']),
    ...mapState(['curPage', 'results']),
    answer: {
      get () {
        return this.curAnswer || ''
      },
      set (newVal) {
        this.setAnswer(newVal)
      }
    }
  },
  updated () {
    if (this.$refs.inputField) this.$refs.inputField.focus()
  },
  methods: {
    ...mapActions(['setAnswer', 'gotoPage', 'gotoResult']),
    ...mapMutations(['selectAnswer', 'createNewCouncil']),
    handleAnswer (ans) {
      if (this.actionType === 'integer' && ans >= 0) {
        this.$refs.actionElement.forEach((node, index) => {
          if (index === ans - 1) {
            node.classList.add('active')
          } else {
            node.classList.remove('active')
          }
        })
        this.setAnswer(ans)
      }
    },
    editAnswers (id) {
      this.selectAnswer({ flag: false, id: id })
      this.gotoPage(1)
    },
    enterHandle (e) {
      this.$emit('enterPressed')
    },
    escHandle (e) {
      e.preventDefault()
      this.gotoResult({ flag: true, token: this.token })
    },
    createNew () {
      this.createNewCouncil()
      this.gotoPage(1)
    }
  },
  filters: {
    floatFilter (val) {
      return parseFloat(val).toFixed(1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .action {
    display: flex;
    flex-wrap: wrap;
    margin-top: 2em;

    .input-wrapper, .result-wrapper, .buttons-wrapper {
      width: 100%;
    }

    .answer-input {
      width: 100%;
      border: none;
      border-bottom: #F0F0F0 solid 3px;
      line-height: 2;
      font-size: 36px;
      text-align: center;
      caret-color: #231F20;
      box-sizing: border-box;
    }

    .result-wrapper {
      display: flex;
      flex-wrap: wrap;

      .result-card {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        background-color: #f0f0f0;
        justify-content: center;
        padding: 5px;
        cursor: pointer;
        font-size: 14px;
        margin-top: 2px;

        &:not(:last-child) {
          margin-right: 2px;
        }

        &:first-child {
          border-bottom: 3px solid #000;
        }

        & > * {
          padding: 5px;
        }

        &--title {
          color: #585858;
        }

        &--score {
          color: #000;
          font-size: 22px;
        }

        &--percent {
          color: #ABABAB;
          font-size: 8px;
          margin-top: -1.5em;
        }

        &--edit {
          color: rgba(35,31,32,0.5);
        }
      }
    }
  }
</style>
