<template>
  <div class="action">
    <div v-if="actionType === 'integer'">
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
      <input type="number" class="answer-input" v-model="answer" ref="inputField">
      <span style="display: block; margin: 10px;">mio. kr.</span>
    </div>
    <div v-else class="result-wrapper">
      <div
        class="result-card"
        v-for="(result, index) in resultsInOrder"
        :key="index"
      >
        <div class="result-card--title">Byråd {{index + 1}}</div>
        <div class="result-card--score">{{result.total}}</div>
        <div class="result-card--percent">%</div>
        <div class="result-card--edit" @click="editAnswers(result.id)">Redigér</div>
      </div>
      <div class="result-card">
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
    ...mapState(['curPage']),
    answer: {
      get () {
        return this.curAnswer
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
    ...mapMutations(['selectAnswer']),
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
      this.selectAnswer({ flag: false, id: id})
      this.gotoPage(1)
    }
  }
}
</script>

<style lang="scss">
  .action {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;

    .input-wrapper, .result-wrapper {
      width: 100%;
    }

    .answer-input {
      border: none;
      border-bottom: #F0F0F0 solid 3px;
      line-height: 2;
      font-size: 36px;
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

        &:not(:last-child) {
          margin-right: 2px;
        }

        &:first-child {
          border-bottom: 3px solid #000;
        }

        & > * {
          padding: 5px;
          font-size: 12px;
        }

        &--title {
          color: #585858;
        }

        &--score {
          color: #000;
          font-size: 30px
        }

        &--percent {
          color: #ABABAB;
          font-size: 10px;
        }

        &--edit {
          color: rgba(35,31,32,0.5);
          cursor: pointer;
        }
      }
    }
  }
</style>
