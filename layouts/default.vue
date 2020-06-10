<template>
  <div>
    <kinesis-container tag="div">
      <Menu />
      <Header />
      <nuxt />
      <Footer />
    </kinesis-container>
  </div>
</template>

<style>
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

</style>

<script>
import Menu from '../components/Menu'
import Header from '../components/Header'
import Footer from '../components/Footer'
export default {
  components: {
    Menu,
    Header,
    Footer
  }
}
</script>
