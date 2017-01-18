<template>
  <div>
    <h1 class="operation">
      <span class="times-success" title="success">{{successTimes}}</span> |
      <span title="flip">{{flipTimes}}</span> |
      <span class="times-failure" title="failure">{{failTimes}}</span>
    </h1>
    <transition name="fade">
      <h4>{{elapse}}</h4>
    </transition>
    <div class="operation">
      <button class="btn-bg" @click="run">Flip</button>
    </div>

    <div class="wall" :class="{rotating: rotating, flipped: flipped}">
      <div v-for="(row, rowIndex) in board">
        <tile v-for="(col, colIndex) in row"
              :colored="isInPath([rowIndex, colIndex])"></tile>
      </div>
    </div>
  </div>
</template>

<script>
  //  import Vue from 'vue'
  import Tile from 'components/Tile'
  import {generatePath, generateMatrixWithZero, isInPath} from 'helpers/matrix'
  //  import random from 'helpers/rnd'

  //  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  export default {
    components: { Tile },
    data () {
      return {
        // factors
        col: 5,
        row: 5,
        factor: 0.9,
        // board
        board: [],
        path: [],
        // ui
        rotating: false,
        flipped: false,
        // analysis
        flipTimes: 0,
        failTimes: 0,
        successTimes: 0,
        elapse: 0,
        startAt: 0
      }
    },
    mounted () {
      this.run()
    },
    methods: {
      run () {
        const { row, col } = this
        const options = { row, col }
        this.board = generateMatrixWithZero(options)
        this.path = generatePath(row, col)
      },
      isInPath (point) {
        return isInPath(this.path, point)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped rel="stylesheet/stylus">
  .operation
    margin-bottom 20px
    .times-success
      color lightgreen
    .times-failure
      color lightcoral

  .btn-bg
    width 100px
    height 40px
    font-weight bold

  .wall
    display inline-block
    background-color aliceblue
    margin-right 25px
    transform-origin right
    transition transform 1s, background-color 0.2s, border .5s

  .flipped
    transform rotateY(180deg)

  .rotating
    transform rotateY(90deg)
</style>
