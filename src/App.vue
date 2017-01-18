<template>
  <div id="app">
    <ul>
      <li v-for="path in paths">
        <router-link :to="'/'+path">{{path}}</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        paths: ['mirror-error', 'path-pass']
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  #app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50
    margin-top 60px

  ul
    list-style-type none
    li
      display inline-block
      margin-right 10px
</style>
