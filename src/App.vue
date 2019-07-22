<template>
  <div id="app">
    <home />
  </div>
</template>

<script>
import Axios from 'axios'
import Home from './views/Home.vue'
import { mapActions } from 'vuex'

export default {
  components: { Home },
  mounted () {
    Axios.get('https://api.businesslogic.online/describe', {
      headers: { 'X-Auth-Token': 'e11e754ffc8c4bad8539bac2ea48b294' }
    })
      .then(response => {
        const pageInfo = response.data.expected_input.properties
        this.setData(pageInfo)
      })
  },
  methods: {
    ...mapActions(['setData'])
  }
}
</script>

<style lang="scss">
@import url(./assets/icons/css/kommunekassen-icons.css);
#app {
  font-family: 'DINNextW01-Bold';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #fff;
}

 [class^="icon-"]:before, [class*=" icon-"]:before {
   font-size: 125px;
 }
</style>
