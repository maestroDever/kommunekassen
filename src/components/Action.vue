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
      <input type="number" class="answer-input" v-model="answer" ref="inputField" @keyup.enter="enterHandle">
      <span style="display: block; margin: 1rem;">mio. kr.</span>
    </div>
    <div v-else class="result-wrapper">
      <div
        class="result-card"
        v-for="(result, index) in resultsInOrder"
        :key="index"
      >
        <div class="result-card--title">Byråd {{index + 1}}</div>
        <div class="result-card--score">{{result.total | floatFilter}}</div>
        <div class="result-card--percent">%</div>
        <div class="result-card--edit" @click="editAnswers(result.id)">Redigér</div>
      </div>
      <div class="result-card" style="height: 13rem;" @click="createNew" v-if="results.length < 6">
        Opret nyt byråd
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
export default {
  name: 'Action',
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
    ...mapActions(['setAnswer', 'gotoPage']),
    ...mapMutations(['selectAnswer', 'clearAnswers']),
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
    enterHandle () {
      this.$emit('enterPressed')
    },
    createNew () {
      this.clearAnswers()
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

<style lang="scss">
  .action {
    display: flex;
    flex-wrap: wrap;
    margin-top: 2rem;

    .input-wrapper, .result-wrapper, .buttons-wrapper {
      width: 100%;
    }

    .answer-input {
      border: none;
      border-bottom: #F0F0F0 solid 3px;
      line-height: 2;
      font-size: 3.6rem;
      text-align: center;
      caret-color: #231F20;
    }

    .result-wrapper {
      display: flex;

      .result-card {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        background-color: #f0f0f0;
        justify-content: center;
        padding: 5px;
        cursor: pointer;
        font-size: 1.4rem;

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
          font-size: 3rem;
        }

        &--percent {
          color: #ABABAB;
          font-size: 1rem;
        }

        &--edit {
          color: rgba(35,31,32,0.5);
        }
      }
    }
  }
</style>
