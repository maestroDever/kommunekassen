<template>
  <div class="footer--progress-bar">
    <div class="cell" v-for="n in curPage" :key="n" :style="`background-color: ${colors[n]}`"></div>
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
