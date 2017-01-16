<template>
  <div class="tile" :class="{'tile-1': colored}"></div>
</template>

<script>
  export default {
    props: {
      colored: [Boolean, Number]
    }
  }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  .tile
    display inline-block
    box-sizing border-box
    background-color #fff
    border 2px solid #eee
    width 30px
    height 30px
    transition 0.25s
    cursor pointer
    &:hover
      border-color #aaa
    &.tile-1
      background-color tomato
</style>
