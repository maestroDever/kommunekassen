<template>
  <div class="kommunekassen-home">
    <div class="header">
      <div class="header--top">
        <img src="../assets/images/graphics_logo_light.svg" alt="Logo" class="header--top__logo">
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
      <Action ref="action" />
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
import { mapGetters, mapActions } from 'vuex'
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
    ...mapActions(['toNext', 'toPrev', 'gotoPage', 'gotoResult', 'resetAnswers']),
    gotoNext () {
      if (!this.curAnswer) {
        this.$notify({
          group: 'notify',
          title: 'Answer is empty',
          text: 'Please type in the answer...',
          type: 'warn'
        })
        return
      }
      if (this.pageType === 'last') {
        this.gotoResult()
      } else {
        this.toNext()
      }
    },
    gotoPrev () {
      if (this.pageType === 'result') {
        this.resetAnswers()
        this.gotoPage(1)
      } else {
        this.toPrev()
      }
    }
  }
}
</script>

<style lang="scss">
.kommunekassen-home {
  display: grid;
  grid-template-rows: 1fr 300px 1fr;
  .header {
    &--top {
      background-color: #231F20;
      height: 265px;

      &__logo {
        margin-top: 26px;
      }

      &__slogan {
        display: block;
        margin-top: 9px;
        color: rgba(255,255,255,0.5);
        font-size: 18px;
        line-height: 25px;
        text-align: center;
      }
    }

    &--bottom {
      height: 40px;
      background-color: #413B3D;

      &__icon {
        border-radius: 50%;
        background-color: white;
        position: relative;
        top: -30px;
        display: inline-block;
      }
    }
  }

  .body {
    margin-top: 60px;
    margin-right: 25px;
    margin-left: 25px;

    .title {
      display: block;
      color: #231F20;
      font-size: 22px;
    }

    .subtitle {
      display: block;
      color: rgba(0,0,0,0.5);
      font-size: 16px;
    }
  }

  .footer {
    padding: 10px 15px;

    &--buttons {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      margin: 0 4px;

      .right {
        grid-column-start: 5;
      }
    }

    &--progress-bar {
      width: 100%;
      height: 20px;
      background-color: #D8D8D8;
      margin-top: 10px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

      .cell {
        margin-right: 2px;
        background-color: red;
      }

      .cell:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
