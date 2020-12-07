<!-- search -->
<template>
  <div class="search">
    <div class="titleArea">
      <span>Gradientor</span>
      <span>Pick a color :</span>
    </div>
    <div class="inputArea">
      <section>
        <label for="COLOR" :class="{ disable: state.input_state }">
          <input
            type="text"
            v-model="state.text"
            @input="colorInput($event)"
            id="COLOR"
            autocomplete="off"
          />
        </label>
      </section>
      <section>
        <span>Or</span>
        <label
          for="COLOR_PICKER"
          ref="COLOR_PICKER"
          :style="'background:#' + state.colorPicker"
        >
          <input
            id="COLOR_PICKER"
            type="color"
            :value="'#' + state.colorPicker"
            @input="colorPickerInput($event)"
          />
        </label>
      </section>
    </div>
    <div class="btnArea">
      <span @click="randomAllColors"><img :src="state.imgs.dice"/></span>
      <div class="ABOUT">
        <span @click="state.showAbout = !state.showAbout"
          ><img :src="state.imgs.about"
        /></span>
        <transition name="fade" mode="out-in">
          <about v-if="state.showAbout" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch, ref, onMounted } from 'vue'
import about from '@/components/about.vue'
interface emitColor {
  color: string
  originalColor: string
}
export default defineComponent({
  props: {
    searchText: String,
  },
  setup(props, context) {
    const state = reactive({
      text: '',
      colorPicker: '',
      input_state: false,
      imgs: {
        dice: require('@/assets/img/dice.svg'),
        about: require('@/assets/img/about.svg'),
        showAbout: true,
      },
    })
    // 监听输入变化
    watch(
      () => state.text,
      (val, oval): void => {
        let hexRegex: RegExp = /^[0-9a-fA-F]{6}$/i
        let originalColor: string = val
        if (val.length == 3 || val.length == 6) {
          val = val.length == 3 ? val + val : val
          if (hexRegex.test(val)) {
            state.input_state = false
            state.colorPicker = val
            context.emit('emitColor', <emitColor>{
              color: val,
              originalColor,
            })
          }
        } else {
          state.input_state = true
          state.colorPicker = ''
          context.emit('emitColor', null)
        }
      }
    )
    watch(
      () => props.searchText as string,
      (val, oval): void => {
        state.text = val
      }
    )
    // 事件
    const randomAllColors: () => void = () => {
      context.emit('randomAllColors')
    }
    const colorPickerInput = (e: Event) => {
      let color: string = ((<HTMLInputElement>e.target)
        .value as string).replace('#', '')
      state.colorPicker = state.text = color
    }

    return { state, colorPickerInput, randomAllColors }
  },
  components: {
    about,
  },
})
</script>

<style scoped lang="scss">
.search {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .titleArea {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    span {
      user-select: none;
      display: block;
      text-align: center;
      &:nth-child(1) {
        font-size: 1.5rem;
        margin-bottom: 5px;
        padding: 2px 8px;
        background: #000;
        border-radius: 4px;
        color: #fff;
        letter-spacing: 1px;
      }
    }
  }
  .inputArea {
    display: flex;
    section {
      display: flex;
      span {
        user-select: none;
        display: block;
        text-align: center;
        margin: 0 5px;
        line-height: 30px;
      }
      label[for='COLOR'] {
        position: relative;
        display: block;
        transition: 0.2s;
        input[type='text'] {
          outline: none;
          width: 120px;
          border: 2px solid #000;
          border-radius: 3px;
          line-height: 30px;
          padding: 0 5px 0 35px;
          transition: 0.2s;
        }
        &::before {
          position: absolute;
          content: '#';
          height: 98%;
          width: 30px;
          background: #000;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 3px 0 0 3px;
        }
        &.disable {
          input[type='text'] {
            border: 2px solid #ff1b43;
          }
          &::before {
            background: #ff1b43;
          }
        }
      }
      label[for='COLOR_PICKER'] {
        position: relative;
        display: block;
        background: #000;
        border: 2px solid #000;
        border-radius: 3px;
        input[type='color'] {
          opacity: 0;
          display: block;
          width: 30px;
          height: 30px;
          border: none;
          cursor: pointer;
        }
      }
    }
  }
  .btnArea {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
    border-radius: 3px;
    width: 100%;
    height: 30px;
    margin-top: 10px;
    user-select: none;
    .ABOUT {
      position: relative;
    }
    span {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 30px;
      width: 30px;
      margin: 0 5px;
      background: #000;
      border-radius: 3px;
      cursor: pointer;
      img {
        transition: 0.3s;
        height: 25px;
      }
    }
  }

  .fade-enter-active {
    transition: all 0.2s ease;
  }

  .fade-leave-active {
    transition: all 0.1s cubic-bezier(2, 0.5, 0.8, 1);
  }

  .fade-enter-from,
  .fade-leave-active {
    left: 0;
    right: 0;
    transform: translateY(-5px);
    opacity: 0;
  }
}
</style>
