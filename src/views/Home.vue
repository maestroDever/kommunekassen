<template>
  <div class="kommunekassen-home">
    <Header />
    <Body />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Body from '@/components/Body.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'home',
  components: {
    Header,
    Body,
    Footer
  }
}
</script>
