<template>
  <div class="kommunekassen-home">
    <div class="header">
      <div class="header--top">
        <i class="icon-graphics_logo_light header--top__logo"></i>
        <span class="header--top__slogan">
          Kan du styre din by og blive genvalgt?
        </span>
      </div>
      <div class="header--bottom" :style="`background-color: ${curPageInfo.color}`">
        <div class="header--bottom__icon">
          <i class="icon-icon_project_0" :class="actionType === 'integer' ? `icon-icon_project_${curAnswer}` : `icon-icon_${curPageInfo.icon}`"></i>
        </div>
      </div>
    </div>
    <div class="body">
      <span class="title">
        {{ curPageInfo.title }}
      </span>
      <span class="subtitle">
        {{ curPageInfo.description }}
      </span>
      <Action ref="action" @enterPressed="gotoNext" />
    </div>
    <div class="footer">
      <div class="footer--buttons">
        <button
          class="button left"
          :class="curPageInfo.button.class"
          v-if="curPageInfo.button.left"
          @click="gotoPrev"
        >
          {{ curPageInfo.button.left }}
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
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Action from '@/components/Action.vue'
import ProgressBar from '@/components/ProgressBar.vue'

export default {
  name: 'home',
  components: {
    Action,
    ProgressBar
  },
  computed: {
    ...mapGetters(['curPageInfo', 'actionType', 'curAnswer', 'pageType'])
  },
  methods: {
    ...mapActions(['toNext', 'toPrev', 'gotoPage', 'gotoResult', 'setAnswer']),
    ...mapMutations(['resetAnswers']),
    gotoNext () {
      this.setAnswer(this.curAnswer)
      if (this.pageType === 'first') {
        this.curAnswer && this.gotoResult(false)
      } else if (this.pageType === 'last') {
        this.gotoResult(true)
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
  // grid-template-rows: 1fr 30rem 1fr;
  .header {
    &--top {
      background-color: #231F20;
      height: 26.5rem;

      &__slogan {
        display: block;
        margin-top: 9px;
        color: rgba(255,255,255,0.5);
        font-size: 1.8rem;
        line-height: 2.5rem;
        text-align: center;
      }
    }

    &--bottom {
      height: 4rem;
      background-color: #413B3D;

      &__icon {
        border-radius: 50%;
        background-color: white;
        position: relative;
        top: -3rem;
        display: inline-block;
      }
    }
  }

  .body {
    flex: 30rem;
    margin-top: 6rem;
    margin-right: 2.5rem;
    margin-left: 2.5rem;

    .title {
      display: block;
      color: #231F20;
      font-size: 2.2rem;
    }

    .subtitle {
      display: block;
      color: rgba(0,0,0,0.5);
      font-size: 1.6rem;
    }
  }

  .footer {
    padding: 1rem 1.5rem;

    &--buttons {
      display: flex;
      // grid-template-columns: repeat(5, 1fr);
      margin: 0 4px;

      .right {
        // grid-column-start: 5;
        margin-left: auto;
      }

      .left {
        margin-right: auto;
      }
    }

    &--progress-bar {
      width: 100%;
      height: 2rem;
      background-color: #D8D8D8;
      margin-top: 1rem;
      display: flex;
      // grid-template-columns: repeat(12, 1fr);

      .cell {
        flex: 1;
        border: none;
        border-right: 2px solid #fff;
        background-color: red;
        cursor: pointer;
      }

      .cell:last-child {
        border-right: 0;

        // .tooltiptext {
        //   right: 10%;
        //   left: unset;

        //   &::after {
        //     right: 2%;
        //     left: unset;
        //   }
        // }
      }

      // .cell:first-child {
      //   .tooltiptext {
      //     left: 200%;

      //     &::after {
      //       left: 10%;
      //     }
      //   }
      // }
    }
  }
}
</style>
