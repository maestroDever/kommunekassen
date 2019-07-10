<template>
  <div class="footer--progress-bar">
    <div class="cell tooltip" v-for="n in curPage" :key="n" :style="`background-color: ${colors[n]}`">
      <span class="tooltiptext">{{n}}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ProgressBar',
  computed: {
    ...mapState(['curPage', 'colors'])
  }
}
</script>
