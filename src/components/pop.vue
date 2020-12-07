<!-- Top_pop -->
<template>
  <div class="pop" :ref="getPop">{{ popMsg }}</div>
</template>

<script lang="ts">
import { defineComponent, nextTick, watch, ref } from 'vue'
export default defineComponent({
  props: {
    msg: String,
  },
  setup(props, context) {
    let pop: HTMLElement | null = null
    const popMsg = ref()
    const getPop: (el: HTMLElement) => void = el => {
      pop = el
    }
    const popMe: (msg: string, delay: number) => void = (msg, delay) => {
      ;(pop as HTMLElement).style.transform = 'translateY(0)'
      setTimeout(() => {
        ;(pop as HTMLElement).style.transform = 'translateY(-100%)'
      }, delay)
    }
    watch(
      () => props.msg,
      (val, oval) => {
        popMsg.value = val
        popMe(val as string, 1000)
      }
    )
    return { getPop, popMsg }
  },
})
</script>

<style scoped lang="scss">
.pop {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px;
  position: absolute;
  left: 0;
  top: 0;
  background: #130f13;
  z-index: 2;
  transition: 0.2s;
  transform: translateY(-100%);
  color: #fff;
  letter-spacing: 0.5px;
}
</style>
