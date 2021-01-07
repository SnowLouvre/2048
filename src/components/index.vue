<template>
  <div class="index">
    <button @click="move()">down</button>
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
      // TODO 改成一维数组
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
      lineBoxNumber: 4,
      chessList: [{
        // 横坐标位置 1 到 lineBoxNumber
        // x: 1,
        // 纵坐标位置 1 到 lineBoxNumber
        // y: 1,
        // 2的指数数字
        // val: 1
      }]
    }
  },
  watch: {
  },
  methods: {
    /* 初始化棋盘 */
    initChessboard () {
      this.chessList = []
      this.initChessboardList()
      /* 开局随机生成一个棋子 */
      this.generateChess()
      this.generateChess()
      this.generateChess()
    },
    /* 初始化棋盘数组 */
    initChessboardList () {
      for (let i = 0; i <= 15; i++) {
        this.chessboardList[i] = i
      }
    },
    /* 生成棋子 */
    generateChess () {
      if (this.isFullChess()) {
        return
      }
      const num = this.getNumber()
      const coordinate = this.getCoordinate()
      // console.log(coordinate, 'coo')
      const chess = {
        x: coordinate.x,
        y: coordinate.y,
        num: num,
        color: this.color[num]
      }
      this.chessList.push(chess)
    },
    /* 获取随机数字 */
    getNumber () {
      return Math.random() >= 0.5 ? 4 : 2
    },
    /* 获取随机坐标 */
    getCoordinate () {
      const emptyCoordinate = this.chessboardList.filter(item => item !== -1)
      const num = Math.floor(Math.random() * emptyCoordinate.length)
      const selectNum = emptyCoordinate[num]
      this.chessboardList[emptyCoordinate[num]] = -1
      return { x: parseInt(selectNum / 4), y: selectNum % 4 }
    },
    /* 移动棋子 */
    move (position = 'down') {
      if (position === 'down') {
        for (let i = 0; i <= 3; i++) {
          const chessList = this.chessList.filter(item => item.x === i)
          if (chessList.length) {
            // const sortChessList = chessList.sort(this.sortByOneAxis('y')).reverse()
            // console.log(sortChessList, 'sortChessList')
            // sortChessList.forEach(item => {
            // })
            // sortChessList[sortChessList.length - 1].y = 3
            // for (let j = sortChessList.length - 1; j > 0;) {
            //   if (sortChessList[j - 1]?.num === sortChessList[j]?.num) {
            //     sortChessList[j].num += sortChessList[j - 1].num
            //     sortChessList[j].color = this.color[sortChessList[j].num]
            //     sortChessList.splice(j - 1, 1)
            //     // sortChessList[j].y =
            //   } else {
            //     // sortChessList[j]
            //     j--
            //   }
            // }

            // 按照移动的方向，重排【chessList】，最贴边的放最前面

            // 遍历【chessList】后一个对象如果跟当前对象val一致，则当前对象 val + 1，后一个对象删除，直接从第三个对象判断下去

            // 根据当前【chessList】的情况重新分配所有成员的 x 或 y 的值
          }
        }
        this.generateChess()
      }
    },
    /* 移动棋子 */
    moveChess ({ chess, position = 'down' }) {
      const nextChess = this.getNextChess(chess)
      console.log(nextChess, 'nextChess')
      chess.y = 3
      // this.chessboardList[chess.x * 4 + chess.y] = 0
    },
    /* 获取相邻当前行/列棋子 */
    getNextChess (chess) {
      return this.chessList.find(item => item.x === chess.x && item.y !== chess.y)
    },
    findFarthestPosition () {},
    /* 按某一坐标轴排序 */
    sortByOneAxis (axis) {
      return (first, second) => first[axis] - second[axis] ? -1 : 1
    },
    /* 是否满格 */
    isFullChess () {
      return this.chessboardList.filter(item => item === -1) === 16
    },
    /* 是否游戏失败 */
    isGameOver () {
      /* 棋子满，且相邻无相等棋子 */
      const chessList = this.chessList.filter(item => item && (item.x !== 3 || item.y !== 3))
      const isGameOver = chessList.find(item => {
        const nextX = this.getNextChess({ x: item.x + 1, y: item.y })
        const nextY = this.getNextChess({ x: item.x, y: item.y + 1 })
        return (item.num === nextX?.nextX.num || item.num === nextY?.nextY.num)
      })
      return !!isGameOver
    }
  },
  created () {
    this.initChessboard()
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
