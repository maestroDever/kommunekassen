<template>
  <div id="kommunekassen-app">
    <home :token="token" />
  </div>
</template>

<script>
import Axios from 'axios'
import Home from './views/Home.vue'
import { mapActions } from 'vuex'

export default {
  components: { Home },
  props: ['token'],
  mounted () {
    Axios.get('https://api.businesslogic.online/describe', {
      headers: { 'X-Auth-Token': this.token }
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
@import './assets/css/main.scss';
@import './assets/icons/css/kommunekassen-icons.css';
#kommunekassen-app {
  font-family: 'DINNextW01-Bold';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #fff;
  // font-size: 1.4em;
  font-size: 10px;
  width: 100%;

 [class^="icon-"]:before, [class*=" icon-"]:before {
   font-size: 125px;
 }
}

</style>
