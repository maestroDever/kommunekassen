<template>
  <div>
    <div class="footer--progress-bar" v-if="actionType !== 'result'">
      <div
        class="cell tooltip"
        v-for="n in curPage"
        :key="n"
        :style="`background-color: ${colors[n]}`"
        @click="gotoPage(n)"
      >
        <span class="tooltiptext">{{ pageInfo[n].title }}</span>
      </div>
    </div>
    <div class="footer--progress-bar" v-else></div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'ProgressBar',
  computed: {
    ...mapState(['curPage', 'colors', 'pageInfo']),
    ...mapGetters(['actionType'])
  },
  methods: {
    ...mapActions(['gotoPage'])
  }
}
</script>
