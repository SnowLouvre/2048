<template>
  <div class="index">
    <button @click="moveChess()">down</button>
    <chessboard></chessboard>
    <div class="container">
      <span class="list" v-for="(item, index) in chessList" :key="index" :style="{backgroundColor: item.color, left: (item.x * 120 + 10) + 'px', top: (item.y * 120 + 10) + 'px'}">{{item.num}}</span>
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
      /* 棋盘数组, 帮助判空 0代表当前位置有棋子 */
      chessboardList: [],
      /* 棋子对象数组 x,y,num,color */
      chessList: []
    }
  },
  methods: {
    /* 初始化棋盘 */
    initChessboard () {
      this.initChessboardList()
      /* 开局随机生成三个棋子 */
      this.generateChess()
      this.generateChess()
      this.generateChess()
    },
    /* 初始化棋盘数组 */
    initChessboardList () {
      for (let i = 0; i <= 15; i++) {
        this.chessboardList[i] = 1
      }
    },
    /* 生成棋子 */
    generateChess () {
      const num = this.getNumber()
      const chess = {
        x: this.getCoordinate().x,
        y: this.getCoordinate().y,
        num: num,
        color: this.color[num]
      }
      console.log(chess, 'chess')
      this.chessList.push(chess)
    },
    /* 获取随机数字 */
    getNumber () {
      return Math.random() >= 0.5 ? 4 : 2
    },
    /* 获取随机坐标 */
    getCoordinate () {
      const emptyCoordinate = this.chessboardList.filter(item => item === 1)
      const num = Math.floor(Math.random() * emptyCoordinate.length)
      this.chessboardList[num] = 0
      return { x: parseInt(num / 4), y: num % 4 }
    },
    /* 移动棋子 */
    moveChess (position = 'down') {
      if (position === 'down') {
        for (let i = 0; i <= 3; i++) {
          const chessList = this.chessList.filter(item => item.x === i)
          if (chessList.length) {
            if (chessList.length === 1) {
              chessList[0].y = 3
            } else {
              const sortChessList = chessList.sort(this.sortByOneAxis('y'))
              console.log(sortChessList, 'sortChessList')
              sortChessList[sortChessList.length - 1].y = 3
              for (let j = sortChessList.length - 1; j > 0;) {
                if (sortChessList[j - 1]?.num === sortChessList[j]?.num) {
                  sortChessList[j].num += sortChessList[j - 1].num
                  sortChessList[j].color = this.color[sortChessList[j].num]
                  sortChessList.splice(j - 1, 1)
                  // sortChessList[j].y =
                } else {
                  // sortChessList[j]
                  j--
                }
              }
            }
          }
        }
        this.generateChess()
      }
    },
    /* 按某一坐标轴排序 */
    sortByOneAxis (axis) {
      return (first, second) => {
        return first[axis] - second[axis]
      }
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
      position: absolute;
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
