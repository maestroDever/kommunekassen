<template>
  <div>
    <div class="footer--progress-bar" v-if="(pageType == 'result') || (pageType == 'first')"></div>
    <div class="footer--progress-bar" v-else>
      <div
        class="cell tooltip"
        v-for="n in totalPageNum"
        :key="n"
        :style="n <= curPage ? `background-color: ${colors[n]}` : `background-color: ${colors[n]}50`"
        @click="gotoPage(n)"
      >
        <span class="tooltiptext">{{ pageInfo[n].title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'ProgressBar',
  computed: {
    ...mapState(['curPage', 'colors', 'pageInfo']),
    ...mapGetters(['pageType', 'totalPageNum'])
  },
  methods: {
    ...mapActions(['gotoPage'])
  }
}
</script>
