<template>
  <div>
    <h1 class="operation">
      <span class="times-success" title="success">{{successTimes}}</span> |
      <span title="flip">{{flipTimes}}</span> |
      <span class="times-failure" title="failure">{{failTimes}}</span>
    </h1>
    <h4>{{elapse}}</h4>
    <div class="operation">
      <button class="btn-bg" @click="flip">Flip</button>
    </div>

    <div class="wall" :class="{rotating: rotating, flipped: flipped}">
      <div v-for="(row, rowIndex) in board">
        <tile v-for="(col, colIndex) in row"
              :colored="col"
              @click.native="answer(rowIndex, colIndex)"></tile>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Tile from './Tile.vue'
  import {generateBitMatrix} from 'helpers/matrix'
  import {random} from 'helpers/rnd'

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  export default {
    name: 'hello',
    components: { Tile },
    data () {
      return {
        // factors
        col: 2,
        row: 2,
        factor: 0.9,
        // board
        board: [],
        mutatedPoints: [],
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
      this.startAt = Date.now()
      this.refresh()
      setInterval(() => { this.elapse = Math.floor((Date.now() - this.startAt) / 1000) }, 500)
    },
    methods: {
      refresh () {
        this.rotating = false
        this.flipped = false
        const { row, col, factor } = this
        this.board = generateBitMatrix({ row, col, factor })
        this.mutatedPoints = [[random(0, row), random(0, col)]]
      },
      async flip () {
        this.flipTimes += 1
        this.rotating = true
        await wait(1100)
        this.mutatedPoints.forEach(([row, col]) => {
          Vue.set(this.board[row], col, Math.abs(this.board[row][col] - 1))
        })
        this.rotating = false
        this.flipped = !this.flipped
      },
      answer (row, col) {
        const index = this.mutatedPoints.findIndex(([r, c]) => r === row && c === col)
        if (index !== -1) {
          window.alert('Success')
          this.successTimes += 1
          if (this.factor <= 0.6) {
            this.col += 1
            this.row += 1
            this.factor = 0.9
          } else {
            this.factor -= 0.1
          }
          this.refresh()
        } else {
          this.failTimes += 1
        }
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
    transition transform 1s

  .flipped
    transform rotateY(180deg)

  .rotating
    transform rotateY(90deg)
</style>
