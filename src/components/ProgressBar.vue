<template>
  <div>
    <div class="footer--progress-bar" v-if="(pageType == 'result') || (pageType == 'first')"></div>
    <div class="footer--progress-bar" v-else>
      <div
        class="cell tooltip"
        v-for="n in totalPageNum"
        :key="n"
        :style="`background-color: ${color(n)}`"
        @click="gotoPage(n)"
      >
        <span class="tooltiptext">{{ pageInfo[n].title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import hexToRgba from 'hex-to-rgba'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'ProgressBar',
  computed: {
    ...mapState(['curPage', 'colors', 'pageInfo']),
    ...mapGetters(['pageType', 'totalPageNum'])
  },
  methods: {
    ...mapActions(['gotoPage']),
    color (index) {
      return hexToRgba(this.colors[index], index <= this.curPage ? 1 : 0.2)
    }
  }
}
</script>
