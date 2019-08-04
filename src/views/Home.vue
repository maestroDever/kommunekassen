<template>
  <div class="kommunekassen-home">
    <div class="kommunekassen-header">
      <div class="kommunekassen-header--top">
        <i class="icon-graphics_logo_light kommunekassen-header--top__logo"></i>
        <span class="kommunekassen-header--top__slogan">
          Kan du styre din by og blive genvalgt?
        </span>
      </div>
      <div class="kommunekassen-header--bottom" :style="`background-color: ${curPageInfo.color}`">
        <div class="kommunekassen-header--bottom__icon">
          <i v-if="pageType === 'first'" class="icon-icon_scenarios"></i>
          <i v-else class="icon-icon_project_0" :class="actionType === 'integer' ? `icon-icon_project_${curAnswer}` : `icon-icon_${curPageInfo.icon}`"></i>
        </div>
      </div>
    </div>
    <div class="kommunekassen-body">
      <span class="kommunekassen-body--title">
        {{ curPageInfo.title }}
      </span>
      <span class="kommunekassen-body--subtitle">
        {{ curPageInfo.description }}
      </span>
      <Action ref="action" :token="token" @enterPressed="gotoNext" />
    </div>
    <div class="kommunekassen-footer">
      <div class="kommunekassen-footer--buttons">
        <button
          class="button left"
          :class="curPageInfo.button.class"
          v-if="curPageInfo.button.left"
          @click="gotoPrev"
        >
          {{ curPageInfo.button.left }}
        </button>
        <button
          class="button transparent middle"
          v-show="pageType === 'normal' || pageType === 'last'"
        >
          Byråd {{ currentCouncil }}
        </button>
        <button
          class="button right"
          :class="curPageInfo.button.class"
          v-if="curPageInfo.button.right"
          @click="gotoNext"
        >
          {{ curPageInfo.button.right }}
        </button>
      </div>
      <ProgressBar />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'
import Action from '@/components/Action.vue'
import ProgressBar from '@/components/ProgressBar.vue'

export default {
  name: 'home',
  props: {
    token: {
      type: String,
      default: ''
    }
  },
  components: {
    Action,
    ProgressBar
  },
  computed: {
    ...mapGetters(['curPageInfo', 'actionType', 'curAnswer', 'pageType']),
    ...mapState(['isNew', 'results']),
    currentCouncil () {
      return this.isNew.flag ? this.results.length : this.isNew.id + 1
    }
  },
  methods: {
    ...mapActions(['toNext', 'toPrev', 'gotoPage', 'gotoResult', 'setAnswer']),
    ...mapMutations(['resetAnswers']),
    gotoNext () {
      this.setAnswer(this.curAnswer)
      if (this.pageType === 'first') {
        this.curAnswer && this.gotoResult({ flag: false })
      } else if (this.pageType === 'last') {
        this.gotoResult({ flag: true, token: this.token })
      } else {
        this.toNext()
      }
    },
    gotoPrev () {
      if (this.pageType === 'result') {
        this.resetAnswers()
        this.gotoPage(0)
      } else {
        this.toPrev()
      }
    }
  }
}
</script>

<style lang="scss">
.kommunekassen-home {
  display: flex;
  flex-direction: column;
  // grid-template-rows: 1fr 30em 1fr;
  .kommunekassen-header {
    display: block;

    &--top {
      background-color: #231F20;
      height: 26.5em;

      &__slogan {
        display: block;
        margin-top: 9px;
        color: rgba(255,255,255,0.5);
        font-size: 18px;
        line-height: 2.5em;
        text-align: center;
      }
    }

    &--bottom {
      height: 4em;
      background-color: #413B3D;

      &__icon {
        border-radius: 50%;
        background-color: white;
        position: relative;
        top: -3em;
        display: inline-block;
      }
    }
  }

  .kommunekassen-body {
    flex: 30em;
    margin-top: 6em;
    margin-right: 2.5em;
    margin-left: 2.5em;

    &--title {
      display: block;
      color: #231F20;
      font-size: 22px;
    }

    &--subtitle {
      display: block;
      color: rgba(0,0,0,0.5);
      font-size: 16px;
    }
  }

  .kommunekassen-footer {
    padding: 1em 1.5em;

    &--buttons {
      display: flex;

      .right {
        margin-left: auto;
      }

      .middle {
        font-size: 12px;
        color: rgba(35,31,32,0.7);
        cursor: auto;
      }

      .left {
        margin-right: auto;
      }
    }

    &--progress-bar {
      width: 100%;
      height: 2em;
      background-color: #D8D8D8;
      margin-top: 1em;
      display: flex;

      .cell {
        flex: 1;
        border: none;
        border-right: 2px solid #fff;
        background-color: red;
        cursor: pointer;
      }

      .cell:last-child {
        border-right: 0;
      }

    }
  }
}
</style>
