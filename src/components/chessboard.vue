/*
  棋盘
 */
<template>
  <div class="chessboard">
    <span v-for="i in 16" :key="i"></span>
  </div>
</template>

<script>
export default {
  name: 'chessboard',
  props: {
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.chessboard {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  position: absolute;
  width: 480px;
  padding: 10px;
  border-radius: 10px;
  background-color: #bbada0;
  z-index: 0;
  & > span {
    margin: 10px;
    width: 100px;
    height: 100px;
    border-radius: 10px;
    background-color: rgba(238,228,218,0.35);
  }
}
</style>
