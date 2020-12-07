<!-- about -->
<template>
  <div class="about">
    <div class="useing">
      <span>Useing view gradient colors</span>
    </div>
    <div class="view">
      <span
        ><img :src="state.imgs.Github" /> View on &nbsp;
        <a href="https://github.com/zRains/Gradientor" target="_blank"
          >Github</a
        ></span
      >
      <span><img :src="state.imgs.Me" />Power by</span>
      <div class="power">
        <span>zRain | thank you for opening a new issue</span>
      </div>
    </div>
    <div class="tech">
      <span class="vue"><img :src="state.imgs.Vue"/></span>
      <span class="StandardJS"><img :src="state.imgs.StandardJS"/></span>
      <span class="TS"><img :src="state.imgs.TS"/></span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  setup() {
    const state = reactive({
      imgs: {
        Github: require('@/assets/img/github.svg'),
        StandardJS: require('@/assets/img/StandardJS.svg'),
        TS: require('@/assets/img/TS.png'),
        Vue: require('@/assets/img/vue.png'),
        Me: require('@/assets/img/me.svg'),
      },
    })
    return { state }
  },
})
</script>

<style scoped lang="scss">
.about {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 200px;
  padding: 10px;
  left: 0;
  top: 32px;
  background: #fff;
  border: 2px solid #000;
  border-radius: 5px;
  z-index: 2;
  .useing {
    margin-bottom: 10px;
    text-align: center;
    span {
      display: block;
      background: #000;
      color: #fff;
      padding: 5px 0;
      border-radius: 3px;
      font-size: 1.1rem;
    }
  }
  .view {
    span {
      display: flex;
      font-size: 0.9rem;
      align-items: center;
      margin-bottom: 10px;
      a {
        color: #000;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
      img {
        margin-right: 10px;
        height: 20px;
      }
    }
  }
  .tech {
    margin-top: auto;
    height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    span {
      display: block;
      img {
        height: 35px;
      }
    }
  }
}
</style>
