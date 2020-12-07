<!-- App -->
<template>
  <div class="App" :ref="getApp">
    <pop :msg="state.popMsg" />
    <section class="color_box">
      <div class="search_">
        <search
          @emitColor="getColor"
          @randomAllColors="randomAllColors"
          :searchText="state.searchText"
        />
      </div>
      <div
        class="block"
        :style="'background:#' + color"
        v-for="(color, index) in state.colorArr"
        :key="index"
        @click="targetBlock(index, color)"
      >
        <section
          class="compare"
          :style="'background:' + state.compareColor"
        ></section>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, reactive } from 'vue'
import search from './components/search.vue'
import pop from './components/pop.vue'
import Gradient from './func/Gradient'
import Copy from './func/Copy'
import * as Iroot from './interfaces/rootInterface'

export default defineComponent({
  setup() {
    const state = reactive<Iroot.APP>({
      gridNum: 0,
      colorArr: [],
      searchText: '',
      compareColor: 'transparent',
      useMode: false,
      popMsg: '',
    })
    // 随机颜色
    const randomColor: (color: string) => string = color => {
      color += '0123456789abcdef'[Math.floor(Math.random() * 16)]
      return color.length == 6 ? color : randomColor(color)
    }
    // 获取grid格子数
    const getApp: (el: HTMLElement) => void = el => {
      nextTick(() => {
        state.gridNum =
          Math.floor((el.offsetHeight - 20) / 80) *
            Math.floor((el.offsetWidth - 20) / 80) -
          6
      })
    }
    // 颜色数组
    const colorArr: (num: number) => string[] = num => {
      let arr: string[] = []
      while (num--) arr.push(randomColor(''))
      return arr
    }
    // test
    const randomAllColors = () => {
      state.useMode = false
      state.compareColor = 'transparent'
      state.colorArr = colorArr(state.gridNum)
    }
    // 接收子组件
    const getColor: (emitColor: Iroot.emitColor | null) => void = emitColor => {
      if (emitColor) {
        state.searchText = (emitColor as Iroot.emitColor).originalColor
        state.compareColor = '#' + emitColor.color
        state.colorArr = Gradient(
          ['ffffff', emitColor.color, '000000'],
          0,
          state.gridNum
        )
      } else {
        state.colorArr = Gradient(['ffffff', '000000'], 0, state.gridNum)
        state.compareColor = '#000000'
      }
    }
    // 获取元素块信息
    const targetBlock: (index: number, color: string) => void = (
      index,
      color
    ) => {
      Copy('#' + color)
      state.popMsg = '🔊 #' + color + ' Copy success 🎉🎉'
      if (!state.useMode) {
        state.compareColor = '#' + color
        state.useMode = true
        state.colorArr = Gradient(['ffffff', color, '000000'], 0, state.gridNum)
        state.searchText = color
      }
    }
    onMounted(() => {
      nextTick(() => {
        state.colorArr = colorArr(state.gridNum)
      })
    })
    return {
      state,
      randomColor,
      getApp,
      getColor,
      targetBlock,
      randomAllColors,
    }
  },
  components: {
    search,
    pop,
  },
})
</script>

<style lang="scss">
@import './css/root.scss';
.App {
  position: relative;
  height: 100vh;
  width: 100vw;
  z-index: 1;
  .color_box {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    grid-template-rows: repeat(auto-fill, minmax(80px, 1fr));
    height: 100%;
    width: 100%;
    padding: 10px;
    overflow: auto;
    justify-items: center;
    align-items: center;
    .search_ {
      height: $color_block;
      width: $color_block;
      grid-area: 1/1/3/4;
      background: #fff;
      border-radius: 5px;
    }
    .block {
      position: relative;
      width: $color_block;
      height: $color_block;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      cursor: pointer;
      transition: 0.2s;
      section {
        position: absolute;
        width: 100%;
        height: 50%;
        left: 0;
        top: -100%;
        background: transparent;
        transition: 0.2s;
      }
      &:active {
        transform: scale(0.98);
      }
      &:hover {
        section {
          top: 0;
        }
      }
      &::after {
        position: absolute;
      }
    }
  }
}
</style>
