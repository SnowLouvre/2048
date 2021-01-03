<template>
  <div class="index">
    <chessboard></chessboard>
    <div class="container">
      <span class="list" v-for="(item, index) in chessList" :key="index">{{item.num}}</span>
    </div>
  </div>
</template>

<script>
import chessboard from './chessboard'
export default {
  name: 'mainGame',
  components: { chessboard },
  props: {},
  data () {
    return {
      color: {
        2: '#eee4da',
        4: '#ede0c8',
        8: '#f2b179',
        16: '#f59563',
        32: '#f67c5f',
        64: '#f65e3b',
        128: '#edcf72',
        256: '#edcc61',
        512: '#0444BF',
        1024: '#A79674',
        2048: '#282726',
        4096: '#280b21',
        8192: '#281d04'
      },
      /* 棋盘数组 */
      chessboardList: [[]],
      /* 棋子数组 */
      chessList: []
    }
  },
  methods: {
    initChessboard () {
      this.initChessboardList()
      this.generateChess()
    },
    initChessboardList () {
      for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 3; j++) {
          this.chessboardList[i][j] = 1
        }
      }
    },
    /* 生成棋子 */
    generateChess () {
      console.log(12)
    },
    /* 获取随机数字 */
    getNumber () {
      return Math.random() >= 0.5 ? 4 : 2
    },
    /* 获取随机坐标 */
    getCoordinate () {
    },
    initData () {
      this.chessList = []
      this.initChessboard()
    }
  },
  created () {
    this.initData()
  }
}
</script>

<style lang="scss" scoped>
.index {
  height: 500px;
  width: 500px;
  .container {
    z-index: 0;
    padding: 10px;
    width: 480px;
    height: 480px;
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    justify-content: flex-start;
    align-content: flex-start;
    .list {
      margin: 10px;
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
      font-size: 50px;
      font-weight: bold;
      transition-property: transform;
      transition: 100ms ease-in-out;
      color: #fff;
      border-radius: 10px;
    }
  }
}
</style>
